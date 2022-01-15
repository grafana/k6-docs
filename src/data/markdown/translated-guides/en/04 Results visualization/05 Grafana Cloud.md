---
title: 'Grafana Cloud'
excerpt: >
  This tutorial shows how to upload the test result metrics to Grafana Cloud using Grafana Cloud Prometheus and the k6 extension for Prometheus remote write'
---


Using Grafana Cloud Prometheus and the [k6 extension for Prometheus remote write](https://github.com/grafana/xk6-output-prometheus-remote), you can send your k6 metrics into [Grafana Cloud](https://grafana.com/products/cloud/) to better visualize your testing results, enabling you to correlate k6 metrics with other metrics of your observability stack.

> While this article focuses on Grafana Cloud, any remote-write capable Prometheus installation is compatible with this approach.
> 
> ⚠️ &nbsp; For k6 Cloud tests, follow the [k6 Cloud instructions](/cloud/integrations/cloud-apm/grafana-cloud).

## Set up Grafana Cloud Prometheus

If you do not have a Grafana Cloud account, you can sign up [here](https://grafana.com/products/cloud/). The free plan includes 10,000 Prometheus series.

Now, you need the URL, username and password of your Grafana Cloud Prometheus instance to configure the integration. 

Log in to Grafana.com and visit the [Cloud Portal](https://grafana.com/docs/grafana-cloud/fundamentals/cloud-portal/). Click on the `Details` button of your Prometheus service.

![Grafana Cloud Portal](./images/GrafanaCloud/grafana_cloud_portal.png)

Copy the URL of the Remote Write Endpoint and the Username / Instance ID. 

![Grafana Cloud Prometheus Configuration](./images/GrafanaCloud/grafana_cloud_prometheus_configuration.png)

On the Password / API Key section, create and copy an API key of `MetricsPublisher` role that will be used as password.

![Create API Key](./images/GrafanaCloud/grafana_cloud_create_api_key_metrics_publisher.png)

## Build the k6 version

To output k6 metrics to Prometheus, you have to run a k6 version built with the [extension for Prometheus remote write](https://github.com/grafana/xk6-output-prometheus-remote).

<InstallationInstructions extensionUrl="github.com/grafana/xk6-output-prometheus-remote"/>

## Run the test

Now, pass the Username, API key, and Remote Write Endpoint of the Grafana Cloud Prometheus Configuration to the k6 binary built with the extension as follows:

```bash
K6_PROMETHEUS_USER=Your_Username \
K6_PROMETHEUS_PASSWORD=Your_API_KEY \
K6_PROMETHEUS_REMOTE_URL=Your_REMOTE_WRITE_ENDPOINT \
./k6 run script.js -o output-prometheus-remote
```

## Explore k6 metrics

In Grafana Cloud, click on the Explore icon on the menu bar, and choose the Prometheus data source from the dropdown in the top left. In the query field, query k6 metrics to explore your testing results.

![Explore k6 metrics in Grafana Cloud](./images/GrafanaCloud/grafana_cloud_explore_k6_metrics_from_extension.png)
