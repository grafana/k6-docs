---
weight: 500
title: Use the k6 Operator with Istio
---

# Use the k6 Operator with Istio

To use the k6 Operator against a cluster with [Istio](https://istio.io) support, you may need to perform some additional configuration. Istio has two modes of execution: sidecar mode and ambient mode.

## Sidecar mode

If you use Istio in [sidecar mode](https://istio.io/latest/docs/setup/), first, check the versions of your cluster and Istio. For the k6 Operator to work without issues, Istio's version must be 1.19 or higher, and the Kubernetes version must be 1.28 or higher.

Additionally, Kubernetes cluster must have native sidecars [enabled](https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/), which is the default behaviour since version 1.29 but must be enabled with a feature gate in version 1.28. Here's an example of the [kind cluster](https://kind.sigs.k8s.io/) with this configuration:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
featureGates:
  SidecarContainers: true
```

If the above requirements are not fulfilled, k6 Operator will not be able to work with Istio because of [this issue](https://github.com/istio/istio/issues/11045): the non-native sidecar `istio-proxy` doesn't exit and all Kubernetes Jobs end up stuck, including the ones started by the k6 Operator. Because of this, k6 Jobs enter a `NotReady` state, and the k6 Operator doesn't know how to handle it in a general case.

To solve this, upgrade versions of your cluster and Istio as described above and switch to using [Istio with native sidecars](https://istio.io/latest/blog/2023/native-sidecars/). As described in the [blog](https://istio.io/latest/blog/2023/native-sidecars/#trying-it-out), you need to enable the `ENABLE_NATIVE_SIDECARS` flag in Istio as well.

### Mark k6 pods for Istio injection

Istio in sidecar mode lets you [configure injection](https://istio.io/latest/docs/setup/additional-setup/sidecar-injection/#controlling-the-injection-policy) on Pods and Namespaces.

Since the k6 Operator is not aware of the Istio setup on your cluster, it will, by default, create Pods without Istio labels. If you create a `TestRun`, you can set the Istio labels via `.spec.runner.metadata.labels`. If you create a `PrivateLoadZone`, you can set the labels on the Namespace where the `PrivateLoadZone` CR is created.

## Ambient mode

If you use Istio in [ambient mode](https://istio.io/latest/docs/ambient/), the k6 Operator should work out of the box, as Istio in ambient mode doesn't modify Kubernetes workloads.

### Mark k6 pods for Istio injection

Istio in ambient mode lets you [configure injection](https://istio.io/latest/docs/ambient/usage/add-workloads/#ambient-labels) on Pods, Services, and Namespaces.

Similarly to [injection in sidecar mode](#mark-k6-pods-for-istio-injection), you can use Pod-level configuration with a `TestRun` and Namespace-level configuration with a `PrivateLoadZone`.
