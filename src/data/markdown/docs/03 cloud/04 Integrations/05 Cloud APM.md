---
title: 'Cloud APM'
excerpt: 'How to export metrics from k6 Cloud to APM platforms'
---

Cloud tests can export their metrics in near real-time to various APM platforms, allowing you to correlate and query testing metrics with other system metrics on your APM of choice:

<Glossary>

- [Azure Monitor](/cloud/integrations/cloud-apm/azure-monitor)
- [DataDog](/cloud/integrations/cloud-apm/datadog)
- [Grafana Cloud](/cloud/integrations/cloud-apm/grafana-cloud)
- [New Relic](/cloud/integrations/cloud-apm/new-relic)

</Glossary>


_Additionally, k6 Cloud supports exporting metrics to [Prometheus](/cloud/integrations/prometheus-remote-write/) instances using the remote write feature._ 


> ⭐️ &nbsp;APM integrations are available on Pro and Enterprise plans, as well as the annual Team plan and Trial.

## Configuration

The APM export functionality is configured on the test level; each test has to set up its APM settings to export the metrics of their test runs. 

- You can configure a test to export to multiple different APM providers.
- You can configure the APM settings in the **Test builder** or **k6 Script**.

For more detailed instructions, refer to the documentation of your APM: [Azure Monitor](/cloud/integrations/cloud-apm/azure-monitor), [DataDog](/cloud/integrations/cloud-apm/datadog), [Grafana Cloud](/cloud/integrations/cloud-apm/grafana-cloud), or [New Relic](/cloud/integrations/cloud-apm/new-relic).


## Default APM Metrics

By default, the APM integrations only export a subset of k6 metrics - the default APM metrics. 

The `includeDefaultMetrics` option in the k6 script controls whether to export the default APM metrics or not. The default APM metrics are:

| Metric Name          | Type    | Description                                                                                                                                                                                                     |
| -------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| vus                | Gauge   | Current number of active virtual users                                       |
| iterations         | Counter | The aggregate number of times the VUs in the test have executed the JS script. |
| data_received      | Counter | The amount of received data.                                                                   |
| data_sent          | Counter | The amount of data sent.                                                                       |
| http_reqs                | Counter | How many HTTP requests has k6 generated, in total.                 |
| http_req_duration        | Trend   | Total time for the request.  `float` |


If you are not familiar with the different types of k6 metrics, we recommend reading the [Metrics page](/using-k6/metrics/).

> By default, the integration only send these metrics to avoid unexpected costs with your APM provider. APM providers charges based on the number of stored metrics, and a load test can generate a massive amount of metrics. 

If you need to select the metrics to export, use the `metrics` option.  In the k6 script, you can set both options - `includeDefaultMetrics` and `metrics` - as follows:

```javascript
export let options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: "your-provider",

          // Whether it exports the default APM metrics. Default is true.
          includeDefaultMetrics: false,
          // List of built-in and custom metrics to export. Default is empty.
          metrics: ["vus", "http_req_duration", "http_req_sending", "my_rate", "my_gauge", ...],
          //....
        },
      ]
    },
  },
};
```

## Considerations

- APM data export is supported for tests that are up to 1 hour long (3600 seconds plus 30 seconds of `gracefulStop`). Longer tests are currently not supported.
- If the APM configuration has errors, (e.g. invalid provider, wrong credentials, etc) the configuration will be ignored, and the test will be executed without the APM functionality.
- The data exported in near real-time may appear incorrect until the test is finished and the 2nd pass export has completed. The Prometheus Remote Write integration doesn't have a 2nd pass export.
- Duplicate APM configuration parameters of the same provider is not allowed. For example, you cannot export metrics to two Prometheus Remote Write servers at the same time. This also applies to the other providers.

