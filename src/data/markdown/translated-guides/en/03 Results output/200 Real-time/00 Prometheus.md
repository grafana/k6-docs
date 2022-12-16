---
title: 'Prometheus remote write'
slug: '/results-output/real-time/prometheus'
excerpt: 'Use the Prometheus remote write integration to send test results to any Prometheus remote write endpoint.'
---

<ExperimentalBlockquote />

Prometheus remote write is a protocol with a defined [specification](https://docs.google.com/document/d/1LPhVRSFkGNSuU1fBd81ulhsCPR4hkSZyyBj1SZ8fWOM/edit).
It has multiple implementations.
For example, you can store the metrics in [Prometheus](https://prometheus.io/docs/prometheus/latest/feature_flags/#remote-write-receiver).
For other implementations, check the Prometheus [Integrations](https://prometheus.io/docs/operating/integrations) guide.

With the Prometheus remote write output, k6 can send test-result metrics to a Prometheus remote write endpoint.
The output during the `k6 run` execution gets all the generated data points for the [built-in  k6 metrics](/using-k6/metrics/).
It then generates the equivalent Prometheus remote write time series.

## About metrics mapping

All k6 metric types are converted into an equivalent Prometheus remote write type:

| k6      | Prometheus                | Name label           |
|---------|---------------------------|----------------------|
| Counter | Counter                   | `k6_*_total`         |
| Gauge   | Gauge                     | `k6_*_<unit-suffix>` |
| Rate    | Gauge                     | `k6_*_rate`          |
| Trend   | Gauges / Native Histogram | `k6_*_<unit-suffix>` |

### Trend metric conversion

By default, k6 trend metrics convert to primitive counters and gauges.
To convert trend metrics to high-fidelity histograms, you can use Prometheus Native histogram instead.

Because k6 can't easily determine fixed buckets in advance, k6 metrics can't export to the original Prometheus histograms.
So, the output maps a trend metric into primitive counter and gauges.
Each value represents a math function (count, sum, min, max, avg, med, p(x)).
This mapping has following drawbacks:
- It is impossible to aggregate some gauge values (especially percentiles).
- It uses a memory-expensive k6 data structure.

To resolve these limitations, you can map a trend as a [Prometheus Native Histogram].(https://prometheus.io/docs/concepts/metric_types/#histogram).
To do this,
you can use the `K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM=true` environment variable
(or one of the other ways).
The output then converts all the trend types into a dedicated Native Histogram.

Mapping trends as native histograms gives you more efficient storage and preciser queries.
The drawback is that **the feature is experimental, released in Prometheus v2.40.0**.

<Blockquote mod="note" title="">

Native Histogram is an experimental feature, so it has to be enabled ([--enable-feature=native-histograms](https://prometheus.io/docs/prometheus/latest/feature_flags/#native-histograms)).
Other remote write implementations might not support it yet.

</Blockquote>

### Naming conventions

The output maps the metrics into time series with Name labels.
As much as possible, k6 respects the [naming best practices](https://prometheus.io/docs/practices/naming) that the Prometheus project defines:

* All time series are prefixed with the `k6_` namespace.
* All time series are suffixed with the base unit of the sample value (if k6 knows what the base unit is).
* Trends and rates have the relative suffixes, to make them more discoverable.

### Stale trend metrics

This k6 output can mark the time series at the end of the test as stale.
To enable the stale marker option, set the `K6_PROMETHEUS_RW_STALE_MARKERS` environment variable to `true`.

By default, the metrics are active for 5 minutes after the last flushed sample.
They are automatically marked as stale after.
For details about staleness, refer to the [Prometheus docs](https://prometheus.io/docs/prometheus/latest/querying/basics/#staleness).

## Send test metrics to a remote write endpoint

<Blockquote mod="note" title="Prometheus as remote write agent">

To use remote write in Prometheus 2.x, use the `--web.enable-remote-write-receiver ` flag.
The [xk6 extension](https://github.com/grafana/xk6-output-prometheus-remote) repository has some docker compose examples in the [example](https://github.com/grafana/xk6-output-prometheus-remote/tree/main/example) directory.
For remote write storage options, refer to the [Prometheus docs](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write).

</Blockquote>

To send k6 metrics to a remote write endpoint, follow these steps:
1. Set up a running remote write endpoint with an endpoint that k6 can reach.
1. Run your k6 script, using the `--out` flag with `experimental-prometheus-rw` as the argument:

  ```bash
  k6 run -o experimental-prometheus-rw script.js
  ```
 
All the time series have a `k6_` prefix.
In the Metric Explorer UI in Grafana, it looks something  like this:

![k6 metrics as seen in the Prometheus UI](images/Prometheus/prom-rw-metrics.png)

### Authenticate

If the remote write endpoint requires authentication, the output supports the HTTP Basic authentication and it can be used with the following command:

<CodeGroup labels={[""]}>

```bash
    K6_PROMETHEUS_RW_USERNAME=foo \
    K6_PROMETHEUS_RW_PASSWORD=bar \
    ./k6 run script.js -o experimental-prometheus-rw
```

</CodeGroup>

Feel free to request more authentication methods or provide your experience in the [issue tracker](https://github.com/grafana/xk6-output-prometheus-remote/issues).

## Options

k6 has special options for remote write output.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `K6_PROMETHEUS_RW_SERVER_URL` | `string` | `http://localhost:9090/api/v1/write` | URL of the Prometheus remote write implementation's endpoint. |
| `K6_PROMETHEUS_RW_HEADERS_<here-the-header-key>` | list of `string` | | Additional headers to include in the HTTP requests. `K6_PROMETHEUS_RW_HEADERS_X-MY-HEADER=foo`|
| `K6_PROMETHEUS_RW_USERNAME` | `string` | | User for the HTTP Basic authentication at the Prometheus remote write endpoint. |
| `K6_PROMETHEUS_RW_PASSWORD` | `string` | | Password for the HTTP Basic authentication at the Prometheus remote write endpoint. |
| `K6_PROMETHEUS_RW_PUSH_INTERVAL` | `string` | `5s` | Interval of the metrics' aggregation and upload to the endpoint. |
| `K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM` | `boolean` | false | If true, it maps the all defined trend metrics as [Native Histograms](#trend). |
| `K6_PROMETHEUS_RW_TREND_STATS` | list of `string` | `p(99)` | If Native Histogram is not enabled then it defines the stats functions to map for the all defined trend metrics. It's a comma-separated list of stats functions to include (e.g. `p(90),avg,sum`). Check the trend section to know the entire set of the supported stats. |
| `K6_PROMETHEUS_RW_INSECURE_SKIP_TLS_VERIFY` | `boolean` | false | If true, the HTTP client skips TLS verification on the endpoint. |
| `K6_PROMETHEUS_RW_STALE_MARKERS | `boolean` | false | If true, the output at the end of the test marks all the seen time series as stale. |

## Time series visualization 

To visualize time series, you can use the [Grafana Cloud](/results-output/real-time/grafana-cloud) integration.

If you want a local option instead, the [xk6 extension](https://github.com/grafana/xk6-output-prometheus-remote) repository includes a [docker-compose setup](https://github.com/grafana/xk6-output-prometheus-remote/#docker-compose) with two pre-built Grafana dashboards.
You can use these dashboards to visualize the generated time series with Prometheus configured as a data source: 
- visualize the results of a test run
- list test runs

![Prometheus k6 results](./images/Prometheus/prometheus-dashboard-test-result.png)
