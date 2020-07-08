---
title: 'Cloud APM'
excerpt: 'How to export metrics from k6 Cloud to APM platforms'
---

A new feature has been recently added to the k6 Cloud service, for users to be able to export metrics from a running test on k6 Cloud in near real-time to their preferred [APM](https://en.wikipedia.org/wiki/Application_performance_management) platform(s).

## Supported APM Providers

Currently, the following platforms are supported:

| Provider  | URL(s)                      |
| --------- | --------------------------- |
| DataDog   | <https://www.datadoghq.com> |
| DataDogEU | <https://www.datadoghq.eu>  |

## Cloud APM Configuration

For configuring each platform on your load test on k6 Cloud, you should add your desired APM configuration to the [extension options](/using-k6/options#extension-options) section of your load test script. The configuration parameters are as follows:

| Name                     | Description                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`               | Any APM provider name available in the [supported APM provider](#supported-apm-providers)'s table.                                    |
| `api_key`                | The `api_key` provided by the APM platforms.                                                                                          |
| `app_key`                | The `app_key` provided by the APM platforms, if applicable.                                                                           |
| `export_metrics`         | List of custom metrics to be exported.                                                                                                |
| `export_default_metrics` | If set, the export will include the default metrics. Default is `true`.                                                               |
| `resample_rate`          | The rate by which the metrics are resampled and sent to the server. Default is 3 and acceptable values are integers between 1 and 10. |

**Note**: This [guide](https://docs.datadoghq.com/account_management/api-app-keys/) will walk you through creating an `api_key` and an `app_key` on DataDog. Note that the `api_key` and `app_key` for `DataDog` won't work on `DataDogEU`.

The `export_metrics` parameter allows for choosing custom exported metrics. The default set of [metrics](/using-k6/metrics) is as follows. These defaults also match the official k6 Dashboard for DataDog, which you can read more about on [visualization of metrics in DataDog](/results-visualization/datadog#visualize-in-datadog).

- k6.data_sent
- k6.data_received
- k6.http_req_duration
- k6.http_reqs
- k6.iterations
- k6.vus

<div class="doc-blockquote" data-props='{"mod": "warning"}'>

If you only want to export custom metrics from your test, you can add those custom metrics you've defined in your script to the `export_metrics` variable and set `export_default_metrics` to `false`. Otherwise, the above mentioned default metrics will be automatically exported.

</div>

If you want to export metrics with more granularity, consider using a lower number for the `resample_rate`, like 1.

The `apm` key (inside `ext.loadimpact`) accepts a list of APM configurations (objects). Exporting metrics to APM platforms will be simultaneous and near real-time. Also, there is a 2nd pass (of metrics exports), at the end of each test run, that ensures data reliability and accuracy.

```js
export let options = {
  ext: {
    loadimpact: {
      apm: [
          {
              provider: "DataDog",
              api_key: "<DataDog Provided API key>",
              app_key: "<DataDog Provided App key>",
              export_metrics: ["k6.vus", "my_rate", ...],
              export_default_metrics: true
          },
      ]
    },
  },
};
```

Make sure to meet the following requirements, otherwise we can't guarantee a working metrics export:

1. You can specify your own custom metrics (defined in your script) to be exported to one or many APM platform(s).
2. If the APM configuration has errors, e.g. invalid provider, wrong credentials, etc., the test will continue, but the metrics export(s) will be disabled.
3. If you provide invalid custom metrics to the `export_metrics` field, the test will continue, but the metrics export(s) will not include the invalid custom metric.
4. The `provider` (name) and metrics defined in `export_metrics` are case-sensitive.

## Feature Availability

This feature is only available for certain subscriptions:

- Trial
- Monthly Pro
- Annual Team/Pro
- Enterprise
