---
title: 'Results output'
excerpt: 'For basic tests, the top-level summary that k6 provides might be enough. For detailed analysis, you can stream all data your test outputs to an external source.'
---

Modeling and generating load is just half the story:
a useful load test also needs to generate useful results that you can interpret and act upon.
A k6 test generates a rich amount of metrics, which you can analyze as summary statistics, or in granular, point-by-point detail:

![A diagram of the two broad ways to handle results: aggregated and granular](./images/k6-results-diagram.png)

k6 results output centers around the concepts of _metrics_, _end-of-test-summary reports_, and _time-series data_.

<DescriptionList>

Metrics
: Measurements that k6 generates throughout the test.
: For example, you can use the `http_req_duration` metric to measure end-to-end latency.

End-of-test-summary report
: The default report that k6 prints to `stdout` at the end of test, with aggregated statistics for each metric.
: For example, the statistics show the value for the 95th percentile of all `http_req_duration` values.

Time-series data
: The granular metrics generated throughout the test (often for each request).
: You can stream these metrics to an external service, or write them to a file. or both.
: For example, in your fine-grained analysis, you could look at the `http_req_duration` for any request in the entire test in your Grafana workspace or JSON file.
  
</DescriptionList>
  
Everything is customizable: you can create your own metrics; you can create your own summary statistics, and you can stream the results to one or multiple of the services of your choice. 

## Built-in and custom metrics

k6 comes with a built-in set of metrics about the load-generated and about the HTTP request times.
You can also derive a custom metric from any trend, counter, gauge, or rate metric that k6 generates.

[Using metrics](/using-k6/metrics/)

## End-of-test summary report

![k6 results - console/stdout output](./images/k6-results-stdout.

When k6 sends the results to [`stdout`](https://en.wikipedia.org/wiki/Standard_streams#Standard_output_(stdout)), it shows the k6 logo and the following test information:

- Test details: general test information and load options.
- Progress bar: test status and how much time has passed.
- [Test summary](/results-visualization/end-of-test-summary): the test results (after test completion).

### The summary report is customizable

If the default report is not what you need, you have many ways to customize it:
- To change the values (e.g p99 instead of p99.5), use the --end-of-test-summary
- To change the units,
- To customize everything, build your own report with handleSummary()


## External outputs

If you need more data than what is condensed in the [end-of-test summary](/results-visualization/end-of-test-summary), you can integrate and visualize k6 metrics on other platforms.

To send granular results data to an external output, use the `--out` flag.

<CodeGroup labels={[]}>

```bash
$ k6 run --out statsd script.js
```

</CodeGroup>

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

You can also send metrics simultaneously to several outputs.
To do so, use the CLI `--out` flag multiple times.

<CodeGroup labels={[]}>

```bash
$ k6 run \
--out json=test.json \
--out influxdb=http://localhost:8086/k6
```
</CodeGroup>

