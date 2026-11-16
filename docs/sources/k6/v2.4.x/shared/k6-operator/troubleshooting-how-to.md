---
title: Shared tips for troubleshooting k6 Operator
---

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

#### The Jobs and Pods

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

#### `TestRun` with `cleanup` option

If a `TestRun` has the [`spec.cleanup` option](https://grafana.com/docs/k6/latest/set-up/set-up-distributed-k6/usage/executing-k6-scripts-with-testrun-crd/#clean-up-resources) set, as [`PrivateLoadZone`](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/private-load-zone/) tests always do, for example, it may be harder to locate and analyze the Pod before it's deleted.

In that case, we recommend using observability solutions, like Prometheus and Loki, to store metrics and logs for later analysis.

As an alternative, it's also possible to watch for the resources manually with the following commands:

  ```bash
  kubectl get jobs -n my-namespace -w
  kubectl get pods -n my-namespace -w

  # To get detailed information (this one is quite verbose so use with caution):
  kubectl get pods -n my-namespace -w -o yaml
  ```

#### k6 Operator

Another source of info is the k6 Operator itself. It's deployed as a Kubernetes `Deployment`, with `replicas: 1` by default, and its logs together with observations about the Pods from the previous section usually contain enough information to help you diagnose any issues. With the standard deployment, the logs of the k6 Operator can be checked with:

```bash
kubectl -n k6-operator-system -c manager logs k6-operator-controller-manager-xxxxxxxx-xxxxx
```

#### Inspect `TestRun` resource

After you or `PrivateLoadZone` deployed a `TestRun` CR, you can inspect it the same way as any other resource:

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

#### Debugging k6 process

If the script is working locally as expected, and the previous steps show no errors as well, yet you don't see an expected result of a test and suspect k6 process is at fault, you can use the k6 [verbose option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/#options) in the `TestRun` spec:

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