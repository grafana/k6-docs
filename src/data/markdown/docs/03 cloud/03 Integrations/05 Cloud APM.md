---
title: 'Cloud APM'
excerpt: 'How to export metrics from k6 Cloud to APM platforms'
---

k6 Cloud platform supports exporting metrics to APM platforms, thereby enabling users to export metrics from a running test in near real-time to their preferred [APM](https://en.wikipedia.org/wiki/Application_performance_management) platform(s).

## Supported APM Providers

Each supported APM platform is called a provider in Cloud APM. As you'll see in each platform's respective section, the provider is a key passed to the APM configuration object and its value should match the providers listed below:

| Provider     | URL(s)                                                                         | Supported Regions                                                                |
| ------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| datadog      | [DataDog](https://www.datadoghq.com)                                           | Non-EU countries                                                                 |
| datadogeu    | [DataDog EU](https://www.datadoghq.eu)                                         | EU countries                                                                     |
| azuremonitor | [Microsoft Azure Monitor](https://azure.microsoft.com/en-us/services/monitor/) | [Azure supported regions](/cloud/integrations/cloud-apm/microsoft-azure-monitor) |

This list will be expanded in the future. Please [contact us](https://k6.io/contact) if you would like an integration that isn't currently listed.

## Cloud APM Configuration

For maximum flexibility, the APM export functionality is configured on the test-run level. The required parameters should be specified in `options.ext.loadimpact.apm` (See [extension options](/using-k6/options#extension-options) for more information).

Each provider has a separate set of configuration parameters. Therefore you need to visit your desired provider's page:

| Providers          | Platform page                                                                    |
| ------------------ | -------------------------------------------------------------------------------- |
| datadog, datadogeu | [DataDog](/cloud/integrations/cloud-apm/datadog)                                 |
| azuremonitor       | [Microsoft Azure Monitor](/cloud/integrations/cloud-apm/microsoft-azure-monitor) |

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
              include_default_metrics: true,
              include_test_run_id: true
          },
          {
              provider: "<second provider>",
              // provider-specific configurations
              metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
              include_default_metrics: true,
              include_test_run_id: true
          },
      ]
    },
  },
};
```

Here's what each key means:

1. `provider` is the name of the APM platform.
2. `// provider-specific configurations` is the respective configuration parameters for your APM provider, which are listed above.
3. `metrics` is the array of custom metrics you want to export from your test run, if you want.
4. `include_default_metrics` should be set if you want built-in metrics to be included in you export. Otherwise only the keys in `metrics` will be exported. This is enabled by default, which means the `metrics` key is populated with built-in metrics. Passing custom metrics to the `metrics` key and having `include_default_metrics` key enabled makes the configuration object to combine built-in and custom metrics.
5. `include_test_run_id` should be set if you want to have test run ID as a tag/label in your metrics export. Because it increases the number of metrics recorded by each APM provider, hence increased costs, it is disabled (`false`) by default.

As you see in the configuration object above, there is an array containing two different objects under the `apm` key. This means that you can send metrics to multiple APM providers, provided that you have them enabled in your subscription. Please [contact us](https://k6.io/contact) if you want multiple providers to be able to your test run at the same time.

## Built-in Metrics

The following built-in metrics are enabled by default, and are exported to the APM platform of your choice. They can also be disabled by setting the `include_default_metrics` key to `false`. If you disable default metrics, you will need to specify an array of metrics using the `metrics` key.

- data_sent
- data_received
- http_req_duration
- http_reqs
- iterations
- vus

## Limitations

1. APM data export is supported for tests that are up to 1 hour long. Longer tests are currently not supported.
2. The data exported in near real-time may appear incorrect until the test is finished and the 2nd pass export has completed.

## Feature Availability

This feature is only available for certain subscriptions:

- Trial
- Monthly Pro
- Annual Team/Pro
- Enterprise
