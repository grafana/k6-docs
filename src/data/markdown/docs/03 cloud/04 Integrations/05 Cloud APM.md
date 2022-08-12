---
title: 'Cloud APM'
excerpt: 'How to export metrics from k6 Cloud to APM platforms'
---

Cloud tests can export their metrics in near real-time to application performance monitoring (APM) platforms.
By combining k6 Cloud with an APM, you can correlate and query testing metrics with other system metrics.

<Glossary>

- [Grafana Cloud](/cloud/integrations/cloud-apm/grafana-cloud)
- [Azure Monitor](/cloud/integrations/cloud-apm/azure-monitor)
- [Datadog](/cloud/integrations/cloud-apm/datadog)
- [New Relic](/cloud/integrations/cloud-apm/new-relic)
- [Prometheus](/cloud/integrations/prometheus-remote-write/)

</Glossary>


> ⭐️ &nbsp;Cloud APM integrations are available on Pro and Enterprise plans, as well as the annual
> Team plan and Trial.

## Configure APM export on the test level

Each test has to set up its APM settings to export the metrics of its run.
Some ways you can customize export to your use case:

- Configure a test to export to multiple different APM providers.
- Configure the APM settings using the k6 Cloud app and test builder or scripting the k6 test.

For details, refer to the instructions on integrating different APM platforms:

- [Grafana Cloud](/cloud/integrations/cloud-apm/grafana-cloud)
- [Azure Monitor](/cloud/integrations/cloud-apm/azure-monitor)
- [Datadog](/cloud/integrations/cloud-apm/datadog)
- [New Relic](/cloud/integrations/cloud-apm/new-relic).
- [Prometheus](/cloud/integrations/prometheus-remote-write/)

## Default APM Metrics

By default, the APM integrations export only the default APM metrics, a subset of all k6 metrics.

The `includeDefaultMetrics` option in the k6 script controls whether to export the default APM
metrics or not. The default APM metrics are:

| Metric Name       | Type    | Description                                                                    |
|-------------------|---------|--------------------------------------------------------------------------------|
| vus               | Gauge   | Current number of active virtual users                                         |
| iterations        | Counter | The aggregate number of times the VUs in the test have executed the JS script. |
| data_received     | Counter | The amount of received data.                                                   |
| data_sent         | Counter | The amount of data sent.                                                       |
| http_reqs         | Counter | How many HTTP requests has k6 generated, in total.                             |
| http_req_duration | Trend   | HTTP request execution time.                                                   |


If you're unfamiliar with the different types of k6 metrics, refer to the [Metrics reference](/using-k6/metrics/).

> By default, k6 limits export to only these metrics to avoid unexpected costs with your APM provider.
> APM providers charge based on the number of stored metrics, and a load test can generate a massive volume of metrics.

To select the metrics to export, use the `metrics` option.
In the k6 script, you can set both options - `includeDefaultMetrics` and `metrics` - as follows:

```javascript
export const options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: 'your-provider',

          // Whether it exports the default APM metrics. Default is true.
          includeDefaultMetrics: false,
          // List of built-in and custom metrics to export. Default is empty.
          metrics: ['vus', 'http_req_duration', 'http_req_sending', 'my_rate', 'my_gauge'], //...
          //....
        },
      ],
    },
  },
};
```
 
