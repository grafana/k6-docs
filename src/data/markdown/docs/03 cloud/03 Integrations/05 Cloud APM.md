---
title: 'Cloud APM'
excerpt: 'How to export metrics from k6 Cloud to APM platforms'
---

k6 Cloud platform supports exporting metrics to APM platforms, thereby enabling users to export metrics from a running test in near real-time to their preferred [APM](https://en.wikipedia.org/wiki/Application_performance_management) platform(s).

## Supported APM Providers

Currently, the following platforms are supported:

| Provider  | URL(s)                      |
| --------- | --------------------------- |
| datadog   | <https://www.datadoghq.com> |
| datadogeu | <https://www.datadoghq.eu>  |

This list will be expanded in the future. Please [contact us](https://io/contact) if you would like an integration that isn't currently listed.

## Cloud APM Configuration

For maximum flexibility, the APM export functionality is configured on the test-run level. The required parameters should be specified in `options.ext.loadimpact.apm` (See [extension options](/using-k6/options#extension-options) for more information). The configuration parameters are as follows:

| Name                      | Description                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `provider`                | Any APM provider name available in the [supported APM provider](#supported-apm-providers)'s table.                                                     |
| `api_key`                 | The `api_key` provided by the APM platforms.                                                                                                           |
| `app_key`                 | The `app_key` provided by the APM platforms, if applicable.                                                                                            |
| `metrics`                 | List of built-in and custom metrics to be exported.                                                                                                    |
| `include_default_metrics` | If set, the export will include the default metrics. Default is `true`.                                                                                |
| `resample_rate`           | The rate by which the metrics are resampled and sent to the APM provider in seconds. Default is 3 and acceptable values are integers between 1 and 10. |

**Note**: This [guide](https://docs.datadoghq.com/account_management/api-app-keys/) will walk you through creating an `api_key` and an `app_key` on DataDog. Note that the `api_key` and `app_key` for `datadog` won't work on `datadogeu`.

The `metrics` parameter allows you to specify built-in and custom metrics to be exported to the APM provider. By default, only the basic [metrics](/using-k6/metrics) listed below are exported. These defaults also match the official k6 Dashboard for DataDog, which you can read more about on [visualization of metrics in DataDog](/results-visualization/datadog#visualize-in-datadog).

- data_sent
- data_received
- http_req_duration
- http_reqs
- iterations
- vus

<div class="doc-blockquote" data-props='{"mod": "warning"}'>

A typical use case is to only export custom metrics defined in the script. To do that you should specify the named of your custom metrics in the `metrics` parameter, and set `include_default_metrics` to false.

</div>

If you want to export metrics with more granularity, consider using a lower number for the `resample_rate`, like 1.

The `apm` key (inside `ext.loadimpact`) accepts a list of APM configurations (objects). Exporting metrics to APM platforms will be simultaneous and near real-time. Also, there is a 2nd pass (of metrics exports), at the end of each test run, that ensures data reliability and accuracy. Please note that the data exported in real-time may appear incorrect until the test is finished.

```js
export let options = {
  ext: {
    loadimpact: {
      apm: [
          {
              provider: "datadog",
              api_key: "<DataDog Provided API key>",
              app_key: "<DataDog Provided App key>",
              metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
              include_default_metrics: true
          },
      ]
    },
  },
};
```

Make sure to meet the following requirements, otherwise we can't guarantee a working metrics export:

1. If you use custom metrics in your script, remember to add them to the `metrics` array, otherwise, those metrics won't be automatically exported.
2. If you want to export built-in metrics that are not listed above, you can include them in the `metrics` array.
3. If the APM configuration has errors, (e.g. invalid provider, wrong credentials, etc) the configuration will be ignored, and the test will be executed without the APM functionality.
4. If you provide invalid metrics to the `metrics` field, the test will continue, but the metrics export(s) will not include the invalid metric.
5. The metrics defined in `metrics` are case-sensitive.

## Limitations

1. APM data export is supported for tests that are up to 1 hour long. Longer tests are currently not supported.
2. The data exported in near real-time may appear incorrect, until the test is finished and the 2nd pass export has completed.

## Feature Availability

This feature is only available for certain subscriptions:

- Trial
- Monthly Pro
- Annual Team/Pro
- Enterprise
