---
title: 'Prometheus remote write'
description: 'Use the Prometheus remote write output to send test results to any Prometheus remote write endpoint.'
weight: 00
---

# Prometheus remote write

{{< docs/shared source="k6" lookup="experimental-module.md" version="<K6_VERSION>" >}}

[Prometheus remote write](https://prometheus.io/docs/concepts/remote_write_spec/) is a protocol that makes it possible to reliably propagate data in real-time from a sender to a receiver.
It has multiple compatible [implementations](https://prometheus.io/docs/concepts/remote_write_spec/#compatible-senders-and-receivers) and [storage integrations](https://prometheus.io/docs/prometheus/latest/storage/#remote-storage-integrations).

For instance, when using the `experimental-prometheus-rw` output, k6 can send test-result metrics to the remote-write endpoint and store them in Prometheus.

The output, during the `k6 run` execution, gets all the generated time-series data points for the [k6 metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics).
It then generates the equivalent Prometheus time series and sends them to the Prometheus remote write endpoint.

## Metrics mapping

All [k6 metric types](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics) are converted into an equivalent [Prometheus metric type](https://prometheus.io/docs/concepts/metric_types/).
The output maps the metrics into time series with Name labels.
As much as possible, k6 respects the [naming best practices](https://prometheus.io/docs/practices/naming) that the Prometheus project defines:

- All time series are prefixed with the `k6_` namespace.
- All time series are suffixed with the base unit of the sample value (if k6 knows what the base unit is).
- Trends and rates have the relative suffixes, to make them more discoverable.

| k6      | Prometheus                                                                                                  | Name label           |
| ------- | ----------------------------------------------------------------------------------------------------------- | -------------------- |
| Counter | Counter                                                                                                     | `k6_*_total`         |
| Gauge   | Gauge                                                                                                       | `k6_*_<unit-suffix>` |
| Rate    | Gauge                                                                                                       | `k6_*_rate`          |
| Trend   | [Counter and Gauges (default)](#1-counter-and-gauges) or [Native Histogram](#2-prometheus-native-histogram) | `k6_*_<unit-suffix>` |

## Trend metric conversions

This output provides two distinct mechanisms to send [k6 Trend metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics) to Prometheus:

1. [Counter and Gauge metrics](#1-counter-and-gauges) (default)
1. [Prometheus Native histogram](#2-prometheus-native-histogram)

Both options provide efficient storage of test results while providing high-precision queries.

Note that k6 aggregates trend metric data before sending it to Prometheus in both options. The reasons for aggregating data are:

- Prometheus stores data in a millisecond precision (`ms`), but k6 metrics collect data points with higher accuracy, nanosecond (`ns`).
- A load test could generate vast amounts of data points. High-precision raw data could quickly become expensive and complex to scale and is unnecessary when analyzing performance trends.

### 1. Counter and gauges

By default, Prometheus supports [Counter and Gauge Metric types](https://prometheus.io/docs/concepts/metric_types/). Therefore, this option is the default of this output and converts all the k6 `Trend` metrics to Counter and Gauges Prometheus metrics.

You can configure how to convert all the k6 trend metrics with the [`K6_PROMETHEUS_RW_TREND_STATS` option](#options) that accepts a comma-separated list of stats functions: `count`, `sum`, `min`, `max`, `avg`, `med`, `p(x)`. The default is `p(99)`.

Given the list of stats functions, k6 converts all trend metrics to the respective math functions as Prometheus metrics.

For example, `K6_PROMETHEUS_RW_TREND_STATS=p(90),p(95),max` transforms each trend metric into three Prometheus metrics as follows:

- `k6_*_p90`
- `k6_*_p95`
- `k6_*_max`

This option provides a configurable solution to represent `Trend` metrics in Prometheus but has the following drawbacks:

- Convert a k6 `Trend` metric to several Prometheus metrics.
- It is impossible to aggregate some gauge values (especially percentiles).
- It uses a memory-expensive k6 data structure.

### 2. Prometheus native histogram

To address the limitations of the previous option, you can convert k6 trend metrics to high-fidelity histograms enabling [Prometheus native histograms](https://prometheus.io/docs/concepts/metric_types/#histogram).

With this option, each k6 trend metric maps to its corresponding Prometheus histogram metric: `k6_*`. You can then query them using Prometheus histogram functions, such as [histogram_quantile()](https://prometheus.io/docs/prometheus/latest/querying/functions/#histogram_quantile).

{{% admonition type="note" %}}

🌟 To learn the benefits and outcomes of using Histograms, watch [High-resolution Histograms in Prometheus](https://www.youtube.com/watch?v=F72Tk8iaWeA).

⚠️ Note that Native Histogram is an experimental feature released in Prometheus v2.40.0, and other remote write implementations might not support it yet. In the future, when Prometheus makes this feature stable, k6 will consider using it as the default conversion method for Trend metrics.

{{% /admonition %}}

## Send test metrics to a remote write endpoint

To use remote write in Prometheus 2.x, enable the feature flag [--web.enable-remote-write-receiver](https://prometheus.io/docs/prometheus/latest/feature_flags/#remote-write-receiver). For remote write storage options, refer to the [Prometheus docs](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write).

1. To send k6 metrics to a **remote write endpoint without native histograms**:

   - Set up a running remote write endpoint and ensure k6 can reach it.

   - Run your k6 script with the `--out` flag and the URL of the RW endpoint as follows:

   **Trend stats**

   ```bash
   K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/api/v1/write \
   k6 run -o experimental-prometheus-rw script.js
   ```

   **HTTP Basic Authentication**

   ```bash
   K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/api/v1/write \
   K6_PROMETHEUS_RW_USERNAME=USERNAME \
   K6_PROMETHEUS_RW_PASSWORD=PASSWORD \
   k6 run -o experimental-prometheus-rw script.js
   ```

   - Optionally, pass the `K6_PROMETHEUS_RW_TREND_STATS` to gain the ability to query additional stats for trend metrics. The default is `p(99)`.

   {{< code >}}

   ```bash
   K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/api/v1/write \
   K6_PROMETHEUS_RW_TREND_STATS=p(95),p(99),min,max \
   k6 run -o experimental-prometheus-rw script.js
   ```

   {{< /code >}}

1. To send k6 metrics to a **remote write endpoint with native histograms**:

   - Enable the feature flag [--enable-feature=native-histograms](https://prometheus.io/docs/prometheus/latest/feature_flags/#native-histograms) in Prometheus 2.40.0 or higher. Set up a running remote write endpoint and ensure k6 can reach it.

   - Run your k6 script with the `--out` flag, enabling the `K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM` option, and the URL of the RW endpoint as follows:

   **Native Histogram**

   ```bash
   K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/api/v1/write \
   K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM=true \
   k6 run -o experimental-prometheus-rw script.js
   ```

   **HTTP Basic Authentication**

   ```bash
   K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/api/v1/write \
   K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM=true \
   K6_PROMETHEUS_RW_USERNAME=USERNAME \
   K6_PROMETHEUS_RW_PASSWORD=PASSWORD \
   k6 run -o experimental-prometheus-rw script.js
   ```

When running the previous `k6 run` commands, k6 starts sending time-series metrics to Prometheus.
All the time series have a [`k6_` prefix](#metrics-mapping).
In the Prometheus Web UI, they appear like this:

![k6 metrics as seen in the Prometheus UI](/media/docs/k6-oss/query-k6-metrics-in-the-prometheus-web-ui.png)

## Options

k6 has special options for remote write output.

| Name                                         | Type                                 | Description                                                                                                                                                                                                                                                                            |
| -------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `K6_PROMETHEUS_RW_SERVER_URL`                | `string`                             | URL of the Prometheus remote write implementation's endpoint. Default is `http://localhost:9090/api/v1/write`                                                                                                                                                                          |
| `K6_PROMETHEUS_RW_HEADERS_<header-key>`      | `string`                             | Additional header to include in the HTTP requests. It can be set using the described format, for example `K6_PROMETHEUS_RW_HEADERS_CUSTOM-HEADER-KEY=custom-header-value`.                                                                                                             |
| `K6_PROMETHEUS_RW_HTTP_HEADERS`              | A comma-separated list of key-values | Additional headers to include in the HTTP requests. `K6_PROMETHEUS_RW_HTTP_HEADERS=key1:value1,key2:value2`.                                                                                                                                                                           |
| `K6_PROMETHEUS_RW_PUSH_INTERVAL`             | `string`                             | Interval between the metrics' aggregation and upload to the endpoint. Default is `5s`.                                                                                                                                                                                                 |
| `K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM` | `boolean`                            | If true, maps all the defined trend metrics as [Native Histograms](#2-prometheus-native-histogram). Default is `false`.                                                                                                                                                                |
| `K6_PROMETHEUS_RW_TREND_STATS`               | list of `string`                     | If Native Histogram is not enabled, then it defines the stats functions to map for all of the defined trend metrics. It's a comma-separated list of stats functions to include (e.g. `p(90),avg,sum`). Check the trend section to see the list of supported stats. Default is `p(99)`. |
| `K6_PROMETHEUS_RW_INSECURE_SKIP_TLS_VERIFY`  | `boolean`                            | If true, the HTTP client skips TLS verification on the endpoint. Default is `false`.                                                                                                                                                                                                   |
| `K6_PROMETHEUS_RW_STALE_MARKERS`             | `boolean`                            | If true, the output at the end of the test marks all the seen time series as stale. Default is `false`.                                                                                                                                                                                |
| `K6_PROMETHEUS_RW_USERNAME`                  | `string`                             | Username for the HTTP Basic authentication at the Prometheus remote write endpoint.                                                                                                                                                                                                    |
| `K6_PROMETHEUS_RW_PASSWORD`                  | `string`                             | Password for the HTTP Basic authentication at the Prometheus remote write endpoint.                                                                                                                                                                                                    |
| `K6_PROMETHEUS_RW_CLIENT_CERTIFICATE`        | `string`                             | A path to the PEM (Privacy-Enhanced Mail) formatted client certificate.                                                                                                                                                                                                                |
| `K6_PROMETHEUS_RW_CLIENT_CERTIFICATE_KEY`    | `string`                             | A path to the PEM formatted client private key.                                                                                                                                                                                                                                        |
| `K6_PROMETHEUS_RW_BEARER_TOKEN`              | `string`                             | Sets the Authorization Bearer Token Header.                                                                                                                                                                                                                                            |

### Stale trend metrics

This k6 output can mark the time series at the end of the test as stale.
To enable the stale marker option, set the `K6_PROMETHEUS_RW_STALE_MARKERS` environment variable to `true`.

By default, the metrics are active for 5 minutes after the last flushed sample.
They are automatically marked as stale after.
For details about staleness, refer to the [Prometheus docs](https://prometheus.io/docs/prometheus/latest/querying/basics/#staleness).

## Time series visualization

To visualize time series with Grafana, you can use the [Explore UI](https://grafana.com/docs/grafana/latest/explore/) or import any of the existing pre-built dashboards:

- [k6 Prometheus dashboard by Grafana k6](https://grafana.com/grafana/dashboards/19665-k6-prometheus/)
- [k6 Prometheus (Native Histograms) dashboard by Grafana k6](https://grafana.com/grafana/dashboards/18030-k6-prometheus-native-histograms/)
- [Other public dashboards available from the community](https://grafana.com/grafana/dashboards/?search=k6&dataSource=prometheus)

If you are a Grafana Cloud user, please refer to the [Grafana Cloud Prometheus docs](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/grafana-cloud-prometheus).

For a local environment, the [`xk6-output-prometheus-remote` repository](https://github.com/grafana/xk6-output-prometheus-remote) includes a docker-compose setup that provisions the `k6 Prometheus` and `k6 Prometheus (Native Histograms)` dashboards:

![Provisioned k6 Prometheus Dashboards](/media/docs/k6-oss/list-provisioned-prometheus-dashboards.png)

### Docker compose example

Clone the repository to get started and follow these steps for using the [docker-compose.yml](https://github.com/grafana/xk6-output-prometheus-remote/blob/main/docker-compose.yml) file that starts _Prometheus_ and _Grafana_:

1. Start the docker compose environment.

   {{< code >}}

   ```shell
   docker compose up -d prometheus grafana
   ```

   {{< /code >}}

   {{< code >}}

   ```shell
   # Output
   Creating xk6-output-prometheus-remote_grafana_1     ... done
   Creating xk6-output-prometheus-remote_prometheus_1  ... done
   ```

   {{< /code >}}

   Prometheus is started with Native Histogram enabled. You can use the same Prometheus instance to receive k6 trend metrics as native histograms or multiple metric stats.

1. Run the k6 test with one of the options detailed on [Send test metrics to a remote write endpoint](#send-test-metrics-to-a-remote-write-endpoint).

   **Trend stats**

   ```bash
   K6_PROMETHEUS_RW_TREND_STATS=p(95),p(99),min,max \
   k6 run -o experimental-prometheus-rw script.js
   ```

   **Native Histograms**

   ```bash
   K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM=true \
   k6 run -o experimental-prometheus-rw script.js
   ```

   Optionally, you can set the `testid` tag as a [wide test tag](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups/#test-wide-tags) to segment metrics into discrete test runs and filter specific test results on the pre-built Grafana dashboards or in PromQL queries. `testid` can be any unique string that let you clearly identify the test run.

   **Trend stats**

   ```bash
   K6_PROMETHEUS_RW_TREND_STATS=p(95),p(99),min,max \
   k6 run -o experimental-prometheus-rw --tag testid=<SET-HERE-A-UNIQUE-ID> script.js
   ```

   **Native Histograms**

   ```bash
   K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM=true \
   k6 run -o experimental-prometheus-rw --tag testid=<SET-HERE-A-UNIQUE-ID> script.js
   ```

1. After running the test, visit [http://localhost:3000](http://localhost:3000). If you enabled native histograms, select the **k6 Prometheus (Native Histograms)** dashboard; otherwise, select the **k6 Prometheus** Dashboard.

   ![k6 Prometheus Dashboard](/media/docs/k6-oss/k6-prometheus-dashboard.png)
