---
title: Real time
descriptiontion: Send your time-series k6 metrics to multiple file formats and services
weight: 200
---

# Real time

Besides the [end-of-test summary](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test), you can also view metrics as granular data points.
k6 can stream the metrics in real-time and either:

- Write output to a file
- Send output to an external service.

## Write to file {#write}

Currently, k6 supports writing to the following file formats:

- [CSV](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/csv)
- [JSON](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/json)

## Stream to service {#service}

You can also stream real-time metrics to:

- [Grafana Cloud k6](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/cloud)

As well as the following third-party services:

- [Amazon CloudWatch](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/amazon-cloudwatch)
- [Apache Kafka](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/apache-kafka)
- [Datadog](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/datadog)
- [Dynatrace](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/dynatrace)
- [Elasticsearch](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/elasticsearch)
- [Grafana Cloud Prometheus](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/grafana-cloud-prometheus)
- [InfluxDB](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/influxdb)
- [Netdata](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/netdata)
- [New Relic](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/new-relic)
- [Prometheus remote write](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/prometheus-remote-write)
- [TimescaleDB](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/timescaledb)
- [StatsD](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/statsd)
- [Other alternative with a custom output extension](https://grafana.com/docs/k6/<K6_VERSION>/extensions/create/output-extensions)

{{% admonition type="note" %}}

This list applies to local tests, not to [cloud tests](https://grafana.com/docs/grafana-cloud/k6/).

{{% /admonition %}}

## Read more

- [Ways to visualize k6 results](https://k6.io/blog/ways-to-visualize-k6-results/)
- [k6 data collection pipeline](https://grafana.com/blog/2023/08/10/understanding-grafana-k6-a-simple-guide-to-the-load-testing-tool/)
