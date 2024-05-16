---
weight: 200
title: Extensions
---

# Extensions

By default, the operator will use `grafana/k6:latest` as the container image for the test jobs.
If you want to use [extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions/) built with [xk6](https://github.com/grafana/xk6) you'll need to create your own image and override the `image` property on the `TestRun` Kubernetes resource.

For example, create a `Dockerfile` with the following content:

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

Build the image based on this `Dockerfile` by executing:
```bash
docker build -t k6-extended:local .
```

Once the build is completed, push the resulting `k6-extended:local` image to an image repository accessible to your Kubernetes cluster.
We can now use it as follows:

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

Note that we are overriding the default image with `k6-extended:latest`, providing the test runner with environment variables used by our included extensions.

## k6 Cloud output

k6 supports [output to its Cloud](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/cloud) with `k6 run --out cloud script.js` command. This feature is available in k6-operator as well for subscribed users. Note that it supports only `parallelism: 20` or less.

To use this option in k6-operator, set the argument in yaml:

```yaml
# ...
  script:
    configMap:
      name: "<configmap>"
  arguments: --out cloud
# ...
```

Then, if you installed operator with bundle or Helm, create a secret with the following command:

```bash
kubectl -n k6-operator-system create secret generic my-cloud-token \
    --from-literal=token=<COPY YOUR TOKEN HERE> && kubectl -n k6-operator-system label secret my-cloud-token "k6cloud=token"
```

Alternatively, if you installed operator with Makefile, you can uncomment cloud output section in `config/default/kustomization.yaml` and copy your token from the Cloud there:

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

And re-run `make deploy`.

This is sufficient to run k6 with the Cloud output and default values of `projectID` and `name`. For non-default values, extended script options can be used like this:

```js
export let options = {
  // ...
  ext: {
    loadimpact: {
      name: 'Configured k6-operator test',
      projectID: 1234567,
    }
  }
};
```

{{< section depth=2 >}}
