---
title: Real time
excerpt: Send your time-series k6 metrics to multiple file formats and services
---

Besides the [end-of-test summary](/results-output/end-of-test), you can also view metrics as granular data points.
k6 can stream the metrics in real time and either:
- Write output to a file
- Send output to an external service.


## Write to file {#write}

Currently, k6 supports writing to the following file formats:

<Glossary>

- [CSV](/results-output/real-time/csv)
- [JSON](/results-output/real-time/json)

</Glossary>


## Stream to service {#service}

You can also stream real-time metrics to the following services:

<Glossary>

- [Amazon CloudWatch](/results-output/real-time/amazon-cloudwatch)
- [Cloud](/results-output/real-time/cloud)
- [Datadog](/results-output/real-time/datadog)
- [Grafana Cloud / Prometheus](/results-output/real-time/grafana-cloud)
- [InfluxDB](/results-output/real-time/influxdb-+-grafana)
- [Netdata](/results-output/real-time/netdata)
- [New Relic](/results-output/real-time/new-relic)
- [Prometheus](/results-output/real-time/prometheus)
- [TimescaleDB](/results-output/real-time/timescaledb)
- [StatsD](/results-output/real-time/statsd)

</Glossary>

> This list applies to local tests. To send k6 Cloud test results to an external service, refer to
[Cloud APM](http://localhost:8000/cloud/integrations/cloud-apm/).


## Read more

- [k6 extensions](/extensions/get-started/explore) have many more supported file formats.
- [Ways to visualize k6 results](https://k6.io/blog/ways-to-visualize-k6-results/). Video demonstrations with a companion blog post.

