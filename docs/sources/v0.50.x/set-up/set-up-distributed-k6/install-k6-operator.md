---
weight: 100
title: Install k6 Operator
---

# Install k6 Operator

This guide provides step-by-step instructions on how to install k6 Operator.

## Before you begin

To install k6 Operator, you'll need:

- A Kubernetes cluster, along with access to it.
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl).

## Deploy the operator

There are three different options that you can use to deploy the k6 Operator.

### Deploy with bundle

The easiest way to install the operator is with bundle:

```bash
curl https://raw.githubusercontent.com/grafana/k6-operator/main/bundle.yaml | kubectl apply -f -
```

Bundle includes default manifests for k6 Operator, including a `k6-operator-system` namespace and k6 Operator deployment with the latest tagged Docker image. Customizations can be made on top of this manifest as needed, for example, with `kustomize`.

### Deploy with Helm

Helm releases of k6 Operator are published together with other Grafana Helm charts. You can install it with the following commands:

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm install k6-operator grafana/k6-operator
```

You can also pass additional configuration options with a `values.yaml` file:

```bash
helm install k6-operator grafana/k6-operator -f values.yaml
```

Refer to the [k6 Operator samples folder](https://github.com/grafana/k6-operator/blob/main/charts/k6-operator/samples/customAnnotationsAndLabels.yaml) for an example file.

You can find a complete list of Helm options in the [k6 Operator charts folder](https://github.com/grafana/k6-operator/blob/main/charts/k6-operator/README.md).

### Deploy with Makefile

In order to install the operator with a Makefile, you'll need:

- [go](https://go.dev/doc/install)
- [kustomize](https://kubectl.docs.kubernetes.io/installation/kustomize/)

A more manual, low-level way to install the k6 operator is by running the command below:

```bash
make deploy
```

This method may be more useful for development of the k6 Operator, depending on specifics of the setup.

## Install the CRD

The k6 Operator includes custom resources called `TestRun`, `PrivateLoadZone`, and `K6`. They're automatically installed when you do a deployment or install a bundle, but you can also manually install them by running:

```bash
make install
```

{{< admonition type="warning" >}}

The `K6` CRD has been replaced by the `TestRun` CRD and will be deprecated in the future. We recommend using the `TestRun` CRD.

{{< /admonition >}}

## Namespaced deployment

By default, the k6 Operator watches `TestRun` and `PrivateLoadZone` custom resources in all namespaces. You can also configure the k6 Operator to watch a specific namespace by setting the `WATCH_NAMESPACE` environment variable for the operator's deployment:

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

## Uninstall k6 Operator

You can remove all of the resources created by the k6 Operator with `bundle`:

```bash
curl https://raw.githubusercontent.com/grafana/k6-operator/main/bundle.yaml | kubectl delete -f -
```

Or with the `make` command:

```bash
make delete
```
