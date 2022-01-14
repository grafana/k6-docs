---
title: 'Grafana Cloud'
excerpt: 'This tutorial shows how to upload the test result metrics to Grafana Cloud using Grafana Cloud Prometheus and Telegraf'
---

> ⚠️ &nbsp; Para k6 Cloud tests, sigue las [instrucciones de k6 Cloud](/cloud/integrations/cloud-apm/grafana-cloud).

Using Grafana Cloud Prometheus, you can send your k6 metrics into [Grafana Cloud](https://grafana.com/products/cloud/) to better visualize your testing results, enabling you to correlate k6 metrics with other metrics of your monitored services using Grafana.

> While this article focuses on Grafana Cloud, any remote-write capable Prometheus installation is compatible with this approach.

## Prerequisites

- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana Cloud Prometheus](https://grafana.com/products/cloud/features/#cloud-metrics)
- Credentials for the `/api/prom/push` endpoint

## Configuration

If you do not have a Grafana Cloud account, you can sign up [here](https://grafana.com/products/cloud/). The free plan includes 10,000 Prometheus series.

Now, you need the URL, username and password of your Grafana Cloud Prometheus instance to configure the integration. 

Log in to Grafana.com and visit the [Cloud Portal](https://grafana.com/docs/grafana-cloud/what-are/cloud-portal/). Click on the `Details` button of your Prometheus service.

![Grafana Cloud Portal](./images/GrafanaCloud/grafana_cloud_portal.png)

Copy the URL of the Remote Write Endpoint and the Username / Instance ID. Create and copy an API key of `MetricsPublisher` role that will be used as password.

![Create API Key](./images/GrafanaCloud/grafana_cloud_create_api_key_metrics_publisher.png)

Next, we configure and run telegraf. Telegraf will collect the k6 metrics and forward them - using the Prometheus Remote Write endpoint - to Grafana Cloud Prometheus.

To install telegraf, follow the [official Telegraf documentation](https://docs.influxdata.com/telegraf).

Edit your `telegraf.conf` file using the example below. The example only requires you to change the username, password, and URL of the HTTP output to match your Grafana Cloud Prometheus settings.

<CodeGroup labels={["telegraf.conf"]} lineNumbers={[true]}>

```toml
[agent]
  interval = "10s"
  round_interval = true
  metric_batch_size = 5000
  metric_buffer_limit = 100000
  collection_jitter = "0s"
  flush_interval = "1s"
  flush_jitter = "0s"
  precision = ""
  debug = true
  logtarget = "stderr"
  hostname = ""
  omit_hostname = false

[[outputs.http]]
  url = "https://prometheus-us-central1.grafana.net/api/prom/push" # <--
  method = "POST"
  username = "Prometheus username or Instance ID" # <--
  password = "Grafana API Key (MetricsPublisher role)"    # <--
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

You can now run the Telegraf instance as follow:

```bash
telegraf -config $PATH/telegraf.conf
```

> An example repository using Docker to run Telegraf is available on GitHub at [https://github.com/k6io/example-k6-to-grafana-cloud](https://github.com/k6io/example-k6-to-grafana-cloud). 

## Run the test

When telegraf is running, you can execute your k6 test and configure k6 to output the metrics to the telegraf instance. Telegraf will forward the k6 metrics to your Grafana Cloud Prometheus.

```bash
# if telegraf is running on another machine
$ k6 run --out influxdb=http://my-telegraf-host:8186 my-test.js

# if telegraf is running on the same host and port 8186:
$ k6 run --out influxdb my-test.js
```

## Explore k6 metrics

In Grafana Cloud, click on the Explore icon on the menu bar, and choose the Prometheus data source from the dropdown in the top left. In the query field, query k6 metrics to explore your testing results.

![Explore k6 metrics in Grafana Cloud](./images/GrafanaCloud/grafana_cloud_explore_k6_metrics.png)
