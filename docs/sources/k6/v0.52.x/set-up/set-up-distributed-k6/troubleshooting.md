---
weight: 400
title: Troubleshooting
---

# Troubleshooting

This topic includes instructions to help you troubleshoot common issues with the k6 Operator.

## Common tricks

### Test your script locally

Always run your script locally before trying to run it with the k6 Operator:

```bash
k6 run script.js
```

If you're using environment variables or CLI options, pass them in as well:

```bash
MY_ENV_VAR=foo k6 run script.js --tag my_tag=bar
```

That ensures that the script has correct syntax and can be parsed with k6 in the first place. Additionally, running locally can help you check if the configured options are doing what you expect. If there are any errors or unexpected results in the output of `k6 run`, make sure to fix those prior to deploying the script elsewhere.

### `TestRun` deployment

#### The pods

In case of one `TestRun` Custom Resource (CR) creation with `parallelism: n`, there are certain repeating patterns:

1. There will be `n + 2` Jobs (with corresponding Pods) created: initializer, starter, and `n` runners.
1. If any of these Jobs didn't result in a Pod being deployed, there must be an issue with that Job. Some commands that can help here:

   ```bash
   kubectl get jobs -A
   kubectl describe job mytest-initializer
   ```

1. If one of the Pods was deployed but finished with `Error`, you can check its logs with the following command:

   ```bash
   kubectl logs mytest-initializer-xxxxx
   ```

If the Pods seem to be working but not producing an expected result and there's not enough information in the logs, you can use the k6 [verbose option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/#options) in the `TestRun` spec:

```yaml
apiVersion: k6.io/v1alpha1
kind: TestRun
metadata:
  name: k6-sample
spec:
  parallelism: 2
  script:
    configMap:
      name: 'test'
      file: 'test.js'
  arguments: --verbose
```

#### k6 Operator

Another source of info is the k6 Operator itself. It's deployed as a Kubernetes `Deployment`, with `replicas: 1` by default, and its logs together with observations about the Pods from the previous section usually contain enough information to help you diagnose any issues. With the standard deployment, the logs of the k6 Operator can be checked with:

```bash
kubectl -n k6-operator-system -c manager logs k6-operator-controller-manager-xxxxxxxx-xxxxx
```

#### Inspect `TestRun` resource

After you deploy a `TestRun` CR, you can inspect it the same way as any other resource:

```bash
kubectl describe testrun my-testrun
```

Firstly, check if the spec is as expected. Then, see the current status:

```yaml
Status:
  Conditions:
    Last Transition Time:  2024-01-17T10:30:01Z
    Message:
    Reason:                CloudTestRunFalse
    Status:                False
    Type:                  CloudTestRun
    Last Transition Time:  2024-01-17T10:29:58Z
    Message:
    Reason:                TestRunPreparation
    Status:                Unknown
    Type:                  TestRunRunning
    Last Transition Time:  2024-01-17T10:29:58Z
    Message:
    Reason:                CloudTestRunAbortedFalse
    Status:                False
    Type:                  CloudTestRunAborted
    Last Transition Time:  2024-01-17T10:29:58Z
    Message:
    Reason:                CloudPLZTestRunFalse
    Status:                False
    Type:                  CloudPLZTestRun
  Stage:                   error
```

If `Stage` is equal to `error`, you can check the logs of k6 Operator.

Conditions can be used as a source of info as well, but it's a more advanced troubleshooting option that should be used if the previous steps weren't enough to diagnose the issue. Note that conditions that start with the `Cloud` prefix only matter in the setting of k6 Cloud test runs, for example, for cloud output and PLZ test runs.

### `PrivateLoadZone` deployment

If the `PrivateLoadZone` CR was successfully created in Kubernetes, it should become visible in your account in Grafana Cloud k6 (GCk6) interface soon afterwards. If it doesn't appear in the UI, then there is likely a problem to troubleshoot.

