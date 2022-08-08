---
title: 'New Relic'
excerpt: 'How to export metrics from k6 Cloud to New Relic'
---

With this integration, you can export test result metrics from the k6 Cloud to the [New Relic](https://newrelic.com/) data platform.

> ⭐️  &nbsp;[Cloud APM](/cloud/integrations/cloud-apm/) integrations are available on Pro and Enterprise plans, as well as the annual Team plan and Trial.

## Set up Prometheus remote write integration in New Relic

With New Relic, you can set up a Prometheus remote write instance to collect data.
k6 Cloud can export test-result metrics to this Prometheus instance to flow data into New Relic.

### Necessary New Relic settings

To set up the New Relic integration for k6 Cloud, you need the following settings from New Relic:

- License Key
- Prometheus remote write URL

The integration needs a [New Relic license key](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#ingest-license-key) to authenticate and authorize k6 metrics for ingestion.

Once you have the license key, launch a Prometheus instance and set up the remote write integration in New Relic.
To do this, follow the [New Relic instructions](https://docs.newrelic.com/docs/integrations/prometheus-integrations/install-configure-remote-write/set-your-prometheus-remote-write-integration/).

## Export k6 Cloud metrics to New Relic

You must enable the New Relic integration for each test whose results you want to export.

After you set up the New Relic settings in the test, you can run a cloud test as usual.
As the test runs, the k6 Cloud continuously sends the test-result metrics to New Relic.

Currently, there are two options to set up the Cloud APM settings in the test:

- [Using the test builder](#configuration-using-the-test-builder)
- [Scripting the k6 test](#configuration-in-the-k6-script)


### Export to New Relic with the test builder

First, you have to configure the New Relic integration for an organization.

1. From the Main navigation, go to **Manage > Cloud APM** and select **New Relic**.

  ![Cloud APM - DataDog Form UI](images/datadog-cloud-app-form.png)

1. In this form, enter the URL and license key that you copied previously from New Relic.

  ![Cloud APM - New Relic Form UI](images/newrelic-cloud-app-form.png)

  For more information on the other input fields, see [configuration parameters](#configuration-parameters).

1. Save the New Relic configuration for the current organization.

Note that configuring New Relic settings for an organization does not enable the integration.
You must enable it manually for each test using the [test builder](/test-authoring/test-builder).

1. Create a new test with the test builder, or select a test that was already created with the Test Builder.

1. On the test builder sidebar, select the **Cloud APM** to enable the integration for the test.

  ![Cloud APM - New Relic Test Builder UI](images/newrelic-cloud-app-testbuilder.png)

### Export to New Relic in a k6 script

If you script your k6 tests,
you can configure the Cloud APM settings using the `apm` option in the k6 script.

The parameters to export k6 metrics to New Relic are as follows:

```javascript
export const options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: 'prometheus',
          remoteWriteURL:
            'https://metric-api.newrelic.com/prometheus/v1/write?prometheus_server=<YOUR_DATA_SOURCE_NAME>',

          // optional when `remoteWriteURL` includes the `X-License-Key` query param
          credentials: {
            token: '<YOUR_LICENSE_KEY>',
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

| Name                                | Description                                                                                                                                                                                                                                            |
|-------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| provider<sup>(required)</sup>       | For this integration, the value must be `prometheus`.                                                                                                                                                                                                  |
| remoteWriteURL<sup>(required)</sup> | URL of the Prometheus remote write endpoint.  <br/> The `prometheus_server` query param must be included. The license key can optionally be included using the `X-License-Key` query param.                                                            |
| credentials                         | The credentials to authenticate with New Relic. It has a `token` parameter to set the license key. <br/> The `credentials` parameter is optional when the license key is passed via the `X-License-Key` query param on the `remoteWriteURL` parameter. |
| includeDefaultMetrics               | Whether it exports the [default APM metrics](/cloud/integrations/cloud-apm/#default-apm-metrics): `data_sent`, `data_received`, `http_req_duration`, `http_reqs`, `iterations`, and `vus`. Default is `true`.                                          |
| metrics                             | List of metrics to export. <br/> For more details on how to specify metrics see below.                                                                                                                                                                 |
| includeTestRunId                    | Whether all the exported metrics include a `test_run_id` tag whose value is the k6 Cloud test run id. Default is `false`. <br/> Be aware that enabling this setting might increase the cost of your APM provider.                                      |
| resampleRate                        | The rate by which the metrics are resampled and sent to the APM provider in seconds. Default is 3 and acceptable values are integers between 1 and 10.                                                                                                 |


#### Metric configuration

| Name                              | Description                                                                                                                                                                                                                                                                                       |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sourceMetric<sup>(required)</sup> | Name of k6 builtin or custom metric to export, optionally with tag filters. <br/> Tag filtering follows [Prometheus selector syntax](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors),<br/> for example: `http_reqs{name="http://example.com",status!="500"}` |
| targetMetric                      | Name of resulting metric in New Relic. If not specified, will use the name `k6.{sourceMetric}`.                                                                                                                                                                                                   |
| keepTags                          | List of tags to preserve when exporting time series.                                                                                                                                                                                                                                              |


<Blockquote mod="warning">

#### Possible high costs of using `keepTags`

Most cloud platformscharge clients based on number of time series stored.

When exporting a metric, every combination of kept tag values will become a distinct time series. 
This can be very useful for analyzing load test results, but will incur high costs if there are thousands of time series produced. 

For example, if you add `keepTags: ["name"]` on `http_*` metrics, and your load test calls a lot of dynamic URLs, the number of produced time series can build up very quickly.
See [URL Grouping](/using-k6/http-requests#url-grouping) on how to reduce value count for `name` tag.

We recommend only exporting tags that are really necessary and don't have a lot of distinct values.

</Blockquote>

#### Metric configuration detailed example
```javascript
export const options = {
  ext: {
    loadimpact: {
      apm: [
        {
          // ...
          includeDefaultMetrics: false,
          includeTestRunId: true,

          metrics: [
            // keep vus metrics for whole test run
            'vus',
            // total byte count for data sent/received by k6
            'data_sent',
            'data_received',

            // export checks metric, keeping 'check' (name of the check) tag
            {
              sourceMetric: 'checks',
              keepTags: ['check'],
            },

            // export HTTP durations from 'default' scenario,
            // keeping only successful response codes (2xx, 3xx), using regex selector syntax
            {
              sourceMetric: 'http_req_duration{scenario="default",status=~"[23][0-9]{2}"}',
              targetMetric: 'k6_http_request_duration', // name of metric as it appears in New Relic
              keepTags: ['name', 'method', 'status'],
            },

            // count HTTP responses with status 500
            {
              sourceMetric: 'http_reqs{status="500"}',
              targetMetric: 'k6_http_server_errors_count',
              keepTags: ['scenario', 'group', 'name', 'method'],
            },
          ],
        },
      ],
    },
  },
};
```

### Read more

- [New Relic: Set up your Prometheus remote write integration](https://docs.newrelic.com/docs/integrations/prometheus-integrations/install-configure-remote-write/set-your-prometheus-remote-write-integration/)
- [Cloud APM](/cloud/integrations/cloud-apm/)
