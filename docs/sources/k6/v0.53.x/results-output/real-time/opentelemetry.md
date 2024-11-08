---
title: 'OpenTelemetry'
description: 'Use the OpenTelemetry experimental output to send test results in OTEL metrics format.'
weight: 00
---

# OpenTelemetry

Grafana k6 can push test run metrics in the [OpenTelemetry (OTEL) metrics format](https://opentelemetry.io/docs/specs/otel/metrics/) to an OTEL metrics collector or a metrics backend that supports the OTEL metrics format by using the experimental OpenTelemetry output `--out experimental-opentelemetry`.

Note that the `experimental-opentelemetry` became a part of k6 only with k6 v0.53.0, so prior that version you should use the [xk6-output-opentelemetry extension](https://github.com/grafana/xk6-output-opentelemetry/).

For any feedback, bugs or suggestions feel free to [open an issue](https://github.com/grafana/xk6-output-opentelemetry/issues) directly in the output repository. Contributions are also welcome!

## Metrics mapping

k6 converts all [k6 metric types](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics) to an equivalent [OTEL metric type](https://opentelemetry.io/docs/specs/otel/metrics/data-model/#timeseries-model), and all k6 tags to OTEL attributes. When possible, the units are also passed with the metrics.

| k6 Metric | OpenTelemetry Metric                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Counter   | `Float64CounterOption`                                                                                                                                                                                                                                                                                                                                                                                                |
| Gauge     | `Float64ObservableGauge`                                                                                                                                                                                                                                                                                                                                                                                              |
| Rate      | Split into two `Int64Counter` counters named `metric_name.occurred` and `metric_name.total`. `metric_name.occurred` counts only the number of non-zero occurrences, and `metric_name.total` registers the total number of positive and negative occurrences. This might change in the future, refer to [xk6-output-opentelemetry#12](https://github.com/grafana/xk6-output-opentelemetry/issues/12) for more details. |
| Trend     | `Float64Histogram`                                                                                                                                                                                                                                                                                                                                                                                                    |

## Run the k6 test

You can use the `--out experimental-opentelemetry` option when running your tests to use this extension:

{{< code >}}

```bash
$  K6_OTEL_GRPC_EXPORTER_INSECURE=true K6_OTEL_METRIC_PREFIX=k6_ k6 run --tag test-id=123 -o experimental-opentelemetry examples/script.js
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
| `K6_OTEL_EXPORTER_TYPE`            | Configures the type of exporter to use. Valid options are `http` and `grpc`. Default is `grpc`.                                                                     |
| `K6_OTEL_GRPC_EXPORTER_INSECURE`   | Disables client transport security for the gRPC exporter.                                                                                                           |
| `K6_OTEL_GRPC_EXPORTER_ENDPOINT`   | Configures the gRPC exporter endpoint. Default is `localhost:4317`.                                                                                                 |
| `K6_OTEL_HTTP_EXPORTER_INSECURE`   | Disables client transport security for the HTTP exporter.                                                                                                           |
| `K6_OTEL_HTTP_EXPORTER_ENDPOINT`   | Configures the HTTP exporter endpoint. Default is `localhost:4318`.                                                                                                 |
| `K6_OTEL_HTTP_EXPORTER_URL_PATH`   | Configures the HTTP exporter path. Default is `/v1/metrics`.                                                                                                        |

You can also use the OpenTelemetry SDK configuration environment variables to configure the OpenTelemetry output, like the [gRPC exporter configuration](https://pkg.go.dev/go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetricgrpc@v1.26.0). The `K6_OTEL_*` environment variables take precedence over the OpenTelemetry SDK configuration environment variables.
