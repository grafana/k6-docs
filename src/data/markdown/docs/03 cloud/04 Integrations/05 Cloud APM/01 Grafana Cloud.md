---
title: 'Grafana Cloud'
excerpt: 'How to export metrics from k6 Cloud to Grafana Cloud'
---

With this integration, you can export test result metrics from the k6 Cloud to a Prometheus instance hosted by [Grafana Cloud](https://grafana.com/products/cloud/).
After that, you can use Grafana to query, visualize, and correlate k6 metrics with all your other metrics.

> ⭐️  &nbsp;[Cloud APM](/cloud/integrations/cloud-apm/) integrations are available on Pro and Enterprise plans, as well as the annual Team plan and Trial.

## Before you start

If you don't have a Grafana Cloud account, [sign up](https://grafana.com/products/cloud/).
The free plan includes 10,000 Prometheus series.

### Necessary values from Grafana Cloud

To export k6 Cloud results to Grafana cloud, you need the following data from your Grafana Cloud Prometheus instance:

- [ ] URL
- [ ] Username
- [ ] Password

To access this information:

1. Log in to Grafana.com and visit the [Cloud Portal](https://grafana.com/docs/grafana-cloud/what-are/cloud-portal/).
1. Select the **Details** button of your Prometheus service.

  ![Grafana Cloud Portal](./images/grafana_cloud_portal.png)

1. Copy the URL of the Remote Write Endpoint and the Username / Instance ID.
1. For the password, create and copy an API key of the `MetricsPublisher` role.

  ![Create API Key](./images/grafana_cloud_create_api_key_metrics_publisher.png)

Now, you can set the URL, username, and password in k6 Cloud to authorize exporting k6 Cloud metrics to your Prometheus instance.

## Export k6 Cloud results to Grafana Cloud

Now that you have the necessary values from Grafana Cloud settings, you can configure k6 Cloud tests to export.

Currently, there are two options to set up the Cloud APM settings in the test:

- [Using the test builder](#configuration-using-the-test-builder)
- [Scripting the k6 test](#configuration-in-the-k6-script)

### Configuration with the Test Builder

You have to configure the Grafana Cloud integration for an organization.
From the k6 Cloud app, follow these steps.

1. In the main navigation, go to **Manage > Cloud APM**, and select **Grafana Cloud**.
1. In the form, paste the `URL`, `username`, and `password` that you copied previously.

  ![Cloud APM - Grafana Cloud Form UI](images/grafana-cloud-app-form.png)

  For details, refer to [configuration parameters](#configuration-parameters).

1. Save the Grafana Cloud configuration for the current organization.

Note that configuring the Grafana Cloud settings for an organization does not enable the integration. You have to manually enable each test using the [test builder](/test-authoring/test-builder).

1. Create a new test with the Test Builder, or select a test that was previously created with the Test Builder.
1. To enable the integration for the test, select the **Cloud APM** option on the Test&ndash;Builder sidebar.

  ![Cloud APM - Grafana Cloud Test Builder UI](images/grafana-cloud-app-testbuilder.png)

### Configuration in the k6 script

If you script your k6 tests, you can configure the Cloud APM settings using the `apm` option in the k6 script.

The parameters to export k6 metrics to a Grafana Cloud Prometheus instance are as follows:

```javascript
export const options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: 'prometheus',
          remoteWriteURL: '<Remote Write URL>',
          credentials: {
            username: '<Prometheus Username / Instance ID>',
            password: '<Grafana Cloud API key of type MetricsPublisher>',
          },
          // optional parameters
          metrics: ['http_req_sending', 'my_rate', 'my_gauge'], // ...
          includeDefaultMetrics: true,
          includeTestRunId: false,
        },
      ],
    },
  },
};
```

### Configuration parameters

| Name                    | Description                                                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| provider<sup>(required)</sup>            | For this integration, the value must be `prometheus`.
| remoteWriteURL<sup>(required)</sup>        | URL of the Prometheus remote write endpoint. <br/> For example: `https://prometheus-us-central1.grafana.net/api/prom/push`.                                                                                                |
| credentials<sup>(required)</sup>         | The credentials to authenticate with the Grafana Cloud Prometheus instance. The required parameters are: <br/> - username: the Prometheus username or instance ID. <br/> - password: a Grafana Cloud API key of type `MetricsPublisher`. |
| includeDefaultMetrics | Whether it exports the [default APM metrics](/cloud/integrations/cloud-apm/#default-apm-metrics): `data_sent`, `data_received`, `http_req_duration`, `http_reqs`, `iterations`, and `vus`. Default is `true`. |
| metrics               | List of built-in and custom metrics to export. <br/> Metric names are validated against the [Prometheus metric name conventions](https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels)—ignoring nonconforming metrics.                                      |
| includeTestRunId      | Whether all the exported metrics include a `test_run_id` tag whose value is the k6 Cloud test run id. Default is `false`. <br/> Be aware that enabling this setting might increase the cost of your APM provider. |
| resampleRate          | The rate by which the metrics are resampled and sent to the APM provider in seconds. Default is 3 and acceptable values are integers between 1 and 10. |


## Run the cloud test

Once you have set up the Grafana Cloud settings in the test, you can run a cloud test as usual.
k6 Cloud will continuously export the test results metrics to the Prometheus endpoint during the test execution.

To test the integration, use the Prometheus query field to find k6 metrics.

  ![Grafana Cloud metrics explorer](images/grafana_cloud_explore_k6_metrics.png)

You can now start using all Grafana visualization capabilities for the k6 metrics.
And correlate k6 metrics with other system metrics to get better insights into what happens during your tests.

## See also

- [Grafana Plugin](/cloud/integrations/grafana-plugin/)
- [Cloud APM](/cloud/integrations/cloud-apm/)
