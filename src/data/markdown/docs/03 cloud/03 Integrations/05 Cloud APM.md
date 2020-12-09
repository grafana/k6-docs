---
title: 'Cloud APM'
excerpt: 'How to export metrics from k6 Cloud to APM platforms'
---

k6 Cloud platform supports exporting metrics to APM platforms, thereby enabling users to export metrics from a running test in near real-time to their preferred [APM](https://en.wikipedia.org/wiki/Application_performance_management) platform(s).

## Supported APM Providers

Each supported APM platform is called a provider in Cloud APM. As you'll see in each platform's respective section, the provider is a key passed to the APM configuration object and its value should match the providers listed below. Also, each provider has a separate set of configuration parameters. Therefore you need to visit your provider's page:

| Provider               | Platform page                                                | Supported Regions                                                                        |
| ---------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `datadog`, `datadogeu` | [DataDog](/cloud/integrations/cloud-apm/datadog)             | Rest of the world, EU countries                                                          |
| `azuremonitor`         | [Azure Monitor](/cloud/integrations/cloud-apm/azure-monitor) | [Azure supported regions](/cloud/integrations/cloud-apm/azure-monitor#supported-regions) |

This list will be expanded in the future. Please [contact us](https://k6.io/contact) if you would like an integration that isn't currently listed.

## Configuration Parameters

For maximum flexibility, the APM export functionality is configured on the test-run level. The required parameters should be specified in `options.ext.loadimpact.apm` (See [extension options](/using-k6/options#extension-options) for more information).

Common configuration parameters for all providers are as follows:

```javascript
export let options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: "<first provider>",
          // provider-specific configurations
          metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
          includeDefaultMetrics: true,
          include_test_run_id: true
        },
        {
          provider: "<second provider>",
          // provider-specific configurations
          metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
          includeDefaultMetrics: true,
          include_test_run_id: true
        },
      ]
    },
  },
};
```

Here's what each key means:

1. `provider` is the name of the APM platform.
2. `// provider-specific configurations` is the respective configuration parameters for your APM provider, which are listed in their respective platform pages.
3. `metrics` is the array of custom metrics you want to export from your test run, if you want.
4. `includeDefaultMetrics` should be set if you want built-in metrics to be included in you export. Otherwise only the keys in `metrics` will be exported. This is enabled by default, which means the `metrics` key is populated with built-in metrics. Passing custom metrics to the `metrics` key and having `includeDefaultMetrics` key enabled makes the configuration object to combine built-in and custom metrics.
5. `include_test_run_id` should be set if you want to have test run ID as a tag/label in your metrics export. Because it increases the number of metrics recorded by each APM provider, hence increased costs, it is disabled (`false`) by default.

As you see in the configuration object above, there is an array containing two different objects under the `apm` key. This means that you can send metrics to multiple APM providers, provided that you have them enabled in your subscription. Please [contact us](https://k6.io/contact) if you want multiple providers to be able to your test run at the same time.

## Built-in Metrics

The following built-in metrics are enabled by default, and are exported to the APM platform of your choice. They can also be disabled by setting the `includeDefaultMetrics` key to `false`. If you disable default metrics, you will need to specify an array of metrics using the `metrics` key.

- data_sent
- data_received
- http_req_duration
- http_reqs
- iterations
- vus

## Requirements

Make sure to meet the following requirements, otherwise, we can't guarantee a working metrics export:

1. If you use custom metrics in your script, remember to add them to the `metrics` array, otherwise, those metrics won't be automatically exported.
2. If you want to export built-in metrics that are not listed above, you can include them in the `metrics` array.
3. If the APM configuration has errors, (e.g. invalid provider, wrong credentials, etc) the configuration will be ignored, and the test will be executed without the APM functionality.
4. If you provide invalid metrics to the `metrics` field, the test will continue, but the metrics export(s) will not include the invalid metric.
5. The metrics defined in `metrics` are case-sensitive.
6. Each APM provider gives you the ability to filter metrics based on `test_run_id`, but we don't export `test_run_id` as an extra tag by default. If you want to export it, you should set `include_test_run_id` to `true`.

## Limitations

1. APM data export is supported for tests that are up to 1 hour long. Longer tests are currently not supported.
2. The data exported in near real-time may appear incorrect until the test is finished and the 2nd pass export has completed.

## Feature Availability

This feature is only available for certain subscriptions:

- Trial
- Monthly Pro
- Annual Team/Pro
- Enterprise
