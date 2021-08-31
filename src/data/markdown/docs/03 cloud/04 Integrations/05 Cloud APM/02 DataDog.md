---
title: 'DataDog'
head_title: 'Datadog integration with k6 Cloud'
excerpt: 'How to export metrics from k6 Cloud to DataDog'
---

With this integration, you can export test result metrics from the k6 Cloud to [DataDog](https://www.datadoghq.com/). That allows querying, visualizing and correlating k6 metrics with other monitored metrics in Datadog. 

> ⭐️  &nbsp;[Cloud APM](/cloud/integrations/cloud-apm/) integrations are available on Pro and Enterprise plans, as well as the annual Team plan and Trial.


## DataDog settings

To set up the integration on the k6 Cloud, you need the following DataDog settings:

- API key
- Application key

Follow this [guide](https://docs.datadoghq.com/account_management/api-app-keys/) to get your API and application keys.  

### Supported Regions

The supported regions for the DataDog integration are:

- `eu`: Europe.
- `us`: rest of the world (default).

> API and Application keys for a DataDog region won't work on a different region.

## k6 Cloud test configuration

You have to enable the DataDog integration for each test that you want to export its test result metrics.

Once you have set up the DataDog settings in the test, you can run a cloud test as usual. When running the cloud test, the k6 Cloud will continuously send the test results metrics to DataDog.

Currently, there are two options to set up the Cloud APM settings in the test:

- [Using the test builder](#configuration-using-the-test-builder)
- [Scripting the k6 test](#configuration-in-the-k6-script)  

### Configuration using the test builder

First, you have to enable the DataDog integration into your organization. Click the `Cloud APM` option on the left sidebar menu under the `Manage` section, and select `DataDog` from the list.

![Cloud APM - DataDog Form UI](images/datadog-cloud-app-form.png)

In this form, set the API and application keys that you copied previously from DataDog.  For more information on the other input fields, see [configuration parameters](#configuration-parameters).

Save the DataDog configuration for the current organization. 

Now, you can use the [test builder](/test-authoring/test-builder) to enable the integration for a new or existing test on the organization.

![Cloud APM - DataDog Test Builder UI](images/datadog-cloud-app-testbuilder.png)

### Configuration in the k6 script

If you script your k6 tests, you can also configure the Cloud APM settings using the `apm` option in the k6 script. 

The parameters to export the k6 metrics to DataDog are as follows:

```javascript
export let options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: "datadog",
          apiKey: "<Datadog Provided API key>",
          appKey: "<Datadog Provided App key>",

          // optional parameters
          region: 'us',

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

## See also

- [Cloud APM](/cloud/integrations/cloud-apm/)