First, go over the [guide](https://grafana.com/docs/grafana-cloud/k6/author-run/private-load-zone-v2/) to double-check if all the steps have been done correctly and successfully.

Unlike `TestRun` deployment, when a `PrivateLoadZone` is first created, there are no additional resources deployed. So, the only source for troubleshooting are the logs of k6 Operator. See the [previous subsection](#k6-operator) on how to access its logs. Any errors there might be a hint to diagnose the issue. Refer to [PrivateLoadZone: subscription error](#privateloadzone-subscription-error) for more details.

### Running tests in `PrivateLoadZone`

Each time a user runs a test in a PLZ, for example with `k6 cloud script.js`, there is a corresponding `TestRun` being deployed by the k6 Operator. This `TestRun` will be deployed in the same namespace as its `PrivateLoadZone`. If the test is misbehaving, for example, it errors out, or doesn't produce the expected result, then you can check:

1. If there are any messages in the GCk6 UI.
2. If there are any messages in the output of the `k6 cloud` command.
3. The resources and their logs, the same way as with a [standalone `TestRun` deployment](#testrun-deployment)

## Common scenarios

### Issues with environment variables

Refer to [Environment variables](https://github.com/grafana/k6-operator/blob/main/docs/env-vars.md) for details on how to pass environment variables to the k6 Operator.

### Tags not working

Tags are a rather common source of errors when using the k6 Operator. For example, the following tags would lead to parsing errors:

```yaml
  arguments: --tag product_id="Test A"
  # or
  arguments: --tag foo=\"bar\"
```

You can see those errors in the logs of either the initializer or the runner Pod, for example:

```bash
time="2024-01-11T11:11:27Z" level=error msg="invalid argument \"product_id=\\\"Test\" for \"--tag\" flag: parse error on line 1, column 12: bare \" in non-quoted-field"
```

This is a common problem with escaping the characters. You can find an [issue](https://github.com/grafana/k6-operator/issues/211) in the k6 Operator repository that can be upvoted.

### Initializer logs an error but it's not about tags

This can happen because of lack of attention to the [preparation](#preparation) step. One command that you can use to help diagnose issues with your script is the following:

```bash
k6 inspect --execution-requirements script.js
```

That command is a shortened version of what the initializer Pod is executing. If the command produces an error, there's a problem with the script itself and it should be solved outside of the k6 Operator. The error itself may contain a hint to what's wrong, such as a syntax error.

If the standalone `k6 inspect --execution-requirements` executes successfully, then it's likely a problem with `TestRun` deployment specific to your Kubernetes setup. A couple of recommendations here are:

- Review the output of the initializer Pod: is it logged by the k6 process or by something else?
  - :information_source: k6 Operator expects the initializer logs to contain only the output of `k6 inspect`. If there are any other log lines present, then the k6 Operator will fail to parse it and the test won't start. Refer to this [issue](https://github.com/grafana/k6-operator/issues/193) for more details.
- Check events in the initializer Job and Pod as they may contain another hint about what's wrong.

### Non-existent ServiceAccount

A ServiceAccount can be defined as `serviceAccountName` in a PrivateLoadZone, and as `runner.serviceAccountName` in a TestRun CRD. If the specified ServiceAccount doesn't exist, k6 Operator will successfully create Jobs but corresponding Pods will fail to be deployed, and the k6 Operator will wait indefinitely for Pods to be `Ready`. This error can be best seen in the events of the Job:

```bash
kubectl describe job plz-test-xxxxxx-initializer
...
Events:
  Warning  FailedCreate  57s (x4 over 2m7s)  job-controller  Error creating: pods "plz-test-xxxxxx-initializer-" is forbidden: error looking up service account plz-ns/plz-sa: serviceaccount "plz-sa" not found
```

k6 Operator doesn't try to analyze such scenarios on its own, but you can refer to the following [issue](https://github.com/grafana/k6-operator/issues/260) for improvements.

#### How to fix

To fix this issue, the incorrect `serviceAccountName` must be corrected, and the TestRun or PrivateLoadZone resource must be re-deployed.

### Non-existent `nodeSelector`

`nodeSelector` can be defined as `nodeSelector` in a PrivateLoadZone, and as `runner.nodeSelector` in the TestRun CRD.

This case is very similar to the [ServiceAccount](#non-existent-serviceaccount): the Pod creation will fail, but the error is slightly different:

```bash
kubectl describe pod plz-test-xxxxxx-initializer-xxxxx
...
Events:
  Warning  FailedScheduling  48s (x5 over 4m6s)  default-scheduler  0/1 nodes are available: 1 node(s) didn't match Pod's node affinity/selector.
```

#### How to fix

To fix this issue, the incorrect `nodeSelector` must be corrected and the TestRun or PrivateLoadZone resource must be re-deployed.

### Insufficient resources

A related problem can happen when the cluster does not have sufficient resources to deploy the runners. There's a higher probability of hitting this issue when setting small CPU and memory limits for runners or using options like `nodeSelector`, `runner.affinity` or `runner.topologySpreadConstraints`, and not having a set of nodes matching the spec. Alternatively, it can happen if there is a high number of runners required for the test (via `parallelism` in TestRun or during PLZ test run) and autoscaling of the cluster has limits on the maximum number of nodes, and can't provide the required resources on time or at all.

This case is somewhat similar to the previous two: the k6 Operator will wait indefinitely and can be monitored with events in Jobs and Pods. If it's possible to fix the issue with insufficient resources on-the-fly, for example, by adding more nodes, k6 Operator will attempt to continue executing a test run.

### OOM of a runner Pod

If there's at least one runner Pod that OOM-ed, the whole test will be [stuck](https://github.com/grafana/k6-operator/issues/251) and will have to be deleted manually:

```bash
kubectl -f my-test.yaml delete
# or
kubectl delete testrun my-test
```

In case of OOM, it makes sense to review the k6 script to understand what kind of resource usage this script requires. It may be that the k6 script can be improved to be more performant. Then, set the `spec.runner.resources` in the TestRun CRD, or `spec.resources` in the PrivateLoadZone CRD accordingly.

### PrivateLoadZone: subscription error

If there's an issue with your Grafana Cloud k6 subscription, there will be a 400 error in the logs with the message detailing the problem. For example:

```bash
"Received error `(400) You have reached the maximum Number of private load zones your organization is allowed to have. Please contact support if you want to create more.`. Message from server ``"
```

To fix this issue, check your organization settings in Grafana Cloud k6 or contact Support.

### PrivateLoadZone: Wrong token

There can be two major problems with the authentication token:

1. If the token wasn't created, or was created in a wrong location, the logs will show the following error:

   ```bash
   Failed to load k6 Cloud token	{"namespace": "plz-ns", "name": "my-plz", "reconcileID": "67c8bc73-f45b-4c7f-a9ad-4fd0ffb4d5f6", "name": "token-with-wrong-name", "secretNamespace": "plz-ns", "error": "Secret \"token-with-wrong-name\" not found"}
   ```

2. If the token contains a corrupted value, or it's not an organizational token, the logs will show the following error:

   ```bash
   "Received error `(403) Authentication token incorrect or expired`. Message from server ``"
   ```

### PrivateLoadZone: Networking setup

If you see any dial or connection errors in the logs of the k6 Operator, it makes sense to double-check the networking setup. For a PrivateLoadZone to operate, outbound traffic to Grafana Cloud k6 [must be allowed](https://grafana.com/docs/grafana-cloud/k6/author-run/private-load-zone-v2/#before-you-begin). To check the reachability of Grafana Cloud k6 endpoints:

```bash
kubectl apply -f https://k8s.io/examples/admin/dns/dnsutils.yaml
kubectl exec -it dnsutils -- nslookup ingest.k6.io
kubectl exec -it dnsutils -- nslookup api.k6.io
```

For more resources on troubleshooting networking, refer to the [Kubernetes docs](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/).

### PrivateLoadZone: Insufficient resources

The PrivateLoadZone insufficient resources problem is similar to [insufficient resources issue](#insufficient-resources). But, when running a PrivateLoadZone test, the k6 Operator will wait only for a timeout period. When the timeout period is up, the test will be aborted by Grafana Cloud k6 and marked as such, both in the PrivateLoadZone and in Grafana Cloud k6. In other words, there is a time limit to fix this issue without restarting the test run.
