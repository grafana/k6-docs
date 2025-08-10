---
weight: 200
title: Use k6 Operator with k6 extensions
---

# Use k6 Operator with k6 extensions

By default, the k6 Operator uses `ghcr.io/grafana/k6-operator:latest-runner` as the container image for the test jobs.

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

## Troubleshooting

If a `TestRun` with a custom image does not start the test and the k6 Operator [logs an error about the initializer](https://grafana.com/docs/k6/latest/set-up/set-up-distributed-k6/troubleshooting/#an-error-on-reading-output-of-the-initializer-pod), check the following command:
```sh
docker run --entrypoint sh k6-extended:local -c "ls -l && k6 version"
```

This command should execute without an error.