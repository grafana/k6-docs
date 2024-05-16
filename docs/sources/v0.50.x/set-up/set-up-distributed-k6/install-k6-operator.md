---
weight: 100
title: Install k6-operator
---

# Install k6-operator

## Prerequisites

The minimal prerequisite for k6-operator is a Kubernetes cluster and access to it with [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl).

## Deploying the operator

### Bundle deployment

The easiest way to install the operator is with bundle:
```bash
curl https://raw.githubusercontent.com/grafana/k6-operator/main/bundle.yaml | kubectl apply -f -
```

Bundle includes default manifests for k6-operator, including `k6-operator-system` namespace and k6-operator Deployment with latest tagged Docker image. Customizations can be made on top of this manifest as needs be, e.g. with `kustomize`.

### Deployment with Helm

Helm releases of k6-operator are published together with other Grafana Helm charts and can be installed with the following commands:

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install k6-operator grafana/k6-operator
```

Passing additional configuration can be done with `values.yaml` (example can be found [here](https://github.com/grafana/k6-operator/blob/main/charts/k6-operator/samples/customAnnotationsAndLabels.yaml)):

```bash
helm install k6-operator grafana/k6-operator -f values.yaml
```

Complete list of options available for Helm can be found [here](https://github.com/grafana/k6-operator/blob/main/charts/k6-operator/README.md).

### Makefile deployment

In order to install the operator with Makefile, the following additional tooling must be installed:
- [go](https://go.dev/doc/install)
- [kustomize](https://kubectl.docs.kubernetes.io/installation/kustomize/)

A more manual, low-level way to install the operator is by running the command below:

```bash
make deploy
```

This method may be more useful for development of k6-operator, depending on specifics of the setup.

## Installing the CRD

The k6-operator includes custom resources called `TestRun`, `PrivateLoadZone` and currently also `K6`. These will be automatically installed when you do a deployment or install a bundle, but in case you want to do it yourself, you may run the command below:

```bash
make install
```

{{% admonition type="warning" %}}

`K6` CRD has been substituted with `TestRun` CRD and will be deprecated in the future. Please use `TestRun` CRD.

{{% /admonition %}}

## Namespaced deployment

By default, k6-operator watches `TestRun` and `PriaveLoadZone` custom resources in all namespaces. But it is possible to configure k6-operator to watch only a specific namespace by setting a `WATCH_NAMESPACE` environment variable for the operator's deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: k6-operator-controller-manager
  namespace: k6-operator-system
spec:
  template:
    spec:
      containers:
        - name: manager
          image: ghcr.io/grafana/k6-operator:controller-v0.0.14
          env:
            - name: WATCH_NAMESPACE
              value: "some-ns"
# ...
```

{{< section depth=2 >}}
