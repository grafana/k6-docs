---
title: Grafana dashboards
description: With multiple k6 output formats, you also have multiple ways to visualize test results in a Grafana dashboard.
weight: 300
---

# Grafana dashboards

You have multiple ways to query k6 results in Grafana.
Having test results in a dashboard brings various benefits:

- Visualize your results to analyze performance during the test run or over multiple test runs.
- Correlate test results with application and system metrics in the same dashboard to get a holistic overview of your system's performance and quickly find the root causes of performance issues.

![A grafana dashboard correlating k6 results with observability data](/media/docs/k6-oss/correlated-grafana-dashboard-grafana-cloud-k6.png)

## Options

With [Grafana](https://grafana.com/grafana/), you can create a custom dashboard to query and **visualize data from multiple sources and any type of backend**.
Using k6, you can [stream your local test results to any backend](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time).

The flexibility and interoperability of Grafana and k6 let you visualize test and observability data in one dashboard, regardless of where the data is stored.
The following outputs include pre-built Grafana dashboards for their storage:

| Output                                                                                                                                   | Grafana Dashboard                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [AWSTimestream](https://github.com/leonyork/xk6-output-timestream)                                                                       | [leonyork/xk6-output-timestream](https://github.com/leonyork/xk6-output-timestream/tree/main/grafana/dashboards/)  |
| [InfluxDB](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/influxdb)                                                   | [grafana/xk6-output-influxdb](https://github.com/grafana/xk6-output-influxdb/tree/main/grafana/dashboards)         |
| [Prometheus remote write](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/prometheus-remote-write)                     | [k6 Prometheus](https://grafana.com/grafana/dashboards/19665-k6-prometheus/)                                       |
| [Prometheus remote write (Native Histograms)](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/prometheus-remote-write) | [k6 Prometheus (Native Histograms)](https://grafana.com/grafana/dashboards/18030-k6-prometheus-native-histograms/) |
| [Grafana Cloud Prometheus](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/grafana-cloud-prometheus)                   | [k6 Prometheus](https://grafana.com/grafana/dashboards/19665-k6-prometheus/)                                       |
| [TimescaleDB](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/timescaledb)                                             | [grafana/xk6-output-timescaledb](https://github.com/grafana/xk6-output-timescaledb/tree/main/grafana/dashboards)   |
| ----                                                                                                                                     | [More public dashboards from the community](https://grafana.com/grafana/dashboards/?search=k6)                     |

For a fully managed solution, [Grafana Cloud k6](https://grafana.com/products/cloud/k6/) is our commercial product to store, view, scale, and manage your tests with ease. It provides custom views to access your testing and analyze test results, enhanced collaboration features, and many more additional capabilities.
