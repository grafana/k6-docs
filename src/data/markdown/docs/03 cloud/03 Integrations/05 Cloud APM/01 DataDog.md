---
title: 'DataDog'
excerpt: 'How to export metrics from k6 Cloud to DataDog'
---

## Configuration Parameters

The configuration parameters for sending metrics to DataDog and its EU counterpart are as follows:

| Name                      | Description                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `provider`                | Any APM provider name available in the [supported APM provider](/cloud/integrations/cloud-apm#supported-apm-providers)'s table.                        |
| `api_key`                 | The `api_key` provided by the APM platforms.                                                                                                           |
| `app_key`                 | The `app_key` provided by the APM platforms, if applicable.                                                                                            |
| `metrics`                 | List of built-in and custom metrics to be exported.                                                                                                    |
| `include_default_metrics` | If set, the export will include the default metrics. Default is `true`.                                                                                |
| `resample_rate`           | The rate by which the metrics are resampled and sent to the APM provider in seconds. Default is 3 and acceptable values are integers between 1 and 10. |
| `include_test_run_id`     | If set, the `test_run_id` will be exported per each metric as an extra tag. Default is `false`.                                                        |


The `metrics` parameter allows you to specify built-in and custom metrics to be exported to the APM provider. By default, only the basic [metrics](/using-k6/metrics) listed below are exported. These defaults also match the [official k6 dashboard for Datadog](https://docs.datadoghq.com/integrations/k6/), which you can read more about on [visualization of metrics in Datadog](/results-visualization/datadog#visualize-in-datadog).

- data_sent
- data_received
- http_req_duration
- http_reqs
- iterations
- vus

> A typical use case is to only export custom metrics defined in the script. To do that you should specify the names of your custom metrics in the `metrics` parameter, and set `include_default_metrics` to false.

If you want to export metrics with more granularity, consider using a lower number for the `resample_rate`, like 1.

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
              api_key: "<Datadog Provided API key>",
              app_key: "<Datadog Provided App key>",
              metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
              include_default_metrics: true,
              include_test_run_id: false
          },
      ]
    },
  },
};
```

## Best Practices

Make sure to meet the following requirements, otherwise, we can't guarantee a working metrics export:

1. If you use custom metrics in your script, remember to add them to the `metrics` array, otherwise, those metrics won't be automatically exported.
2. If you want to export built-in metrics that are not listed above, you can include them in the `metrics` array.
3. If the APM configuration has errors, (e.g. invalid provider, wrong credentials, etc) the configuration will be ignored, and the test will be executed without the APM functionality.
4. If you provide invalid metrics to the `metrics` field, the test will continue, but the metrics export(s) will not include the invalid metric.
5. The metrics defined in `metrics` are case-sensitive.
6. The [official k6 dashboard on Datadog](https://docs.datadoghq.com/integrations/k6/) gives you the ability to filter metrics based on `test_run_id`, but we don't export `test_run_id` as an extra tag by default. If you want to export it, you should set `include_test_run_id` to `true`.

## DataDog Configuration

This [guide](https://docs.datadoghq.com/account_management/api-app-keys/) will walk you through creating an `api_key` and an `app_key` on Datadog. Note that the `api_key` and `app_key` for `datadog` won't work on `datadogeu`.
