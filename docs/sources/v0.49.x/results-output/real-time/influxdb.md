---
title: 'InfluxDB'
description: 'k6 has an output extension to store k6 metrics in InfluxDB v2. This document shows you how to configure this integration.'
weight: 00
---

# InfluxDB

Using the [InfluxDB extension](https://github.com/grafana/xk6-output-influxdb), you can store k6 metrics in [InfluxDB v2.0](https://docs.influxdata.com/influxdb/v2.0/) and analyze your performance results with Grafana or [other tools](https://docs.influxdata.com/influxdb/cloud-serverless/query-data/tools/).

## Build the k6 version

To build a k6 binary with the extension, first, make sure you have [Go](https://golang.org/doc/install) and [Git](https://git-scm.com/) installed on your machine.

Then, open your terminal and run the following commands:

```bash
# Install xk6
go install go.k6.io/xk6/cmd/xk6@latest

# Build the k6 binary
xk6 build --with github.com/grafana/xk6-output-influxdb

... [INFO] Build environment ready
... [INFO] Building k6
... [INFO] Build complete: ./k6
```

xk6 will create the new k6 binary in the local folder.

{{% admonition type="note" %}}

To learn more about how to build custom k6 versions, check out [xk6](https://github.com/grafana/xk6).

{{% /admonition %}}

## Run the test

Check that the InfluxDB instance to store the k6 metrics is running.

Use the previous k6 binary and run the test passing the following [options](#options):

```bash
K6_INFLUXDB_ORGANIZATION="<INFLUXDB-ORGANIZATION-NAME>" \
K6_INFLUXDB_BUCKET="<INFLUXDB-BUCKET-NAME>" \
K6_INFLUXDB_TOKEN="<INFLUXDB-TOKEN>" \
K6_INFLUXDB_ADDR="<INFLUXDB-HTTP-ADDRESS>" \
./k6 run script.js -o xk6-influxdb
```

k6 runs the test script and sends the [k6 metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics) in real-time to the InfluxDB instance. You can now select the bucket to [query](https://docs.influxdata.com/influxdb/v2.7/query-data/) and [visualize](https://docs.influxdata.com/influxdb/v2.7/visualize-data/) the stored k6 metrics, for example, using the [InfluxDB Data Explorer](https://docs.influxdata.com/influxdb/v2.7/query-data/execute-queries/data-explorer/).

<br/>

![InfluxDB Data Explorer / k6 bucket](/media/docs/k6-oss/influxdb-data-explorer-k6-bucket.png)

## Options

Here is the full list of options that can be configured and passed to the extension:

| ENV                           | Default               | Description                                                                                                                                                                                                                                                                                                         |
| ----------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| K6_INFLUXDB_ORGANIZATION      |                       | Your InfluxDB organization name. [View organizations](https://docs.influxdata.com/influxdb/v2.7/organizations/).                                                                                                                                                                                                    |
| K6_INFLUXDB_BUCKET            |                       | The bucket name to store k6 metrics data. [Manage buckets](https://docs.influxdata.com/influxdb/v2.7/organizations/buckets/).                                                                                                                                                                                       |
| K6_INFLUXDB_TOKEN             |                       | An API token that provides authorized access to store data. [Manage API tokens](https://docs.influxdata.com/influxdb/v2.7/security/tokens/).                                                                                                                                                                        |
| K6_INFLUXDB_ADDR              | http://localhost:8086 | The address of the InfluxDB instance.                                                                                                                                                                                                                                                                               |
| K6_INFLUXDB_PUSH_INTERVAL     | 1s                    | The flush's frequency of the `k6` metrics.                                                                                                                                                                                                                                                                          |
| K6_INFLUXDB_CONCURRENT_WRITES | 4                     | Number of concurrent requests for flushing data. It is useful when a request takes more than the expected time (more than flush interval).                                                                                                                                                                          |
| K6_INFLUXDB_TAGS_AS_FIELDS    | vu:int,iter:int,url   | A comma-separated string to set `k6` metrics as non-indexable fields (instead of tags). An optional type can be specified using :type as in vu:int will make the field integer. The possible field types are int, bool, float and string, which is the default. Example: vu:int,iter:int,url:string,event_time:int. |
| K6_INFLUXDB_INSECURE          | false                 | When `true`, it will skip `https` certificate verification.                                                                                                                                                                                                                                                         |
| K6_INFLUXDB_PRECISION         | 1ns                   | The timestamp [Precision](https://docs.influxdata.com/influxdb/v2.7/reference/glossary/#precision).                                                                                                                                                                                                                 |
| K6_INFLUXDB_HTTP_PROXY        |                       | Sets an HTTP proxy for the InfluxDB output.                                                                                                                                                                                                                                                                         |

## Grafana Dashboards

You can use Grafana to query and visualize data from an InfluxDB instance. The instructions are available on [InfluxDB](https://docs.influxdata.com/influxdb/v2.7/tools/grafana/) and [Grafana](https://grafana.com/docs/grafana/latest/datasources/influxdb/).

You can also build a [custom Grafana dashboard](https://grafana.com/docs/k6/<K6_VERSION>/results-output/grafana-dashboards) to visualize the testing results in your own way.

For testing purposes, the [influxdb extension](https://github.com/grafana/xk6-output-influxdb) repository includes a [docker-compose setup](https://github.com/grafana/xk6-output-influxdb#docker-compose) with two basic dashboards.
