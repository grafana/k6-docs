---
title: 'DataDog'
head_title: 'Datadog integration with k6 Cloud'
excerpt: 'How to export metrics from k6 Cloud to DataDog'
---

With this integration, you can export test-result metrics from the k6 Cloud to [DataDog](https://www.datadoghq.com/), where you can visualize and correlate k6 metrics with other monitored metrics.

> ⭐️  &nbsp;[Cloud APM](/cloud/integrations/cloud-apm/) integrations are available on Pro and Enterprise plans, as well as the annual Team plan and Trial.

## Necessary DataDog settings

To set up the integration on the k6 Cloud, you need the following DataDog settings:

- API key
- Application key

To get your keys, follow the DataDog documentation: ["API and Application Keys"](https://docs.datadoghq.com/account_management/api-app-keys/).

### Supported Regions

The supported regions for the DataDog integration are `us`/`us1` (default), `eu`/`eu1`, `us3`, `us5`, `us1-fed`.

> API and Application keys for a DataDog region won't work on a different region.

## Export k6 metrics to DataDog

You must enable the DataDog integration for each test whose metrics you want to export.

After you set up the DataDog settings in the test, you can run a cloud test as usual.
As the test runs, k6 Cloud will continuously send the test results metrics to DataDog.

Currently, there are two options to set up the Cloud APM settings in the test:

- [Using the test builder](#configuration-using-the-test-builder)
- [Scripting the k6 test](#configuration-in-the-k6-script)

### Configure DataDog export with the test builder

First, configure the DataDog integration for an organization.

1. From the Main navigation, go to **Manage > Cloud APM** and select **Azure Monitor**.

  ![Cloud APM - DataDog Form UI](images/datadog-cloud-app-form.png)

1. In this form, set the API and application keys that you copied previously from DataDog.

  For more information on the other input fields, see [configuration parameters](#configuration-parameters).

1. Save the DataDog configuration for the current organization.

Note that configuring the DataDog settings for an organization does not enable the integration. You must manually enable each test using the [test builder](/test-authoring/test-builder).

1. Create a new test with the test builder, or select an existing test previously created using the test builder.

1. Select the **cloud apm** option on the test builder sidebar to enable the integration for the test.

  ![Cloud APM - DataDog Test Builder UI](images/datadog-cloud-app-testbuilder.png)

### Configuration in the k6 script

If you script your k6 tests, you can also configure the Cloud APM settings using the `apm` option in the k6 script.

The parameters to export the k6 metrics to DataDog are as follows:

```javascript
export const options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: 'datadog',
          apiKey: '<Datadog Provided API key>',
          appKey: '<Datadog Provided App key>',

          // optional parameters
          region: 'us',

          metrics: [
            'vus',
            'http_req_duration',
            'my_rate_metric',
            'my_gauge_metric',
            // create a metric by counting HTTP responses with status 500
            {
              sourceMetric: 'http_reqs{status="500"}',
              targetMetric: 'k6.http_server_errors.count',
            },
          ],
          includeDefaultMetrics: true,
          includeTestRunId: true,
        },
      ],
    },
  },
};
```

### Configuration parameters

| Name                          | Description                                                                                                                                                                                                                                                   |
|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| provider<sup>(required)</sup> | For this integration, the value must be `datadog`.                                                                                                                                                                                                            |
| apiKey<sup>(required)</sup>   | DataDog API key.                                                                                                                                                                                                                                              |
| appKey<sup>(required)</sup>   | DataDog application key.                                                                                                                                                                                                                                      |
| region                        | One of DataDog regions/sites. See the list of [supported regions](#supported-regions). Default is `us`.                                                                                                                                                       |
| apiURL                        | _Alternative to `region`._ URL of [Datadog Site API](https://docs.datadoghq.com/getting_started/site/). Included for support of possible new or custom Datadog regions. Default is picked according to `region`, e.g. `'https://api.datadoghq.com'` for `us`. |
| includeDefaultMetrics         | If `true`, add [default APM metrics](/cloud/integrations/cloud-apm/#default-apm-metrics) to export: `data_sent`, `data_received`, `http_req_duration`, `http_reqs`, `iterations`, and `vus`. Default is `true`.                                               |
| metrics                       | List of metrics to export. <br/> For more details on how to specify metrics see below.                                                                                                                                                                        |
| includeTestRunId              | Whether all the exported metrics include a `test_run_id` tag whose value is the k6 Cloud test run id. Default is `false`. <br/> Be aware that enabling this setting might increase the cost of your APM provider.                                             |
| resampleRate                  | Sampling period for metrics in seconds. Default is 3 and supported values are integers between 1 and 60.                                                                                                                                                      |
#### Metric configuration

Each entry in `metrics` parameter can be an object with following keys:

| Name                              | Description                                                                                                                                                                                                                                                                                       |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sourceMetric<sup>(required)</sup> | Name of k6 builtin or custom metric to export, optionally with tag filters. <br/> Tag filtering follows [Prometheus selector syntax](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors),<br/> for example: `http_reqs{name="http://example.com",status!="500"}` |
| targetMetric                      | Name of resulting metric in Datadog. If not specified, will use the name `k6.{sourceMetric}`.                                                                                                                                                                                                     |
| keepTags                          | List of tags to preserve when exporting time series.                                                                                                                                                                                                                                              |

<Blockquote mod="warning"
title="keepTags can have a high cost">

Most cloud platforms charge clients based on the number of time series stored.

When exporting a metric, every combination of kept-tag values becomes a distinct time series in Prometheus.
While this granularity can help test analysis, it will incur high costs with thousands of time series.

For example, if you add `keepTags: ["name"]` on `http_*` metrics, and your load test calls many dynamic URLs, the number of produced time series can build up very quickly.
Refer to [URL Grouping](/using-k6/http-requests#url-grouping) for how to reduce the value count for a `name` tag.

k6 recommends exporting only tags that are necessary and don't have many distinct values.

_Read more_: [Counting custom metrics](https://docs.datadoghq.com/account_management/billing/custom_metrics/?tab=countrate#counting-custom-metrics) in Datadog documentation

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
              targetMetric: 'k6_http_request_duration', // name of metric as it appears in Datadog
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


## Read more

- [Cloud APM](/cloud/integrations/cloud-apm/)
