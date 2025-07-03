---
title: Shared scenarios for troubleshooting k6 Operator
---

### k6 runners do not start

The k6 runners do not start and in the k6 Operator logs, you see an error `Waiting for initializing pod to finish`.

In this case, it is most likely that an initializer Pod was not being able to start for some reason.

#### How to fix

Refer to [this section](#the-jobs-and-pods) to see how to:

1. Check if the initializer Pod has started and finished.
1. See an issue in initializer Job's description that prevents a Pod from being scheduled.

Once the error preventing the initializer Pod from starting and completing is resolved, redeploy the `TestRun` or, in case of a `PrivateLoadZone` test, restart the k6 process.

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

To fix this issue, the incorrect `serviceAccountName` must be corrected, and the `TestRun` or `PrivateLoadZone` resource must be re-deployed.

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

To fix this issue, the incorrect `nodeSelector` must be corrected and the `TestRun` or `PrivateLoadZone` resource must be re-deployed.

### Insufficient resources

A related problem can happen when the cluster does not have sufficient resources to deploy the runners. There's a higher probability of hitting this issue when setting small CPU and memory limits for runners or using options like `nodeSelector`, `runner.affinity` or `runner.topologySpreadConstraints`, and not having a set of nodes matching the spec. Alternatively, it can happen if there is a high number of runners required for the test (via `parallelism` in TestRun or during PLZ test run) and autoscaling of the cluster has limits on the maximum number of nodes, and can't provide the required resources on time or at all.

This case is somewhat similar to the previous two: the k6 Operator will wait indefinitely and can be monitored with events in Jobs and Pods. If it's possible to fix the issue with insufficient resources on-the-fly, for example, by adding more nodes, k6 Operator will attempt to continue executing a test run.

### OOM of a runner Pod

If there's at least one runner Pod that OOM-ed, the whole test will be [stuck](https://github.com/grafana/k6-operator/issues/251) and will have to be deleted manually:

```bash
kubectl delete testrun my-test
```

A `PrivateLoadZone` test or a `TestRun` [with cloud output](https://grafana.com/docs/k6/latest/set-up/set-up-distributed-k6/usage/k6-operator-to-gck6/#cloud-output) will be aborted by the Grafana Cloud k6 after its expected duration is up.

#### How to fix

In the case of OOM, it makes sense to review the k6 script to understand what kind of resource usage this script requires. It may be that the k6 script can be improved to be more performant. Then, set the `spec.runner.resources` in the `TestRun` CRD, or `spec.resources` in the `PrivateLoadZone` CRD accordingly.

### Disruption of the k6 runners

The k6 test can execute for a long time. But depending on the Kubernetes setup, it may happen that the Pods running k6 are disrupted and moved elsewhere during execution. This will skew the result of the test. In the case of a `PrivateLoadZone` test or a `TestRun` [with cloud output](https://grafana.com/docs/k6/latest/set-up/set-up-distributed-k6/usage/k6-operator-to-gck6/#cloud-output), the test run may additionally be aborted by Grafana Cloud k6 once its expected duration is up, regardless of the exact state of k6 processes.

#### How to fix

Ensure that k6 Pods cannot be disrupted by the Kubernetes setup, e.g. with [PodDisruptionBudget](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/) and less aggressive configuration of autoscaler.
