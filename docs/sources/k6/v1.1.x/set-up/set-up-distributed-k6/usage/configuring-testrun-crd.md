---
weight: 300
title: Configuring TestRun CRD
---

# Configuring `TestRun` CRD

<!-- TODO: consider removing this page once machine-generated reference becomes part of the docs -->

The only options that are required as part of the `TestRun` CRD spec are `script` and `parallelism`. But there are many other options that can be set in `TestRun` CRD. Refer to the [crd-generated.md](https://github.com/grafana/k6-operator/blob/main/docs/crd-generated.md) file in the k6-operator GitHub repository for a complete list of all available fields.

Let's look at some of the most common options in greater detail.

## Parallelism

`parallelism` defines how many instances of k6 runners you want to create. Each instance is assigned an equal execution segment. For instance, if your test script is configured to run 200 VUs and `parallelism` is set to 4, the k6 Operator creates four k6 jobs, each running 50 VUs to achieve the desired VU count.

## Separate

`separate: true` indicates that the jobs created need to be distributed across different nodes. This is useful if you're running a test with a really high VU count and want to make sure the resources of each node won't become a bottleneck.

## Service account

If you want to use a custom Service Account you'll need to pass it into both the starter and the runner object:

```yaml
apiVersion: k6.io/v1alpha1
kind: TestRun
metadata:
  name: <test-name>
spec:
  script:
    configMap:
      name: '<configmap>'
  runner:
    serviceAccountName: <service-account>
  starter:
    serviceAccountName: <service-account>
```

## Runner

Defines options for the test runner pods. The non-exhaustive list includes:

- Passing resource limits and requests.
- Passing in labels and annotations.
- Passing in affinity and anti-affinity.
- Passing in a custom image.

## Starter

Defines options for the starter pod. The non-exhaustive list includes:

- Passing in a custom image.
- Passing in labels and annotations.

## Initializer

By default, the initializer Job is defined with the same options as the runner Jobs, but its options can be overwritten by setting `.spec.initializer`.
