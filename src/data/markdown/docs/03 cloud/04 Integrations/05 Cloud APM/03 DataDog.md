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

The supported regions for the DataDog integration are:

- `eu`: Europe.
- `us`: rest of the world (default).

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

| Name                    | Description                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| provider<sup>(required)</sup>              | For this integration, the value must be `datadog`.   |
| apiKey<sup>(required)</sup>                | DataDog API key.                         |
| appKey<sup>(required)</sup>                | DataDog application key.                 |
| region                | The `region` supported by DataDog. See the list of [supported regions](#supported-regions). Default is `us`.                 |
| includeDefaultMetrics | Whether it exports the [default APM metrics](/cloud/integrations/cloud-apm/#default-apm-metrics): `data_sent`, `data_received`, `http_req_duration`, `http_reqs`, `iterations`, and `vus`. Default is `true`. |
| metrics               | List of built-in and custom metrics to export.    |
| includeTestRunId      | Whether all the exported metrics include a `test_run_id` tag whose value is the k6 Cloud test run id. Default is `false`. <br/> Be aware that enabling this setting might increase the cost of your APM provider. |
| resampleRate          | The rate by which the metrics are resampled and sent to the APM provider in seconds. Default is 3 and acceptable values are integers between 1 and 10. |

## Read more

- [Cloud APM](/cloud/integrations/cloud-apm/)
