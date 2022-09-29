---
title: Real-time metrics
excerpt: Send your time-series k6 metrics to multiple file formats and services
---

Everything about a load test is dynamic: even under constant load, system responses vary from second to second.
To really analyze performance and find bottlenecks, you need to be able to look at how metrics change across time.

k6 emits metrics with time stamps at every point of the test.
You can investigate this data in many formats by exporting it to a file at the end of a test or streaming the data as the test runs.

## Supported file formats

k6 has built-in support to write metrics in the following file formats:

<Glossary>

- [CSV](/results-output/real-time-metrics/csv/)
- [JSON](/results-output/real-time-metrics/json/)

</Glossary>

## External services

Besides JSON and CSV, you can also stream k6 metrics to external services:

<Glossary>

- [Amazon CloudWatch](/results-output/real-time-metrics/amazon-cloudwatch)
- [Cloud](/results-output/real-time-metrics/cloud)
- [CSV](/results-output/real-time-metrics/csv)
- [Datadog](/results-output/real-time-metrics/datadog)
- [Grafana Cloud / Prometheus](/results-output/real-time-metrics/grafana-cloud)
- [InfluxDB](/results-output/real-time-metrics/influxdb-+-grafana)
- [JSON](/results-output/real-time-metrics/json)
- [Netdata](/results-output/real-time-metrics/netdata)
- [New Relic](/results-output/real-time-metrics/new-relic)
- [Prometheus](/results-output/real-time-metrics/prometheus)
- [TimescaleDB](/results-output/real-time-metrics/timescaledb)
- [StatsD](/results-output/real-time-metrics/statsd)

</Glossary>

<Blockquote mod="note" title="This list applies to tests on your machine">

To send k6 Cloud test results to an external service, refer to
[Cloud APM](http://localhost:8000/cloud/integrations/cloud-apm/).

</Blockquote>

## Read more

- [k6 extensions](/extensions) have many more supported file formats.
- [Ways to visualize k6 results](https://k6.io/blog/ways-to-visualize-k6-results/). Video demonstrations with a companion blog post.

