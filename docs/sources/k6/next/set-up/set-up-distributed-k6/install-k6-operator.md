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

There are three different methods to deploy the k6 Operator. The first two methods, with bundle and with Helm, install the latest official release of the k6 Operator by default. The third method installs from the branch of the [k6-operator repository](https://github.com/grafana/k6-operator) and is meant for development purposes or for folk who have their own `kustomize` pipeline on top.

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

This is a more manual, low-level way to install the k6 Operator. It installs from the branch of the k6-operator repository. By default, it's the `main` branch, which is not guaranteed to be always stable. In general case, deployment from the branch is meant for development purposes.

However, this method can also be useful for folk who have the `kustomize` pipeline and wish to adjust manifests with `kustomize`. To use this method for regular, production deployments, it is recommended to do that from the tagged commits:

```bash
git clone https://github.com/grafana/k6-operator && cd k6-operator
git checkout v0.0.22
```

The tagged commits correspond to the official releases and are expected to be stable.

In order to install the operator with the Makefile, you need:

- [go](https://go.dev/doc/install)
- [kustomize](https://kubectl.docs.kubernetes.io/installation/kustomize/)

Then, you can install the k6 Operator by running the command below from the root of the cloned repository:

```bash
make deploy
```

### Install the CRDs

The k6 Operator includes custom resources called `TestRun` and `PrivateLoadZone`. They're automatically installed when you use one of the three installation methods above. But you can also manually install the CRDs by running:

```bash
make install
```

## Uninstall k6 Operator

Removal of the k6 Operator depends on the installation method. If you use bundle installation, you can remove all of the resources created by the k6 Operator with the following:

```bash
curl https://raw.githubusercontent.com/grafana/k6-operator/main/bundle.yaml | kubectl delete -f -
```

If you use Helm installation, then removal should be done with the `helm` command:

```bash
helm uninstall k6-operator
```

Finally, if you use Makefile installation, use `make` command to uninstall:

```bash
make delete
```

## Watch namespaces

By default, the k6 Operator watches the `TestRun` and `PrivateLoadZone` custom resources in all namespaces.
You can also configure the k6 Operator to watch specific namespaces by setting either of the following environment variables on the controller's deployment:

* `WATCH_NAMESPACE`: expects the name of a single namespace.
* `WATCH_NAMESPACES`: expects a comma-separated list of namespaces.

Don't set both variables. If `WATCH_NAMESPACES` is set, `WATCH_NAMESPACE` will be ignored.

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
          image: ghcr.io/grafana/k6-operator:controller-v0.0.22
          env:
            - name: WATCH_NAMESPACE
              value: "some-ns"
            # Only use one option, WATCH_NAMESPACE or WATCH_NAMESPACES
            # - name: WATCH_NAMESPACES
            #   value: "some-ns,some-other-namespace"
# ...
```
