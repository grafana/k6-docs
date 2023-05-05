---
title: Grafana dashboards
excerpt: With multiple k6 output formats, you also have multiple ways to visualize test results in a Grafana dashboard.
---

You have multiple ways to query k6 results in Grafana. 
Having test results in a dashboard brings various benefits:
- Visualize your results to analyze performance during the test run or over multiple test runs. 
- Correlate test results with application and system metrics in the same dashboard to get a holistic overview of your system's performance and quickly find the root causes of performance issues. 

![A grafana dashboard correlating k6 results with observability data](./images/correlated-grafana-dashboard-grafana-cloud-k6.png)

## Options

With [Grafana](https://grafana.com/grafana/), you can create a custom dashboard to query and **visualize data from multiple sources and any type of backend**. With k6, you can stream your test results to any backend using a [custom output extension](/extensions/get-started/create/output-extensions/) or an existing [real-time output](/results-output/real-time/#service).

The flexibility and interoperability of Grafana and k6 allow you to dashboard your test data with observability data independently of where their data are stored.

For inspiration about how to build a custom dashboard that visualizes k6 results, browse the list of [community-built k6 dashboards](https://grafana.com/grafana/dashboards/?search=k6). The following outputs include pre-built Grafana dashboards for their storage:

- [AWSTimestream](https://github.com/leonyork/xk6-output-timestream)
- [InfluxDB](/results-output/real-time/influxdb-grafana)
- [Prometheus remote write](/results-output/real-time/prometheus-remote-write)
- [TimescaleDB](/results-output/real-time/timescaledb/)

For a managed solution, [Grafana Cloud k6](https://grafana.com/products/cloud/k6/) is our commercial offer bringing test storage, pre-built dashboards, enhanced collaboration features, and many more additional capabilities.