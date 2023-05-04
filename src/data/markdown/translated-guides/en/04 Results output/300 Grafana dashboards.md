---
title: Grafana dashboards
excerpt: With multiple k6 output formats, you also have multiple ways to visualize test results in a Grafana dashboard.
---

You have multiple ways to query k6 results in Grafana.
Having test results in a dashboard brings multiple benefits:
- Visualize your results to analyze where performance degrades along the data points.
- Correlate results with system metrics, like dashboards that observe CPU utilization.

The following k6 outputs can serve as backends for Grafana dashboards.
The best choice depends on the specifics of your workflow.

- [**Grafana Cloud k6.**](https://grafana.com/docs/cloud-docs/k6) Grafana Cloud comes with an embedded k6, graphical test builder, and managed test storage. This commercial option has requires the least configuration and infrastructure.
- [**Prometheus Remote Write.**](/results-output/real-time/prometheus-remote-write) The remote-write output can be stored locally and queried by a local OSS Grafana instance.
- [**Grafana Cloud Prometheus.**](/results-output/real-time/grafana-cloud-prometheus/) Send local test results to a remote storage endpoint in Grafana.

Additionally, the following extension outputs include pre-built Grafana dashboards for their storage:

- [TimescaleDB](https://k6.io/docs/results-output/real-time/timescaledb/)
- [InfluxDB](https://github.com/grafana/xk6-output-influxdb)
- [AWSTimestream](https://github.com/leonyork/xk6-output-timestream)
- [Prometheus remote write](https://github.com/grafana/xk6-output-prometheus-remote)

For inspiration about how to build a dashboard from these outputs, browse the list of
[community-built k6 dashboards](https://grafana.com/grafana/dashboards/?search=k6).

