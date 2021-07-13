---
title: 'Grafana Cloud'
excerpt: >
  This tutorial shows how to upload the test result metrics to Grafana Cloud using Grafana Cloud Prometheus and Telegraf'
---

> #### Example Repository
>
> An example repository using Docker to run Telegraf is available on GitHub at
> https://github.com/k6io/example-k6-to-grafana-cloud

Using Telegraf and Grafana Cloud Prometheus, getting your metrics from k6 into Grafana Cloud is completed in just a few steps.

While this article focuses on Grafana Cloud, any remote-write capable Prometheus installation is compatible with this approach.

## Prerequisites

- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana Cloud Prometheus](https://grafana.com/products/cloud/features/#cloud-metrics)
- Credentials for the `/api/prom/push` endpoint

## Configuration

We will configure telegraf to:

- accept input using the InfluxDB Listener
- output metrics using Prometheus remote-write

The example `telegraf.conf` below only requires you to change the username, password, and URL of the HTTP output to match what you see in Grafana Cloud Prometheus.

<CodeGroup labels={["telegraf.conf"]} lineNumbers={[true]}>

```toml
[[outputs.http]]
  url = "https://prometheus-us-central1.grafana.net/api/prom/push" # <--
  method = "POST"
  username = "YOUR-GRAFANA-CLOUD-PROMETHEUS-USERNAME" # <--
  password = "YOUR-GRAFANA-CLOUD-PROMETHEUS-TOKEN"    # <--
  data_format = "prometheusremotewrite"

[outputs.http.headers]
  Content-Type = "application/x-protobuf"
  Content-Encoding = "snappy"
  X-Prometheus-Remote-Write-Version = "0.1.0"

[[inputs.influxdb_listener]]
  service_address = ":8186"
  read_timeout = "10s"
  write_timeout = "10s"
  max_body_size = "32MiB"
  name_prefix = "k6_"
```

</CodeGroup>

For more information on how to configure Telegraf, see the [official Telegraf documentation](https://docs.influxdata.com/telegraf).

## Usage

```bash
# if telegraf is running on another machine
$ k6 run --out influxdb=http://my-telegraf-host:8186 my-test.js

# if telegraf is running on the same host and port 8186:
$ k6 run --out influxdb my-test.js
```
