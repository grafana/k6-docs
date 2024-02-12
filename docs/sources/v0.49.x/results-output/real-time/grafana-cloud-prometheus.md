---
title: 'Grafana Cloud Prometheus'
description: >
  How to upload the test result metrics to Grafana Cloud using Grafana Cloud Prometheus and the k6 output for Prometheus remote write'
weight: 00
---

# Grafana Cloud Prometheus

{{% admonition type="caution" %}}

This page includes instructions for running a local test that sends the test results to a Prometheus instance in Grafana Cloud.

For running and managing cloud tests in Grafana Cloud, check out [Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/k6/).

{{% /admonition %}}

With Grafana Cloud Prometheus and the [k6 output for Prometheus remote write](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/prometheus-remote-write), you can send your k6 results output to [Grafana Cloud](https://grafana.com/products/cloud) to visualize your testing results.
With k6 metrics in Grafana, you can correlate k6 metrics with other metrics of your observability stack.

While this topic uses Grafana Cloud as an example, this approach is compatible with any remote write capable Prometheus installation.

## Set up Grafana Cloud Prometheus

Before you start, you need the following:

- A Grafana Cloud account ([sign up](https://grafana.com/products/cloud/)).
  The free plan includes 10,000 Prometheus series.
- The URL, username, and password of your Grafana Cloud Prometheus instance to configure the integration.

After you've set up your account, follow these steps:

1. Log in to `Grafana.com` and visit the [Cloud Portal](https://grafana.com/docs/grafana-cloud/fundamentals/cloud-portal/).
   Select the **Details** of your Prometheus service.

   ![Grafana Cloud Portal](/media/docs/k6-oss/grafana_cloud_portal.png)

1. Copy the URL of the Remote Write Endpoint, along with the Username and Instance ID.

   ![Grafana Cloud Prometheus Configuration](/media/docs/k6-oss/grafana_cloud_prometheus_configuration.png)

1. In the **Password / API Key** section, create and copy an API key of the `MetricsPublisher` role. This will be used as a password.

   ![Create API Key](/media/docs/k6-oss/grafana_cloud_create_api_key_metrics_publisher.png)

## Run the test

Now, pass the Username, API key, and Remote Write Endpoint of the Grafana Cloud Prometheus Configuration to the k6 binary:

```bash
K6_PROMETHEUS_RW_USERNAME=USERNAME \
K6_PROMETHEUS_RW_PASSWORD=API_KEY \
K6_PROMETHEUS_RW_SERVER_URL=REMOTE_WRITE_ENDPOINT \
k6 run -o experimental-prometheus-rw script.js
```

## Visualize test results

To visualize test results with Grafana, you can import the [k6 Prometheus dashboard by Grafana k6](https://grafana.com/grafana/dashboards/19665-k6-prometheus/).

On the Dashboards UI:

- Click `New` and select `Import`.
- Paste the Grafana URL or ID of the dashboard, and click `Load`.
- Select the Prometheus data source, and click `Import`.

![k6 Prometheus Dashboard](/media/docs/k6-oss/k6-prometheus-dashboard-part1.png)

Optionally, when running the test, you can set the `testid` tag as a [wide test tag](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups/#test-wide-tags) to filter results of a particular test run on this dashboard (or in PromQL queries). `testid` can be any unique string that allows you to identify the test run.

{{< code >}}

```bash
K6_PROMETHEUS_RW_USERNAME=USERNAME \
K6_PROMETHEUS_RW_PASSWORD=API_KEY \
K6_PROMETHEUS_RW_SERVER_URL=REMOTE_WRITE_ENDPOINT \
k6 run -o experimental-prometheus-rw --tag testid=TEST_ID script.js
```

{{< /code >}}

Additionally, you can also use the [Explore UI](https://grafana.com/docs/grafana/latest/explore/) to query k6 time series, design your visualization panels, and add them to any of your existing dashboards.

![Explore k6 metrics in Grafana Cloud](/media/docs/k6-oss/grafana_cloud_explore_k6_metrics_from_extension.png)

All the k6 time series have a **k6\_** prefix.
For more details, refer to the documentation on the [mapping of k6 metrics with Prometheus metrics](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/prometheus-remote-write#metrics-mapping).

It's also important to understand the default [Trend metric conversion](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/prometheus-remote-write#trend-metric-conversions) process and the format and querying limitations. The [`K6_PROMETHEUS_RW_TREND_STATS` option](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/prometheus-remote-write#options) allows you to convert trend metrics to multiple Prometheus time series. For instance, `K6_PROMETHEUS_RW_TREND_STATS=p(95),p(99),max,min` transforms each k6 trend metric into four Prometheus metrics as follows:

- `k6_*_p95`
- `k6_*_p99`
- `k6_*_max`
- `k6_*_min`
