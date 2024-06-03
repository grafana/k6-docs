---
weight: 100
title: Install k6-operator
---

# Install k6-operator

This guide provides step-by-step instructions on how to install k6 operator.

## Before you begin

To install k6 operator, you'll need:

- A Kubernetes cluster, along with access to it.
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl).

## Deploy the operator

There are three different options that you can use to deploy the k6-operator.

### Deploy with bundle

The easiest way to install the operator is with bundle:

```bash
curl https://raw.githubusercontent.com/grafana/k6-operator/main/bundle.yaml | kubectl apply -f -
```

Bundle includes default manifests for k6-operator, including a `k6-operator-system` namespace and k6-operator deployment with the latest tagged Docker image. Customizations can be made on top of this manifest as needed, for example, with `kustomize`.

### Deploy with Helm

Helm releases of k6-operator are published together with other Grafana Helm charts. You can install it with the following commands:

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install k6-operator grafana/k6-operator
```

You can also pass additional configuration options with a `values.yaml` file:

```bash
helm install k6-operator grafana/k6-operator -f values.yaml
```

Refer to the [k6-operator samples folder](https://github.com/grafana/k6-operator/blob/main/charts/k6-operator/samples/customAnnotationsAndLabels.yaml) for an example file.

You can find a complete list of Helm options in the [k6 operator charts folder](https://github.com/grafana/k6-operator/blob/main/charts/k6-operator/README.md).

### Deploy with Makefile

In order to install the operator with a Makefile, you'll need:

- [go](https://go.dev/doc/install)
- [kustomize](https://kubectl.docs.kubernetes.io/installation/kustomize/)

A more manual, low-level way to install the k6 operator is by running the command below:

```bash
make deploy
```

This method may be more useful for development of the k6-operator, depending on specifics of the setup.

## Install the CRD

The k6-operator includes custom resources called `TestRun`, `PrivateLoadZone`, and `K6`. They're automatically installed when you do a deployment or install a bundle, but you can also manually install them by running:

```bash
make install
```

{{< admonition type="warning" >}}

The `K6` CRD has been replaced by the `TestRun` CRD and will be deprecated in the future. We recommend using the `TestRun` CRD.

{{< /admonition >}}

## Deploy with custom namespace

By default, the k6-operator watches `TestRun` and `PriavteLoadZone` custom resources in all namespaces. You can also configure the k6-operator to watch a specific namespace by setting the `WATCH_NAMESPACE` environment variable for the operator's deployment:

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
              value: 'some-ns'
# ...
```
