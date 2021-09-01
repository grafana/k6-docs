---
title: 'New Relic'
excerpt: 'How to export metrics from k6 Cloud to New Relic'
---

With this integration, you can export test result metrics from the k6 Cloud to the New Relic's Data Platform to explore your k6 metrics using [New Relic](https://newrelic.com/).

> ⭐️  &nbsp;[Cloud APM](/cloud/integrations/cloud-apm/) integrations are available on Pro and Enterprise plans, as well as the annual Team plan and Trial.

## Set up Prometheus remote write integration in New Relic

With New Relic, you can set up a Prometheus remote write instance to collect data. k6 Cloud can export test result metrics to this Prometheus instance to flow data into New Relic. 

To set up the New Relic integration on the k6 Cloud, you need the following settings from New Relic:

- License Key
- Prometheus remote write URL

The integration needs a [New Relic license key](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#ingest-license-key) to authenticate and authorize the k6 Cloud for ingesting data.

Once you have the license key, you have to launch a Prometheus instance and set up the remote write integration in New Relic. Follow these [instructions](https://docs.newrelic.com/docs/integrations/prometheus-integrations/install-configure-remote-write/set-your-prometheus-remote-write-integration/).

## k6 Cloud test configuration

You have to enable the New Relic integration for each test that you want to export its test result metrics.

Once you have set up the New Relic settings in the test, you can run a cloud test as usual. When running the cloud test, the k6 Cloud will continuously send the test results metrics to New Relic.

Currently, there are two options to set up the Cloud APM settings in the test:

- [Using the test builder](#configuration-using-the-test-builder)
- [Scripting the k6 test](#configuration-in-the-k6-script)  


### Configuration using the test builder

First, you have to configure the New Relic integration for an organization. Click the `Cloud APM` option on the left sidebar menu under the `Manage` section, and select `New Relic` from the list.

![Cloud APM - New Relic Form UI](images/newrelic-cloud-app-form.png)

In this form, set the URL, license key that you copied previously from New Relic.  For more information on the other input fields, see [configuration parameters](#configuration-parameters).

Save the New Relic configuration for the current organization. 

Note that configuring the New Relic settings for an organization does not enable the integration. You have to enable it manually for each test using the [test builder](/test-authoring/test-builder).

Now, create a new test with the test builder or select a test - previously created with the test builder. Click the `Cloud APM` option on the test builder sidebar to enable the integration for the test.

![Cloud APM - New Relic Test Builder UI](images/newrelic-cloud-app-testbuilder.png)

### Configuration in the k6 script

If you script your k6 tests, you can also configure the Cloud APM settings using the `apm` option in the k6 script. 

The parameters to export the k6 metrics to New Relic are as follows:

```javascript
export let options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: "prometheus",
          remoteWriteURL: "https://metric-api.newrelic.com/prometheus/v1/write?prometheus_server=<YOUR_DATA_SOURCE_NAME>" 

          // optional when `remoteWriteURL` includes the `X-License-Key` query param
          credentials: {
            token: "<YOUR_LICENSE_KEY>"
          },

          // optional parameters
          metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
          includeDefaultMetrics: true,
          includeTestRunId: false
        },
      ]
    },
  },
};
```

### Configuration parameters

| Name                    | Description                                                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| provider<sup>(required)</sup>            | For this integration, the value must be `prometheus`.
| remoteWriteURL<sup>(required)</sup>       | URL of the Prometheus remote write endpoint.  <br/> The `prometheus_server` query param must be included. The license key can optionally be included using the `X-License-Key` query param. |
| credentials           | The credentials to authenticate with New Relic. It has a `token` parameter to set the license key. <br/> The `credentials` parameter is optional when the license key is passed via the `X-License-Key` query param on the `remoteWriteURL` parameter. |
| includeDefaultMetrics | Whether it exports the [default APM metrics](/cloud/integrations/cloud-apm/#default-apm-metrics): `data_sent`, `data_received`, `http_req_duration`, `http_reqs`, `iterations`, and `vus`. Default is `true`. |
| metrics               | List of built-in and custom metrics to export. <br/> Metric names are validated against the [Prometheus metric name conventions](https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels)—ignoring nonconforming metrics.                                      |
| includeTestRunId      | Whether all the exported metrics include a `test_run_id` tag whose value is the k6 Cloud test run id. Default is `false`. <br/> Be aware that enabling this setting might increase the cost of your APM provider. |
| resampleRate          | The rate by which the metrics are resampled and sent to the APM provider in seconds. Default is 3 and acceptable values are integers between 1 and 10. |


### See also

- [New Relic: Set up your Prometheus remote write integration](https://docs.newrelic.com/docs/integrations/prometheus-integrations/install-configure-remote-write/set-your-prometheus-remote-write-integration/)
- [Cloud APM](/cloud/integrations/cloud-apm/)