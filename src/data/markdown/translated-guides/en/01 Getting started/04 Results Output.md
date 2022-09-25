---
title: 'Results output'
excerpt: 'For basic tests, the top-level summary that k6 provides might be enough. For detailed analysis, you can stream all data your test outputs to an external source.'
---

As k6 generates load for your test, it also takes measurements of the performance of the system.
These measurements, called _metrics_, provide data for test interpretation.

k6 generates many metrics about the load that your test generates and how the system under test (SUT) responds.
Broadly, you can analyze metrics in two ways:
- As summary statistics, in an _end-of-test-summary_ report.
- As _time-series data_, which you can write to a file, or stream to external services such as Prometheus or InfluxDB.

![A diagram of the two broad ways to handle results: aggregated and granular](./images/k6-results-diagram.png)

You can customize almost every aspect of result output:
- Create custom metrics
- Configure new summary statistics and print them not only to `stdout` but also as HTML, JSON, or any text format.
- Stream the results to one or multiple services of your choice.

## Metrics

**Documentation:** [Using metrics](/using-k6/metrics)

k6 comes with built-in metrics about the load generated and the system response.
Key metrics include:
- `data_sent`, the total amount of data sent
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

You can configure the statistics to report with the [`--summary-trend-stats`](https://k6.io/docs/using-k6/k6-options/reference#summary-trend-stats) option.
For example, this command displays only median, p95, and p99.9 values.

```sh
k6 run --iterations=100 --vus=10 \
--summary-trend-stats="med,p(95),p(99.9)" script.js
```

### Custom reports with `handleSummary()`


For completely customized end-of-summary reports, k6 provides the `handleSummary()` function.

At the end of the test, k6 automatically creates an object with all aggregated statistics.
The `handleSummary()` function can process this object into a custom report in any text format: JSON, HTML, XML, and whatever else.
For example, the community project [k6 reporter](https://github.com/benc-uk/k6-reporter) uses `handleSummary()` to make an HTML report from your k6 summary metrics.

## Time series and external outputs

The condensed end-of-test summary provides a top-level view of the test.
For deeper analysis, you need to look at granular time-series data,
which has metrics and timestamps for every point of the test.

You can access time-series metrics in two ways:
- Write them to a JSON or CSV file.
- Stream them to an external service.

In both cases, you can use the `--out` flag and declare your export format as the flag argument.
If you want to send the metrics to multiple sources, you can use multiple flags with multiple arguments:


```bash
$ k6 run \
--out json=test.json \
--out influxdb=http://localhost:8086/k6
```

The available built-in outputs include:

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





