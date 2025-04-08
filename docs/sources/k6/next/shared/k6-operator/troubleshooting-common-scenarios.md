---
title: Shared scenarios for troubleshooting k6 Operator
---

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
