---
weight: 250
title: Use the k6 Operator with Grafana Cloud k6
---

# Use the k6 Operator with Grafana Cloud k6

Grafana Cloud k6 is the Grafana Cloud offering of k6, which gives you access to all of k6 capabilities, while Grafana handles the infrastructure, storage, and metrics aggregation and insights from your tests.

When using the k6 Operator, you can still leverage Grafana Cloud k6 to get access to the metric analysis that the platform offers.

There are two ways to use the k6 Operator with Grafana Cloud k6: Private Load Zones and Cloud output.

## Before you begin

To use the k6 Operator with Grafana Cloud k6, you’ll need:

- A [Grafana Cloud account](https://grafana.com/auth/sign-up/create-user).

## Private Load Zones

Private Load Zones (PLZ) are load zones that you can host inside your network by using the k6 Operator. You can start a cloud test in a PLZ by referencing it by name from your script, and the test will run in the nodes of your Kubernetes cluster.

Refer to [Set up private load zones](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/private-load-zone-v2/) for more details.

## Cloud output

With k6, you can send the [output from a test run to Grafana Cloud k6](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/cloud) with the `k6 run --out cloud script.js` command. This feature is also available in the k6 Operator if you have a Grafana Cloud account.

{{< admonition type="note" >}}

The cloud output option only supports a `parallelism` value of 20 or less.

{{< /admonition >}}

To use this option in k6 Operator, set the argument in YAML:

```yaml
# ...
script:
  configMap:
    name: '<configmap>'
arguments: --out cloud
# ...
```

Then, if you installed operator with bundle or Helm, create a secret with the following command:

```bash
kubectl -n k6-operator-system create secret generic my-cloud-token \
    --from-literal=token=<COPY YOUR TOKEN HERE> && kubectl -n k6-operator-system label secret my-cloud-token "k6cloud=token"
```

Alternatively, if you installed operator with a Makefile, you can uncomment the cloud output section in `config/default/kustomization.yaml` and copy your token from Grafana Cloud k6 there:

```yaml
# Uncomment this section if you need cloud output and copy-paste your token
secretGenerator:
  - name: cloud-token
    literals:
      - token=<copy-paste-token-string-here>
    options:
      annotations:
        kubernetes.io/service-account.name: k6-operator-controller
      labels:
        k6cloud: token
```

After updating the file, run `make deploy`.

After these steps, you can run k6 with the cloud output and default values of `projectID` and `name`.

Refer to [Cloud options](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/cloud-scripting-extras/cloud-options/#cloud-options) for details on how to change the `projectID` and `name` options.
