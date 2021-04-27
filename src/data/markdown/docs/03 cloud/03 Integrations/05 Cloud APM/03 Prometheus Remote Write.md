---
title: 'Prometheus Remote Write'
excerpt: 'How to export metrics from k6 Cloud to a Prometheus server using Remote Write'
---

## Configuration Parameters

The configuration parameters for sending metrics to Prometheus are as follows:

| Name                    | Description                                                                                                                                                                                                                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`              | Any APM provider name available in the [supported APM provider](/cloud/integrations/cloud-apm#supported-apm-providers)'s table.                                                                                                                                                               |
| `remoteWriteURL`        | The `remoteWriteURL` provided by your Prometheus Remote Write provider or the URL of your own self-hosted Prometheus instance, for example: `http://monitoring.example.com:9090/api/v1/write`.                                                                                                |
| `credentials`           | The `credentials` provided by your Prometheus Remote Write provider. Currently only bearer token and HTTP basic authentication mechanism are supported, as [listed](/cloud/integrations/cloud-apm/prometheus-remote-write#supported-authentication-mechanisms) below. This field is optional. |
| `metrics`               | List of built-in and custom metrics to be exported. Metric names will be validated against the Prometheus [metric name conventions](https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels) and non-conforming metrics will be ignored.                                      |
| `includeDefaultMetrics` | If set, the export will include the default metrics. Default is `true`.                                                                                                                                                                                                                       |
| `resampleRate`          | The rate by which the metrics are resampled and sent to the APM provider in seconds. Default is 3 and acceptable values are integers between 1 and 10.                                                                                                                                        |
| `includeTestRunId`      | If set, the `test_run_id` will be exported per each metric as an extra tag. Default is `false`.                                                                                                                                                                                               |

## Supported Authentication Mechanisms

Currently only bearer token and HTTP basic authentication mechanisms are supported. To configure your authentication mechanism, populate `credentials` with either of these configuration parameters:

### HTTP basic authentication

| Name       | Description                                |
| ---------- | ------------------------------------------ |
| `username` | The username in HTTP basic authentication. |
| `password` | The password in HTTP basic authentication. |

```javascript
credentials: {
    username: "<username>",
    password: "<password>"
}
```

### Bearer token authentication

| Name    | Description                               |
| ------- | ----------------------------------------- |
| `token` | The bearer token without the prefix/type. |

```javascript
credentials: {
    token: "<token>"
}
```

## Example Configuration Object

All the above configuration parameters are passed like this in your test run.

```javascript
export let options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: "prometheus",
          remoteWriteURL: "<Remote Write URL>", // This can include query-string parameters
          credentials: {
              token: "<token>" // Optional
          },
          metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
          includeDefaultMetrics: true,
          includeTestRunId: false
        },
      ]
    },
  },
};
```

## Prometheus Remote Write Setup on New Relic

For sending custom metrics from your test run to New Relic's Prometheus remote write integration, follow the [instructions](https://docs.newrelic.com/docs/integrations/prometheus-integrations/install-configure-remote-write/set-your-prometheus-remote-write-integration/) on their documentation.

The `prometheus_server` parameter should be included in the `remoteWriteURL` configuration parameter. The bearer token can be included either as `credentials.token` (APM configuration parameter) or as part of the `remoteWriteURL` using the `X-License-Key` parameter, as mentioned in their documentation.

So an example configuration for New Relic might look like this, if you use `X-License-Key` in your `remoteWriteURL`:

```javascript
export let options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: "prometheus",
          remoteWriteURL: "https://metric-api.newrelic.com/prometheus/v1/write?X-License-Key=<YOUR_LICENSE_KEY>&prometheus_server=<YOUR_DATA_SOURCE_NAME>",
          metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
          includeDefaultMetrics: true,
          includeTestRunId: false
        },
      ]
    },
  },
};
```

The `X-License-Key` can also be used as `credentials.token`, as shown below:

```javascript
export let options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: "prometheus",
          remoteWriteURL: "https://metric-api.newrelic.com/prometheus/v1/write?prometheus_server=<YOUR_DATA_SOURCE_NAME>",
          credentials: {
              token: "<YOUR_LICENSE_KEY>"
          },
          metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
          includeDefaultMetrics: true,
          includeTestRunId: false
        },
      ]
    },
  },
};
```
