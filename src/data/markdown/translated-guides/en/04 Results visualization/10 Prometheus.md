---
title: 'Prometheus'
excerpt: 'The Prometheus integration allows to send test results to any Prometheus Remote Write endpoint.'
---

k6 supports sending test result metrics to a Prometheus Remote Write endpoint via the [`xk6-output-prometheus-remote` extension](https://github.com/grafana/xk6-output-prometheus-remote).  One option with this support is storing the metrics in Prometheus; others can be found [here](https://prometheus.io/docs/operating/integrations/).

## Instructions

First, build a new k6 binary with the PRW extension, using [xk6](https://github.com/grafana/xk6):

<CodeGroup labels={[""]}>

```bash
# Install xk6
go install github.com/grafana/xk6/cmd/xk6@latest

# build k6 binary
xk6 build --with github.com/grafana/xk6-output-prometheus-remote

... [INFO] Build environment ready
... [INFO] Building k6
... [INFO] Build complete: ./k6
```

</CodeGroup>

xk6 will create the k6 binary in the local folder. Then run the test with the new binary as follows:

<CodeGroup labels={[""]}>

```bash
K6_PROMETHEUS_REMOTE_URL=http://localhost:9090/api/v1/write \
    ./k6 run script.js -o output-prometheus-remote
```

</CodeGroup>

All metrics sent by the extension get the prefix `k6_` attached to their names. In case of Prometheus, k6 metrics can be seen in its UI:

![k6 metrics as seen in the Prometheus UI](images/Prometheus/prom.png)

If the remote write endpoint requires authentication, the following command can be used:

<CodeGroup labels={[""]}>

```bash
K6_PROMETHEUS_REMOTE_URL=https://localhost:9090/api/v1/write \
    K6_PROMETHEUS_INSECURE_SKIP_TLS_VERIFY=false K6_CA_CERT_FILE=tls.crt \
    K6_PROMETHEUS_USER=foo K6_PROMETHEUS_PASSWORD=bar \
    ./k6 run script.js -o output-prometheus-remote
```

</CodeGroup>

## Options

Here is the full list of options that can be configured and passed to the extension:

| Name                                     | Value                                                                                                       |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `K6_PROMETHEUS_REMOTE_URL`               | Address of the Prometheus Remote Write endpoint. The default value is `http://localhost:9090/api/v1/write`. |
| `K6_PROMETHEUS_USER`                     | User for the basic HTTP authentication at the Prometheus Remote Write endpoint. Optional. |
| `K6_PROMETHEUS_PASSWORD`                 | Password for the basic HTTP authentication at the Prometheus Remote Write endpoint. Optional. |
| `K6_PROMETHEUS_FLUSH_PERIOD`             | Interval of the metrics' aggregation and upload to the endpoint. The default value is `1s`. |
| `K6_PROMETHEUS_MAPPING`                  | Type of mapping that indicates how k6 metric types should be mapped to remote storage metric types. The default value is `prometheus`. Other supported values: `raw`. |
| `K6_PROMETHEUS_INSECURE_SKIP_TLS_VERIFY` | Boolean option whether to skip TLS verification on the endpoint. The default value is `true`. |
| `K6_CA_CERT_FILE`                        | Location of the CA certificate file required by the endpoint. Optional. |
| `K6_KEEP_TAGS`                           | Boolean option whether to send k6 tags as labels for each metric. The default value is `true`. |
| `K6_KEEP_NAME_TAG`                       | Boolean option whether to add `name` k6 tag to labels for each metric. Note: see [HTTP Requests Tags](/using-k6/http-requests#http-request-tags) for explanation on values of `name` tag when HTTP requests are made. The default value is `false`. |
