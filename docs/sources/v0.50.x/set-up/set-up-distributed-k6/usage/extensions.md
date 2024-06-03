---
weight: 200
title: Use k6-operator with k6 extensions
---

# Use k6-operator with k6 extensions

By default, the k6 operator uses `grafana/k6:latest`, or the latest version of k6, as the container image for the test jobs.

If you want to use k6 [extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions/) built with [xk6](https://github.com/grafana/xk6), you'll need to create your own image and override the `image` property on the `TestRun` Kubernetes resource.

For example, this is a `Dockerfile` that builds a k6 binary with the `xk6-output-influxdb` extension:

```Dockerfile
# Build the k6 binary with the extension
FROM golang:1.20 as builder

RUN go install go.k6.io/xk6/cmd/xk6@latest

# For our example, we'll add support for output of test metrics to InfluxDB v2.
# Feel free to add other extensions using the '--with ...'.
RUN xk6 build \
    --with github.com/grafana/xk6-output-influxdb@latest \
    --output /k6

# Use the operator's base image and override the k6 binary
FROM grafana/k6:latest
COPY --from=builder /k6 /usr/bin/k6
```

You can build the image based on this `Dockerfile` by executing:

```bash
docker build -t k6-extended:local .
```

After the build completes, you can push the resulting `k6-extended:local` image to an image repository accessible to your Kubernetes cluster.

You can then use that image as follows:

```yaml
# k6-resource-with-extensions.yml

apiVersion: k6.io/v1alpha1
kind: TestRun
metadata:
  name: k6-sample-with-extensions
spec:
  parallelism: 4
  script:
    configMap:
      name: my-stress-test
      file: test.js
  runner:
    image: k6-extended:local
    env:
      - name: K6_OUT
        value: xk6-influxdb=http://influxdb.somewhere:8086/demo
```

Note that this examples overrides the default image with `k6-extended:latest`, and it includes environment variables that are required by the `xk6-output-influxdb` extension.

## Output to Grafana Cloud k6

With k6, you can send the [output from a test run to Grafana Cloud k6](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/cloud) with the `k6 run --out cloud script.js` command. This feature is also available in k6-operator, if you have a Grafana Cloud account. Note that it supports only `parallelism: 20` or less.

To use this option in k6-operator, set the argument in YAML:

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

Alternatively, if you installed operator with Makefile, you can uncomment the cloud output section in `config/default/kustomization.yaml` and copy your token from Grafana Cloud k6 there:

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
