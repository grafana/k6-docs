---
title: 'Grafana Cloud'
excerpt: 'How to export metrics from k6 Cloud to Grafana Cloud'
---

TODO

For sending custom metrics from your test run to Grafana Cloud's Prometheus remote write integration, follow the [instructions](https://grafana.com/docs/grafana-cloud/metrics/prometheus/#sending-data-from-prometheus) on their documentation.

As also mentioned in their documentation, you can find the `remoteWriteURL`, username and password for your metrics endpoint by clicking on `Details` in the Prometheus card of the Grafana [Cloud Portal](https://grafana.com/docs/grafana-cloud/cloud-portal/). When you are [creating an API key](https://grafana.com/docs/grafana-cloud/cloud-portal/create-api-key/) on Grafana Cloud Portal to be used as password, make sure to use `MetricsPublisher` as role.

An example configuration for Grafana Cloud might look like this:

```javascript
export let options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: "prometheus",
          remoteWriteURL: "https://prometheus-us-central1.grafana.net/api/prom/push",
          credentials: {
            username: "<Your Metrics instance ID>",
            password: "<Your Grafana.com API Key>"
          },
          metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
          includeDefaultMetrics: true,
          includeTestRunId: false
        },
      ]
    },
  },
};
```

  ![Grafana Cloud metrics explorer](images/grafana-cloud.png)
