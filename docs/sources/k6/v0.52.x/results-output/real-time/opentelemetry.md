---
title: 'OpenTelemetry'
description: 'Use the OpenTelemetry output extension to send test results in OTEL metrics format.'
weight: 00
---

# OpenTelemetry

Grafana k6 can push test run metrics in the [OpenTelemetry (OTEL) metrics format](https://opentelemetry.io/docs/specs/otel/metrics/) to an OTEL metrics collector or a metrics backend that supports the OTEL metrics format by using the [xk6-output-opentelemetry extension](https://github.com/grafana/xk6-output-opentelemetry/).

{{< admonition type="note" >}}

This is an extension, and we're looking for feedback and contributions and aiming to graduate it as an experimental output within Grafana k6 in a future release. Feel free to [open an issue](https://github.com/grafana/xk6-output-opentelemetry/issues) if you have any feedback or suggestions.

{{< /admonition >}}

## Metrics mapping

k6 converts all [k6 metric types](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics) to an equivalent [OTEL metric type](https://opentelemetry.io/docs/specs/otel/metrics/data-model/#timeseries-model), and all k6 tags to OTEL attributes. When possible, the units are also passed with the metrics.

| k6 Metric | OpenTelemetry Metric                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Counter   | `Float64CounterOption`                                                                                                                                                                                                                                                                                                                                                                                                |
| Gauge     | `Float64ObservableGauge`                                                                                                                                                                                                                                                                                                                                                                                              |
| Rate      | Split into two `Int64Counter` counters named `metric_name.occurred` and `metric_name.total`. `metric_name.occurred` counts only the number of non-zero occurrences, and `metric_name.total` registers the total number of positive and negative occurrences. This might change in the future, refer to [xk6-output-opentelemetry#12](https://github.com/grafana/xk6-output-opentelemetry/issues/12) for more details. |
| Trend     | `Float64Histogram`                                                                                                                                                                                                                                                                                                                                                                                                    |

## Build the k6 version

To build a k6 binary with the extension, first, make sure you have [Go](https://golang.org/doc/install) and [Git](https://git-scm.com/) installed on your machine.

Then, open your terminal and run the following commands:

```bash
# Install xk6
go install go.k6.io/xk6/cmd/xk6@latest

# Build the k6 binary
xk6 build --with github.com/grafana/xk6-output-opentelemetry

... [INFO] Build environment ready
... [INFO] Building k6
... [INFO] Build complete: ./k6
```

xk6 will create the new k6 binary in the local folder.

{{< admonition type="note" >}}

To learn more about how to build custom k6 versions, refer to [xk6](https://github.com/grafana/xk6).

{{< /admonition >}}

## Run the k6 test

Using the k6 binary you built in the previous step, you can use the `--out xk6-opentelemetry` option when running your tests to use this extension:

{{< code >}}

```bash
$ ./k6 run --out xk6-opentelemetry script.js
```

{{< /code >}}

## Configuration

The following options can be configured:

| Name                               | Value                                                                                                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `K6_OTEL_METRIC_PREFIX`            | Metric prefix. Default is empty.                                                                                                                                    |
| `K6_OTEL_FLUSH_INTERVAL`           | How frequently to flush metrics from k6 metrics engine. Default is `1s`.                                                                                            |
| `K6_OTEL_EXPORT_INTERVAL`          | Configures the intervening time between metrics exports. Default is `10s`.                                                                                          |
| `K6_OTEL_HEADERS`                  | Configures headers in the W3C Correlation-Context format without additional semi-colon delimited metadata (i.e. "k1=v1,k2=v2"). Passes the headers to the exporter. |
| `K6_OTEL_TLS_INSECURE_SKIP_VERIFY` | Disables server certificate verification.                                                                                                                           |
| `K6_OTEL_TLS_CERTIFICATE`          | Configures the path to the root CA certificate file for TLS credentials. If it is not provided but TLS is enabled then the host's root CAs set is used.             |
| `K6_OTEL_TLS_CLIENT_CERTIFICATE`   | Configures the path to the client certificate file.                                                                                                                 |
| `K6_OTEL_TLS_CLIENT_KEY`           | Configures the path to the client key file.                                                                                                                         |
| `K6_OTEL_GRPC_EXPORTER_INSECURE`   | Disables client transport security for the gRPC exporter.                                                                                                           |
| `K6_OTEL_GRPC_EXPORTER_ENDPOINT`   | Configures the gRPC exporter endpoint. Default is `localhost:4317`.                                                                                                 |
| `K6_OTEL_HTTP_EXPORTER_INSECURE`   | Disables client transport security for the HTTP exporter.                                                                                                           |
| `K6_OTEL_HTTP_EXPORTER_ENDPOINT`   | Configures the HTTP exporter endpoint. Default is `localhost:4318`.                                                                                                 |
| `K6_OTEL_HTTP_EXPORTER_URL_PATH`   | Configures the HTTP exporter path. Default is `/v1/metrics`.                                                                                                        |

You can also use the OpenTelemetry SDK configuration environment variables to configure the OpenTelemetry output, like the [gRPC exporter configuration](https://pkg.go.dev/go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetricgrpc@v1.26.0). The `K6_OTEL_*` environment variables take precedence over the OpenTelemetry SDK configuration environment variables.
