---
title: 'Datadog'
head_title: 'Datadog integration with k6 Cloud'
excerpt: 'How to export metrics from k6 Cloud to Datadog'
---

With this integration, you can export test-result metrics from the k6 Cloud to [Datadog](https://www.datadoghq.com/), where you can visualize and correlate k6 metrics with other monitored metrics.

> ⭐️  &nbsp;[Cloud APM](/cloud/integrations/cloud-apm/) integrations are available on Pro and Enterprise plans, as well as the annual Team plan and Trial.

## Necessary Datadog settings

To set up the integration on the k6 Cloud, you need the following Datadog settings:

- API key
- Application key

To get your keys, follow the Datadog documentation: ["API and Application Keys"](https://docs.datadoghq.com/account_management/api-app-keys/).

### Supported Regions

<<<<<<< HEAD
<<<<<<< HEAD
The supported regions for the Datadog integration are `us`/`us1` (default), `eu`/`eu1`, `us3`, `us5`, `us1-fed`.

> API and Application keys for a Datadog region won't work on a different region.
=======
The supported regions for the DataDog integration are `us`/`us1` (default), `eu`/`eu1`, `us3`, `us5`, `us1-fed`.
>>>>>>> e52edde8 (Change APM documentation to reflect code changes)

## Export k6 metrics to Datadog

You must enable the Datadog integration for each test whose metrics you want to export.

=======
The supported regions for the Datadog integration are `us`/`us1` (default), `eu`/`eu1`, `us3`, `us5`, `us1-fed`.

> API and Application keys for a Datadog region won't work on a different region.

## Export k6 metrics to Datadog

You must enable the Datadog integration for each test whose metrics you want to export.

>>>>>>> 8a67c7b5 (Fix prefix in Prometheus export, correct Datadog capitalization)
After you set up the Datadog settings in the test, you can run a cloud test as usual.
As the test runs, k6 Cloud will continuously send the test results metrics to Datadog.

Currently, there are two options to set up the Cloud APM settings in the test:

- [Using the test builder](#configuration-using-the-test-builder)
- [Scripting the k6 test](#configuration-in-the-k6-script)

### Configure Datadog export with the test builder

First, configure the Datadog integration for an organization.

1. From the Main navigation, go to **Manage > Cloud APM** and select **Datadog**.

  ![Cloud APM - Datadog Form UI](images/datadog-cloud-app-form.png)

1. In this form, set the API and application keys that you copied previously from Datadog.

  For more information on the other input fields, see [configuration parameters](#configuration-parameters).

1. Save the Datadog configuration for the current organization.

Note that configuring the Datadog settings for an organization does not enable the integration. You must manually enable each test using the [test builder](/test-authoring/test-builder).

1. Create a new test with the test builder, or select an existing test previously created using the test builder.

1. Select the **cloud apm** option on the test builder sidebar to enable the integration for the test.

  ![Cloud APM - Datadog Test Builder UI](images/datadog-cloud-app-testbuilder.png)

### Configuration in the k6 script

If you script your k6 tests, you can also configure the Cloud APM settings using the `apm` option in the k6 script.

The parameters to export the k6 metrics to Datadog are as follows:

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 5b8da2dc (Linting autofixes)
              sourceMetric: 'http_reqs{status="500"}',
              targetMetric: 'k6.http_server_errors.count',
            },
          ],
<<<<<<< HEAD
=======
                sourceMetric: 'http_reqs{status="500"}',
                targetMetric: 'k6.http_server_errors.count',            
            }
          ], 
>>>>>>> e52edde8 (Change APM documentation to reflect code changes)
=======
>>>>>>> 5b8da2dc (Linting autofixes)
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
<<<<<<< HEAD
<<<<<<< HEAD
| apiKey<sup>(required)</sup>   | Datadog API key.                                                                                                                                                                                                                                              |
| appKey<sup>(required)</sup>   | Datadog application key.                                                                                                                                                                                                                                      |
| region                        | One of Datadog regions/sites. See the list of [supported regions](#supported-regions). Default is `us`.                                                                                                                                                       |
| apiURL                        | _Alternative to `region`._ URL of [Datadog Site API](https://docs.datadoghq.com/getting_started/site/). Included for support of possible new or custom Datadog regions. Default is picked according to `region`, e.g. `'https://api.datadoghq.com'` for `us`. |
| includeDefaultMetrics         | If `true`, add [default APM metrics](/cloud/integrations/cloud-apm/#default-apm-metrics) to export: `data_sent`, `data_received`, `http_req_duration`, `http_reqs`, `iterations`, and `vus`. Default is `true`.                                               |
| metrics                       | List of metrics to export. <br/> A subsequent section details how to specify metrics.                                                                                                                                                                         |
=======
| apiKey<sup>(required)</sup>   | DataDog API key.                                                                                                                                                                                                                                              |
| appKey<sup>(required)</sup>   | DataDog application key.                                                                                                                                                                                                                                      |
| region                        | One of DataDog regions/sites. See the list of [supported regions](#supported-regions). Default is `us`.                                                                                                                                                       |
| apiURL                        | _Alternative to `region`._ URL of [Datadog Site API](https://docs.datadoghq.com/getting_started/site/). Included for support of possible new or custom Datadog regions. Default is picked according to `region`, e.g. `'https://api.datadoghq.com'` for `us`. |
| includeDefaultMetrics         | If `true`, add [default APM metrics](/cloud/integrations/cloud-apm/#default-apm-metrics) to export: `data_sent`, `data_received`, `http_req_duration`, `http_reqs`, `iterations`, and `vus`. Default is `true`.                                               |
<<<<<<< HEAD
| metrics                       | List of metrics to export. <br/> For more details on how to specify metrics see below.                                                                                                                                                                        |
>>>>>>> e52edde8 (Change APM documentation to reflect code changes)
=======
| metrics                       | List of metrics to export. <br/> A subsequent section details how to specify metrics.                                                                                                                                                                        |
>>>>>>> 27bbb324 (removes directional language)
=======
| apiKey<sup>(required)</sup>   | Datadog API key.                                                                                                                                                                                                                                              |
| appKey<sup>(required)</sup>   | Datadog application key.                                                                                                                                                                                                                                      |
| region                        | One of Datadog regions/sites. See the list of [supported regions](#supported-regions). Default is `us`.                                                                                                                                                       |
| apiURL                        | _Alternative to `region`._ URL of [Datadog Site API](https://docs.datadoghq.com/getting_started/site/). Included for support of possible new or custom Datadog regions. Default is picked according to `region`, e.g. `'https://api.datadoghq.com'` for `us`. |
| includeDefaultMetrics         | If `true`, add [default APM metrics](/cloud/integrations/cloud-apm/#default-apm-metrics) to export: `data_sent`, `data_received`, `http_req_duration`, `http_reqs`, `iterations`, and `vus`. Default is `true`.                                               |
| metrics                       | List of metrics to export. <br/> A subsequent section details how to specify metrics.                                                                                                                                                                         |
>>>>>>> 8a67c7b5 (Fix prefix in Prometheus export, correct Datadog capitalization)
| includeTestRunId              | Whether all the exported metrics include a `test_run_id` tag whose value is the k6 Cloud test run id. Default is `false`. <br/> Be aware that enabling this setting might increase the cost of your APM provider.                                             |
| resampleRate                  | Sampling period for metrics in seconds. Default is 3 and supported values are integers between 1 and 60.                                                                                                                                                      |
#### Metric configuration

Each entry in `metrics` parameter can be an object with following keys:

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 05d67769 (Clarify and standardize targetMetric description)
| Name                              | Description                                                                                                                                                                                                                                                                                   |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sourceMetric<sup>(required)</sup> | Name of k6 builtin or custom metric to export, optionally with tag filters. <br/> Tag filtering follows [Prometheus selector syntax](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors),<br/> Example: `http_reqs{name="http://example.com",status!="500"}` |
| targetMetric                      | Name of resulting metric in Datadog. Default is the name of the source metric with a `k6.`  prefix <br/> Example: `k6.http_reqs`                                                                                                                                                              |
| keepTags                          | List of tags to preserve when exporting time series.                                                                                                                                                                                                                                          |
<<<<<<< HEAD

<Blockquote mod="warning" title="keepTags can have a high cost">

Most cloud platforms charge clients based on the number of time series stored.

When exporting a metric, every combination of kept-tag values becomes a distinct time series in Prometheus.
While this granularity can help test analysis, it will incur high costs with thousands of time series.

For example, if you add `keepTags: ["name"]` on `http_*` metrics, and your load test calls many dynamic URLs, the number of produced time series can build up very quickly.
Refer to [URL Grouping](/using-k6/http-requests#url-grouping) for how to reduce the value count for a `name` tag.

k6 recommends exporting only tags that are necessary and don't have many distinct values.

_Read more_: [Counting custom metrics](https://docs.datadoghq.com/account_management/billing/custom_metrics/?tab=countrate#counting-custom-metrics) in Datadog documentation

</Blockquote>


#### Metric configuration detailed example

=======
| Name                              | Description                                                                                                                                                                                                                                                                                       |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sourceMetric<sup>(required)</sup> | Name of k6 builtin or custom metric to export, optionally with tag filters. <br/> Tag filtering follows [Prometheus selector syntax](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors),<br/> for example: `http_reqs{name="http://example.com",status!="500"}` |
| targetMetric                      | Name of resulting metric in Datadog. If not specified, will use the name `k6.{sourceMetric}`.                                                                                                                                                                                                     |
| keepTags                          | List of tags to preserve when exporting time series.                                                                                                                                                                                                                                              |
=======
>>>>>>> 05d67769 (Clarify and standardize targetMetric description)

<Blockquote mod="warning" title="keepTags can have a high cost">

Most cloud platforms charge clients based on the number of time series stored.

When exporting a metric, every combination of kept-tag values becomes a distinct time series in Prometheus.
While this granularity can help test analysis, it will incur high costs with thousands of time series.

For example, if you add `keepTags: ["name"]` on `http_*` metrics, and your load test calls many dynamic URLs, the number of produced time series can build up very quickly.
Refer to [URL Grouping](/using-k6/http-requests#url-grouping) for how to reduce the value count for a `name` tag.

k6 recommends exporting only tags that are necessary and don't have many distinct values.

_Read more_: [Counting custom metrics](https://docs.datadoghq.com/account_management/billing/custom_metrics/?tab=countrate#counting-custom-metrics) in Datadog documentation

</Blockquote>


#### Metric configuration detailed example
<<<<<<< HEAD
>>>>>>> e52edde8 (Change APM documentation to reflect code changes)
=======

>>>>>>> 04ba7976 (Standardizes keepTags warning)
```javascript
export const options = {
  ext: {
    loadimpact: {
      apm: [
        {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
          // ...              
=======
          // ...
>>>>>>> 5b8da2dc (Linting autofixes)
          includeDefaultMetrics: false,
          includeTestRunId: true,

          metrics: [
<<<<<<< HEAD
              // keep vus metrics for whole test run
              'vus',
              // total byte count for data sent/received by k6
              'data_sent',
              'data_received',
                
              // export checks metric, keeping 'check' (name of the check) tag 
              {
                  sourceMetric: 'checks',
                  keepTags: ['check']
              },
              // export HTTP durations from 'default' scenario,
              // keeping only successful response codes (2xx, 3xx), using regex selector syntax  
              {                  
                  sourceMetric: 'http_req_duration{scenario="default",status=~"[23][0-9]{2}"}',
                  targetMetric: 'k6_http_request_duration',  // name of metric as it appears in Datadog 
                  keepTags: ['name', 'method', 'status']                  
              },
              
              // count HTTP responses with status 500
              {
                  sourceMetric: 'http_reqs{status="500"}',
                  targetMetric: 'k6_http_server_errors_count',
                  keepTags: ['scenario', 'group', 'name', 'method']
              }
          ], 
          
>>>>>>> e52edde8 (Change APM documentation to reflect code changes)
=======
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
>>>>>>> 5b8da2dc (Linting autofixes)
        },
      ],
    },
  },
};
```


## Read more

- [Cloud APM](/cloud/integrations/cloud-apm/)
