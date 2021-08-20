---
title: 'Grafana Cloud'
excerpt: 'How to export metrics from k6 Cloud to Grafana Cloud'
---

You can set up Grafana Cloud integration via [k6 Cloud app](/cloud/integrations/cloud-apm/grafana-cloud#configuration-via-k6-cloud-app) or by specifying [required parameters](/cloud/integrations/cloud-apm/grafana-cloud#configuration-parameters) in `options.ext.loadimpact.apm` in your [script](/cloud/integrations/cloud-apm/grafana-cloud#example-configuration-object).

To get custom metrics from your test runs into Grafana Cloud follow the [Grafana Cloud Setup](/cloud/integrations/cloud-apm/grafana-cloud#grafana-cloud-setup).

## Configuration via k6 Cloud app

Locate the page in the left menu under the **Manage** section and select **Grafana Cloud**.

![Manage Menu UI](../images/05-Cloud-APM/cloud-app-manage-menu.png)

You will be greeted with the following form. For more information on input fields see [configuration parameters](/cloud/integrations/cloud-apm/grafana-cloud#configuration-parameters).

![Cloud APM - Grafana Cloud Form UI](images/grafana-cloud-app-form.png)

After you have saved your configuration you will be able to select it in [Test builder](/test-authoring/test-builder).

![Cloud APM - Grafana Cloud Test Builder UI](images/grafana-cloud-app-testbuilder.png)

## Configuration Parameters

The configuration parameters for sending metrics to Grafana Cloud are as follows:

| Name                    | Description                                                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `provider`              | Any APM provider name available in the [supported APM provider](/cloud/integrations/cloud-apm#supported-apm-providers)'s table.                                                            |
| `remoteWriteURL`        | The `remoteWriteURL` provided by Grafana Cloud.                                                                                                |
| `credentials`           | The `credentials` provided by Grafana Cloud. The object consists of `username` (metric instance ID) and `password` (Grafana.com API Key) |
| `metrics`               | List of built-in and custom metrics to be exported.                                                                                                                                        |
| `includeDefaultMetrics` | If set, the export will include the default metrics. Default is `true`.                                                                                                                    |
| `includeTestRunId`      | If set, the `test_run_id` will be exported per each metric as an extra tag. Default is `false`.                                                                                            |

## Example Configuration Object

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

## Grafana Cloud Setup

For sending custom metrics from your test run to Grafana Cloud's Prometheus remote write integration, follow the [instructions](https://grafana.com/docs/grafana-cloud/metrics/prometheus/#sending-data-from-prometheus) on their documentation.

As also mentioned in their documentation, you can find the `remoteWriteURL`, username and password for your metrics endpoint by clicking on `Details` in the Prometheus card of the Grafana [Cloud Portal](https://grafana.com/docs/grafana-cloud/cloud-portal/). When you are [creating an API key](https://grafana.com/docs/grafana-cloud/cloud-portal/create-api-key/) on Grafana Cloud Portal to be used as password, make sure to use `MetricsPublisher` as role.

  ![Grafana Cloud metrics explorer](images/grafana-cloud.png)
