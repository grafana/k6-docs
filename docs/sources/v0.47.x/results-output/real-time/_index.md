---
title: Real time
excerpt: Send your time-series k6 metrics to multiple file formats and services
weight: 200
weight: 200
---

# Real time

Besides the [end-of-test summary](/docs/k6/<K6_VERSION>/results-output/end-of-test), you can also view metrics as granular data points.
k6 can stream the metrics in real time and either:

- Write output to a file
- Send output to an external service.

## Write to file {#write}

Currently, k6 supports writing to the following file formats:

<Glossary>

- [CSV](/docs/k6/<K6_VERSION>/results-output/real-time/csv)
- [JSON](/docs/k6/<K6_VERSION>/results-output/real-time/json)

</Glossary>

## Stream to service {#service}

You can also stream real-time metrics to the following services:

<Glossary>

- [Amazon CloudWatch](/docs/k6/<K6_VERSION>/results-output/real-time/amazon-cloudwatch)
- [Apache Kafka](/docs/k6/<K6_VERSION>/results-output/real-time/apache-kafka)
- [Cloud](/docs/k6/<K6_VERSION>/results-output/real-time/cloud)
- [Datadog](/docs/k6/<K6_VERSION>/results-output/real-time/datadog)
- [Dynatrace](/docs/k6/<K6_VERSION>/results-output/real-time/dynatrace)
- [Elasticsearch](/docs/k6/<K6_VERSION>/results-output/real-time/elasticsearch)
- [Grafana Cloud Prometheus](/docs/k6/<K6_VERSION>/results-output/real-time/grafana-cloud-prometheus)
- [InfluxDB](/docs/k6/<K6_VERSION>/results-output/real-time/influxdb)
- [Netdata](/docs/k6/<K6_VERSION>/results-output/real-time/netdata)
- [New Relic](/docs/k6/<K6_VERSION>/results-output/real-time/newrelic)
- [Prometheus remote write](/docs/k6/<K6_VERSION>/results-output/real-time/prometheus-remote-write)
- [TimescaleDB](/docs/k6/<K6_VERSION>/results-output/real-time/timescaledb)
- [StatsD](/docs/k6/<K6_VERSION>/results-output/real-time/statsd)
- [Other alternative with a custom output extension](/docs/k6/<K6_VERSION>/extensions/create/output-extensions)

</Glossary>

> This list applies to local tests, not to [cloud tests](https://grafana.com/docs/grafana-cloud/k6/).

## Read more

- [Ways to visualize k6 results](https://k6.io/blog/ways-to-visualize-k6-results/)
