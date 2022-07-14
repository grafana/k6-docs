---
title: 'Prometheus Remote Write'
excerpt: 'How to export metrics from k6 Cloud to a Prometheus instance using the Prometheus Remote Write integration'
---

The Prometheus remote write integration allows to export metrics from k6 Cloud to a Prometheus instance: either self-hosted or provided by a vendor.

With the Prometheus integration, you can: 

- Store k6 metrics on your Prometheus instances.
- Run PromQL queries on k6 metrics.
- Correlate testing results with other system metrics collected with Prometheus.


We currently offer similar integrations with Cloud APM solutions: [Azure Monitor](/cloud/integrations/cloud-apm/azure-monitor/), [DataDog](/cloud/integrations/cloud-apm/datadog/), [Grafana Cloud](/cloud/integrations/cloud-apm/grafana-cloud/), and [New Relic](/cloud/integrations/cloud-apm/new-relic/). If you use any of these solutions, we recommend starting to integrate your APM solution first.




> ⭐️  &nbsp;Prometheus remote write and [Cloud APM](/cloud/integrations/cloud-apm/) integrations are available on Pro and Enterprise plans, as well as the annual Team plan and Trial.

## Configuration Parameters

Currently, you can only enable this integration using the `apm` option in the k6 script.

The `apm` option configures how to export k6 Cloud metrics to the supported monitoring solutions. It allows multiple configuration blocks to export simultaneously to different monitoring providers.

The parameters for sending metrics to a Prometheus Remote Write instance are as follows:


```javascript
export const options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: 'prometheus',
          remoteWriteURL: '<Remote Write URL>',
          // optional parameters
          credentials: {
            token: '<token>',
          },
          includeDefaultMetrics: true,
          metrics: ['http_req_sending', 'my_rate', 'my_gauge'], //...other options,
          includeTestRunId: false,
          resampleRate: 3,
        },
      ],
    },
  },
};
```


| Name                    | Description                                                                                                                                                                                                                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| provider<sup>(required)</sup>            | For this integration, the value must be `prometheus`.
| remoteWriteURL<sup>(required)</sup>        | URL of the Prometheus remote write endpoint. <br/> For example: `http://monitoring.example.com:9090/api/v1/write`.                                                                                                |
| credentials           | The `credentials` to authenticate with the Prometheus remote write instance. <br/> Read more on [supported authentication mechanisms](#supported-authentication-mechanisms). |
| includeDefaultMetrics | Whether it exports the [default APM metrics](/cloud/integrations/cloud-apm/#default-apm-metrics): `data_sent`, `data_received`, `http_req_duration`, `http_reqs`, `iterations`, and `vus`. Default is `true`. |
| metrics               | List of built-in and custom metrics to export. <br/> Metric names are validated against the [Prometheus metric name conventions](https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels)—ignoring nonconforming metrics.                                      |
| includeTestRunId      | Whether all the exported metrics include a `test_run_id` tag whose value is the k6 Cloud test run id. Default is `false`. <br/> Be aware that enabling this setting might increase the cost of your APM provider. |
| resampleRate          | The rate by which the metrics are resampled and sent to the APM provider in seconds. Default is 3 and acceptable values are integers between 1 and 10. |

### Supported authentication mechanisms

Currently, the integration only supports bearer token and HTTP basic authentication mechanisms. Set the `credentials` option to configure one of the supported authentication mechanisms as follows:

#### HTTP basic authentication

```json
credentials: {
  // The username in HTTP basic authentication
  username: "<username>",
  // The password in HTTP basic authentication
  password: "<password>"
}
```

#### Bearer token authentication
```json
credentials: {
  // The bearer token without the prefix/type
  token: "<token>"
}
```

## Run the cloud test

Once you have configured the `apm` settings in the k6 script, you can launch the cloud test from the [CLI](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/) or [Script Editor](/cloud/creating-and-running-a-test/script-editor/) as usual. 

When running the cloud test, k6 Cloud will export the metrics to the Prometheus endpoint almost real-time.

## Read more

- [Cloud APM](/cloud/integrations/cloud-apm/)
