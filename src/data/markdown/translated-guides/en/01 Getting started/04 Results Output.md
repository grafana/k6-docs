---
title: 'Results output'
excerpt: 'For basic tests, the top-level summary that k6 provides might be enough. For detailed analysis, you can stream all data your test outputs to an external source.'
---

As k6 generates load for your test, it also takes measurements of the performance of the system.
You can use these measurements, called _metrics_, to interpret test results.

k6 generates many metrics about the load that your test generates and how the system under test (SUT) responds to this load.
Broadly, you can analyze metrics in two ways:
- As summary statistics, in an _end-of-test-summary_ report.
- As _time-series data_, in granular, point-by-point detail

![A diagram of the two broad ways to handle results: aggregated and granular](./images/k6-results-diagram.png)

You can customize almost every aspect of k6 result output:
- You can create your custom metrics
- You can configure new summary statistics and print them not only to `stdout` but also as HTML, JSON, or any text format.
- You can stream the results to one or multiple of the services of your choice.

## Built-in and custom metrics

**Documentation:** [Using metrics](/using-k6/metrics)

k6 comes with a built-in set of metrics about the load generated and the system response.
Key metrics include:
- `iterations`, the total number of iterations
- `http_req_failed`, the total number of failed requests
- `http_req_duration`, the end-to-end time of all requests (that is, the total latency)
   - `expected_response:true`, the end-to-end time of successful requests (failed requests often have faster responses)

## End-of-test-summary report

**Documentation**: [End-of-test-summary report](results-visualization/end-of-test-summary/)

By default, k6 prints summarized results to `stdout`.

When you run a test, k6 outputs a plain-text logo, your test progress, and some test details.
After the test finishes, k6 prints the full details and summary statistics of the test metrics.

![k6 results - console/stdout output](./images/k6-results-stdout.png)

The end-of-test-summary shows aggregated statistical values for your result metrics, including:
- Median and average values
- Minimum and maximum values
- p90, p95, and p99 values

If this default report is unsuitable, you can change the trend stats with
the [`--summary-trend-stats`](https://k6.io/docs/using-k6/k6-options/reference#summary-trend-stats) option.
You can also change the time unit with 
the [`--summary-time-unit`](/using-k6/k6-options/reference#summary-time-unit) option.

For example, this command displays only the median, p95, and p99.9 values,
and it presents the statistics in milliseconds instead of seconds.

```sh
k6 run --iterations=100 --vus=10 \
--summary-trend-stats="med,p(95),p(99.9)" --summary-time-unit="ms" script.js
```

<Blockquote mod="note" title="">

With a single iteration and VU, the min, max, median, average, and p values would all be the same.

</Blockquote>


### Custom reports with `handleSummary()`

At the end of the test, k6 automatically creates an object with all aggregated statistics.

To completely customize the end-of-test summary,
you can use the `handleSummary()` function to process this object into any text format. For example, the community project [k6 reporter](https://github.com/benc-uk/k6-reporter) uses `handleSummary()` to make an HTML report from your k6 summary metrics.


## Time series and external outputs

The condensed end-of-test summary provides a top-level view of the test.
For deeper analysis, you need to look at granular time-series data.

You can integrate and visualize k6 metrics on other platforms.
You can also write every metric to a file and analyze them in the program of your choice.

To send granular results data to an external output, use the `--out` flag.


```sh
$ k6 run --out statsd script.js
```


The available built-in outputs are:

<Glossary>

- [Amazon CloudWatch](/results-visualization/amazon-cloudwatch)
- [Cloud](/results-visualization/cloud)
- [CSV](/results-visualization/csv)
- [Datadog](/results-visualization/datadog)
- [Grafana Cloud / Prometheus](/results-visualization/grafana-cloud)
- [InfluxDB](/results-visualization/influxdb-+-grafana)
- [JSON](/results-visualization/json)
- [Netdata](/results-visualization/netdata)
- [New Relic](/results-visualization/new-relic)
- [Prometheus](/results-visualization/prometheus)
- [TimescaleDB](/results-visualization/timescaledb)
- [StatsD](/results-visualization/statsd)

</Glossary>

### Multiple outputs

You can also send metrics simultaneously to several outputs
by using multiple CLI `--out` flags:


```bash
$ k6 run \
--out json=test.json \
--out influxdb=http://localhost:8086/k6
```

