---
weight: 200
title: Upgrade k6 Operator
---

# Upgrade k6 Operator

During new releases of the k6 Operator, it is highly recommended to upgrade to the latest version as soon as possible. Before upgrading, make sure to read the [release notes](https://github.com/grafana/k6-operator/releases) to know what changed and if any breaking changes happened.

The exact method of upgrade depends both on the [installation method](https://grafana.com/docs/k6/latest/set-up/set-up-distributed-k6/install-k6-operator/) used and any established policies in your cluster. Let's look into how each installation method impacts the upgrade procedure.

## k6 Operator installed with bundle

If the k6 Operator was installed [with bundle](https://grafana.com/docs/k6/latest/set-up/set-up-distributed-k6/install-k6-operator/#deploy-with-bundle), the `kubectl apply` command acts as an upgrade command as well. So as a general rule, it is sufficient to re-run that command to upgrade the k6 Operator.

However, it is also recommended to monitor the [release notes](https://github.com/grafana/k6-operator/releases) and see the diff of the `bundle.yaml` file before upgrade. It might be that some Kubernetes resources were removed or renamed and are no longer part of the `bundle.yaml`. In that case, the `kubectl apply -f bundle.yaml` command will only upgrade resources that remain, but will not remove any outdated resources. Then, the cluster can end up with outdated and unnecessary resources.

A more fool-proof way to upgrade the bundle is to run a full delete operation first, for example:
```sh
# Download a version of bundle.yaml that you used to
# install k6 Operator the first time as "old.bundle.yaml".

# Delete the old installation:
kubectl -f old.bundle.yaml delete

# Download the latest bundle and install it:
curl https://raw.githubusercontent.com/grafana/k6-operator/main/bundle.yaml > bundle.yaml
kubectl apply -f bundle.yaml

# Keep the latest bundle as a new "old.bundle.yaml" for the next update.
cp bundle.yaml old.bundle.yaml
```

### Splitting the bundle

Bundle installation is very quick and easy, but as you can see, it is not the most flexible for long-term maintenance. One way to improve this is to split the bundle into separate manifest definition files and keep track of those with a Kustomize or GitOps system.

The k6 Operator does not provide tools for splitting the bundle, but some inspiration on how to split the bundle into separate files can be seen in [this script](https://github.com/grafana/k6-operator/blob/main/e2e/run-tests.sh).

## k6 Operator installed with Helm

If k6 Operator was installed [with Helm](https://grafana.com/docs/k6/latest/set-up/set-up-distributed-k6/install-k6-operator/#deploy-with-helm), the upgrade would require the following commands:

```sh
helm repo update
helm upgrade k6-operator grafana/k6-operator
```

## k6 Operator installed with Makefile

If k6 Operator was installed [with Makefile](https://grafana.com/docs/k6/latest/set-up/set-up-distributed-k6/install-k6-operator/#deploy-with-makefile), then use the following commands for upgrade:

```sh
git clone https://github.com/grafana/k6-operator && cd k6-operator
git checkout $LATEST_RELEASE_TAG

make deploy
```

{{< admonition type="caution" >}}

Ensure to switch to the tagged commit before running `make deploy`. If you run `make deploy` from the latest commit of the `main` branch, you may end up with a broken installation, because the `main` branch is not guaranteed to be stable at all times.

{{< /admonition >}}

This method is a bit similar to what is hinted at in the [splitting the bundle approach](#splitting-the-bundle), but it is also closer to development mode and requires Golang and kustomize to be installed.