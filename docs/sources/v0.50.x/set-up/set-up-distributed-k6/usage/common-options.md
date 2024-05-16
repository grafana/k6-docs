---
weight: 300
title: Common options
---

<!-- TODO: consider removeing this once full reference is generated -->

# Common options

The only options that must be defined as part of `TestRun` CRD spec are `script` and `parallelism`. But there are many others; here are some of the most common.

## Parallelism

`parallelism` defines how many instances of k6 runneres you want to create. Each instance will be assigned an equal execution segment. For instance, if your test script is configured to run 200 VUs and `parallelism` is set to 4, the k6-operator will
create four k6 jobs, each running 50 VUs to achieve the desired VU count.

## Separate

`separate: true` indicates that the jobs created need to be distributed across different nodes. This is useful if you're running a
test with a really high VU count and want to make sure the resources of each node won't become a bottleneck.

## Service account

If you want to use a custom Service Account you'll need to pass it into both the starter and runner object:

```yaml
apiVersion: k6.io/v1alpha1
kind: TestRun
metadata:
  name: <test-name>
spec:
  script:
    configMap:
      name: "<configmap>"
  runner:
    serviceAccountName: <service-account>
  starter:
    serviceAccountName: <service-account>
```

## Runner

Defines options for the test runner pods. The non-exhaustive list includes:

* passing resource limits and requests
* passing in labels and annotations
* passing in affinity and anti-affinity
* passing in a custom image

## Starter

Defines options for the starter pod. The non-exhaustive list includes:

* passing in custom image
* passing in labels and annotations


{{< section depth=2 >}}
