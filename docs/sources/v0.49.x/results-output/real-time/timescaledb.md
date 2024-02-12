---
title: 'TimescaleDB'
description: k6 has an output extension to store k6 metrics in TimescaleDB. This document shows you how to configure the k6 TimescaleDB integration.
weight: 00
---

# TimescaleDB

Using the [TimescaleDB k6 extension](https://github.com/grafana/xk6-output-timescaledb), you can store k6 metrics in [TimescaleDB](https://www.timescale.com/) and analyze your performance results with SQL and dashboards. The extension repository includes two Grafana dashboards.

## Build the k6 version

To build a k6 binary with the extension, first, make sure you have [Go](https://golang.org/doc/install) and [Git](https://git-scm.com/) installed on your machine.

Then, open your terminal and run the following commands:

```bash
# Install xk6
go install go.k6.io/xk6/cmd/xk6@latest

# Build the k6 binary
xk6 build --with github.com/grafana/xk6-output-timescaledb

... [INFO] Build environment ready
... [INFO] Building k6
... [INFO] Build complete: ./k6
```

xk6 will create the new k6 binary in the local folder.

{{% admonition type="note" %}}

To learn more about how to build custom k6 versions, check out [xk6](https://github.com/grafana/xk6).

{{% /admonition %}}

## Run the test

Check that the TimescaleDB instance is running. Copy the Postgres connection string of the database, which will store the k6 metrics.

Use the previous k6 binary and run the test passing the Postgres connection string to the [output option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#results-output) as follows:

```bash
k6 run script.js -o timescaledb=postgresql://<postgresql_user_name>:<password>@<ip>:<port>/<database>
```

k6 runs the test script and sends the metrics in real-time to the TimescaleDB instance. You can now connect to TimescaleDB and query the [k6 metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics).

```bash
k6=# SELECT metric,AVG (value) FROM samples GROUP BY metric;
```

### Options

Here is the full list of options that can be configured and passed to the extension:

| Name                           | Value                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| `K6_TIMESCALEDB_PUSH_INTERVAL` | Define how often metrics are sent to TimescaleDB. The default value is 1s (1 second). |

## Grafana Dashboards

The extension repository includes a [docker-compose setup](https://github.com/grafana/xk6-output-timescaledb/#docker-compose) with two pre-built dashboards to:

- list test runs
- visualize the results of a test run

![TimescaleDB list test runs](/media/docs/k6-oss/timescaledb-dashboard-test-runs.png)

![TimescaleDB k6 results](/media/docs/k6-oss/timescaledb-dashboard-test-result.png)

## Read more

- [Store k6 metrics in TimescaleDB and visualize with Grafana](https://k6.io/blog/store-k6-metrics-in-timescaledb-and-visualize-with-grafana/)
