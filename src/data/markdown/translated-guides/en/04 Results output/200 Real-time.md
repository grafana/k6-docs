---
title: Real time
excerpt: Send your time-series k6 metrics to multiple file formats and services
canonicalUrl: https://grafana.com/docs/k6/latest/results-output/real-time/
redirect: https://grafana.com/docs/k6/latest/results-output/real-time/
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
- [Apache Kafka](/results-output/real-time/apache-kafka)
- [Cloud](/results-output/real-time/cloud)
- [Datadog](/results-output/real-time/datadog)
- [Dynatrace](/results-output/real-time/dynatrace)
- [Elasticsearch](/results-output/real-time/elasticsearch)
- [Grafana Cloud Prometheus](/results-output/real-time/grafana-cloud-prometheus)
- [InfluxDB](/results-output/real-time/influxdb)
- [Netdata](/results-output/real-time/netdata)
- [New Relic](/results-output/real-time/new-relic)
- [Prometheus remote write](/results-output/real-time/prometheus-remote-write)
- [TimescaleDB](/results-output/real-time/timescaledb)
- [StatsD](/results-output/real-time/statsd)
- [Other alternative with a custom output extension](/extensions/get-started/create/output-extensions/)

</Glossary>

> This list applies to local tests, not to [cloud tests](https://grafana.com/docs/grafana-cloud/k6/). 


## Read more

- [Ways to visualize k6 results](https://k6.io/blog/ways-to-visualize-k6-results/)

