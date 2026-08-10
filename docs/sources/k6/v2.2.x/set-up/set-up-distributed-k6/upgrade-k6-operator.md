---
weight: 200
title: Upgrade the k6 Operator
---

# Upgrade the k6 Operator

This guide explains how to upgrade the k6 Operator, depending on your installation method. Before upgrading, make sure to read the [release notes](https://github.com/grafana/k6-operator/releases) to know what changed and if any breaking changes happened.

## k6 Operator installed with bundle

If you installed the k6 Operator with [bundle](https://grafana.com/docs/k6/<K6_VERSION>/set-up/set-up-distributed-k6/install-k6-operator/#deploy-with-bundle), you can usually upgrade by re-running the `kubectl apply` command with the latest bundle file. However, this won't remove resources that are no longer present in the new bundle. To avoid leaving outdated resources in your cluster, follow these steps:

1. Download the version of `bundle.yaml` you originally used and save it as `old.bundle.yaml`.
1. Delete the old installation:

   ```sh
   kubectl -f old.bundle.yaml delete
   ```

1. Download the latest bundle and install it:

   ```sh
   curl https://raw.githubusercontent.com/grafana/k6-operator/main/bundle.yaml > bundle.yaml
   kubectl apply -f bundle.yaml
   ```

1. Save the latest bundle as your new `old.bundle.yaml` for future upgrades:

   ```sh
   cp bundle.yaml old.bundle.yaml
   ```

{{< admonition type="note" >}}
Always review the [release notes](https://github.com/grafana/k6-operator/releases) and compare the new `bundle.yaml` with your previous version before upgrading.
{{< /admonition >}}

### Split the bundle for long-term maintenance

Bundle installation is quick, but not always flexible for long-term maintenance. You can split the bundle into separate manifest files and manage them with Kustomize or a GitOps workflow. For inspiration, refer to the [run-tests.sh script](https://github.com/grafana/k6-operator/blob/main/e2e/run-tests.sh) in the k6 Operator repository.

## k6 Operator installed with Helm

If you installed the k6 Operator with [Helm](https://grafana.com/docs/k6/<K6_VERSION>/set-up/set-up-distributed-k6/install-k6-operator/#deploy-with-helm), upgrade with these commands:

```sh
helm repo update
helm upgrade k6-operator grafana/k6-operator
```

## k6 Operator installed with Makefile

If you installed the k6 Operator with a [Makefile](https://grafana.com/docs/k6/<K6_VERSION>/set-up/set-up-distributed-k6/install-k6-operator/#deploy-with-makefile), upgrade with these commands:

```sh
git clone https://github.com/grafana/k6-operator && cd k6-operator
git checkout <LATEST_RELEASE_TAG>

make deploy
```

Replace `<LATEST_RELEASE_TAG>` with the latest release tag from the [k6 Operator releases](https://github.com/grafana/k6-operator/releases).

{{< admonition type="caution" >}}

Make sure to switch to the tagged commit before running `make deploy`. If you run `make deploy` from the latest commit of the `main` branch, you may end up with a broken installation, because the `main` branch isn't guaranteed to be stable.

{{< /admonition >}}

This method is similar to the [split bundle approach](#split-the-bundle-for-long-term-maintenance), but it's closer to development mode and requires Golang and Kustomize to be installed.