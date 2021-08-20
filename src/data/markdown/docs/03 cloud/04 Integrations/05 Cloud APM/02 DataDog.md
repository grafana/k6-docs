---
title: 'DataDog'
head_title: 'Datadog integration with k6 Cloud'
excerpt: 'How to export metrics from k6 Cloud to DataDog'
---

You can set up DataDog integration via [k6 Cloud app](/cloud/integrations/cloud-apm/datadog#configuration-via-k6-cloud-app) or by specifying [required parameters](/cloud/integrations/cloud-apm/datadog#configuration-parameters) in `options.ext.loadimpact.apm` in your [script](/cloud/integrations/cloud-apm/datadog#example-configuration-object).

Follow [DataDog Setup](/cloud/integrations/cloud-apm/datadog#datadog-setup) to receive your `apiKey` and `appKey`.

## Configuration via k6 Cloud app

Locate the page in the left menu under the **Manage** section and select **DataDog**.

![Manage Menu UI](../images/05-Cloud-APM/cloud-app-manage-menu.png)

You will be greeted with the following form. For more information on input fields see [configuration parameters](/cloud/integrations/cloud-apm/datadog#configuration-parameters).

![Cloud APM - DataDog Form UI](images/datadog-cloud-app-form.png)

After you have saved your configuration you will be able to select it in [Test builder](/test-authoring/test-builder).

![Cloud APM - DataDog Test Builder UI](images/datadog-cloud-app-testbuilder.png)


## Configuration Parameters

The configuration parameters for sending metrics to DataDog and its EU counterpart are as follows:

| Name                    | Description                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `provider`              | Any APM provider name available in the [supported APM provider](/cloud/integrations/cloud-apm#supported-apm-providers)'s table.                        |
| `apiKey`                | The `apiKey` provided by DataDog.                                                                                                                      |
| `appKey`                | The `appKey` provided by DataDog.                                                                                                                      |
| `region`                | The `region` supported by DataDog. The [supported regions](#supported-regions) listed below can be used in Cloud APM. Default is `us`.                 |
| `metrics`               | List of built-in and custom metrics to be exported.                                                                                                    |
| `includeDefaultMetrics` | If set, the export will include the default metrics. Default is `true`.                                                                                |
| `resampleRate`          | The rate by which the metrics are resampled and sent to the APM provider in seconds. Default is 3 and acceptable values are integers between 1 and 10. |
| `includeTestRunId`      | If set, the `test_run_id` will be exported per each metric as an extra tag. Default is `false`.                                                        |

<Blockquote mod="warning">

As of Jan. 2021, all keys on the configuration parameters object are in camel case. So, please update your test run script(s). Also, the `datadogeu` provider is now set using `region` key.

</Blockquote>

The `metrics` parameter allows you to specify built-in and custom metrics to be exported to the APM provider. By default, only the basic [metrics](/using-k6/metrics) listed below are exported. These defaults also match the [official k6 dashboard for Datadog](https://docs.datadoghq.com/integrations/k6/), which you can read more about on [visualization of metrics in Datadog](/results-visualization/datadog#visualize-in-datadog).

- data_sent
- data_received
- http_req_duration
- http_reqs
- iterations
- vus

> #### 📖 Use case
>
> A typical use case is to only export custom metrics defined in the script. To do that you should specify the names of your custom metrics in the `metrics` parameter, and set `includeDefaultMetrics` to false.

If you want to export metrics with more granularity, consider using a lower number for the `resampleRate`, like 1.

The `apm` key (inside `ext.loadimpact`) accepts a list of APM configurations (objects). Exporting metrics to APM platforms will be simultaneous and near real-time. Also, there is a 2nd pass (of metrics exports), at the end of each test run, that ensures data reliability and accuracy. Please note that the data exported in real-time may appear incorrect until the test is finished.

## Example Configuration Object

All the above configuration parameters are passed like this in your test run.

```javascript
export let options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: "datadog",
          apiKey: "<Datadog Provided API key>",
          appKey: "<Datadog Provided App key>",
          metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
          includeDefaultMetrics: true,
          includeTestRunId: false
        },
      ]
    },
  },
};
```


## Supported Regions

These are the supported regions for DataDog integration:

| Geographic Region     | Supported DataDog Region(s) |
| --------------------- | --------------------------- |
| **Europe**            | `eu`                        |
| **Rest of the world** | `us` (default)              |

## DataDog Setup

This [guide](https://docs.datadoghq.com/account_management/api-app-keys/) will walk you through creating an `apiKey` and an `appKey` on Datadog. Note that the `apiKey` and `appKey` for different regions of `datadog` won't work on other regions.
