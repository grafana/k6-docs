---
title: 'Cloud to Prometheus RW'
slug: '/cloud/integrations/prometheus-remote-write/'
excerpt: 'How to export metrics from k6 Cloud to a Prometheus instance using the Prometheus remote-write integration'
---

<Blockquote mod="attention" title="">

This feature is being deprecated. If you're using [Grafana Cloud k6](https://grafana.com/products/cloud/k6/), we recommend using [Data source plugins for Grafana](https://grafana.com/grafana/plugins/data-source-plugins/) to visualize and correlate your Prometheus and k6 metrics.

</Blockquote>

With the Prometheus remote write integration, you can export metrics from k6 Cloud to a self-hosted or managed Prometheus instance.
If you want to export local results over the remote write protocol, refer to [Prometheus remote write](https://k6.io/docs/results-output/real-time/prometheus-remote-write/).

With the Prometheus integration, you can do the following:

- Store k6 metrics on your Prometheus instances.
- Run PromQL queries on k6 metrics.
- Correlate testing results with other system metrics collected with Prometheus.

k6 currently offers similar integrations with Cloud APM solutions: [Azure Monitor](/cloud/integrations/cloud-apm/azure-monitor/), [Datadog](/cloud/integrations/cloud-apm/datadog/), [Grafana Cloud](/cloud/integrations/cloud-apm/grafana-cloud/), and [New Relic](/cloud/integrations/cloud-apm/new-relic/).
If you use any of these solutions, we recommend integrating your APM solution first.

> ⭐️  &nbsp;Prometheus remote write and [Cloud APM](/cloud/integrations/cloud-apm/) integrations are available on Pro and Enterprise plans, as well as the annual Team plan and Trial.

## Configuration Parameters

You can enable this integration only with the `apm` option in the k6 script.

The `apm` option configures how to export k6 Cloud metrics to the supported monitoring solutions.
You can use multiple configuration blocks to export simultaneously to different monitoring providers.

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


| Name                                | Description                                                                                                                                                                                                       |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| provider<sup>(required)</sup>       | For this integration, the value must be `prometheus`.                                                                                                                                                             |
| remoteWriteURL<sup>(required)</sup> | URL of the Prometheus remote write endpoint. <br/> For example: `http://monitoring.example.com:9090/api/v1/write`.                                                                                                |
| credentials                         | The `credentials` to authenticate with the Prometheus remote write instance. <br/> Read more on [supported authentication mechanisms](#supported-authentication-mechanisms).                                      |
| includeDefaultMetrics               | Whether it exports the [default APM metrics](/cloud/integrations/cloud-apm/#default-apm-metrics): `data_sent`, `data_received`, `http_req_duration`, `http_reqs`, `iterations`, and `vus`. Default is `true`.     |
| metrics                             | List of metrics to export. <br/> For details on how to specify metrics, see the subsequent section.                                                                                                               |
| includeTestRunId                    | Whether all the exported metrics include a `test_run_id` tag whose value is the k6 Cloud test run id. Default is `false`. <br/> Be aware that enabling this setting might increase the cost of your APM provider. |
| resampleRate                        | The rate by which the metrics are resampled and sent to the APM provider in seconds. Default is 3 and acceptable values are integers between 1 and 10.                                                            |

#### Metric configuration

Each entry in `metrics` parameter can be an object with following keys:

| Name                              | Description                                                                                                                                                                                                                                                                                   |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sourceMetric<sup>(required)</sup> | Name of k6 builtin or custom metric to export, optionally with tag filters. <br/> Tag filtering follows [Prometheus selector syntax](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors),<br/> Example: `http_reqs{name="http://example.com",status!="500"}` |
| targetMetric                      | Name of resulting metric in Grafana/Prometheus. Default is the name of the source metric with a `k6_`  prefix <br/> Example: `k6_http_reqs`                                                                                                                                                   |
| keepTags                          | List of tags to preserve when exporting time series.                                                                                                                                                                                                                                          |


<Blockquote mod="warning" title="keepTags can have a high cost">

Most cloud platforms charge clients based on the number of time series stored.

When exporting a metric, every combination of kept-tag values becomes a distinct time series in Prometheus.
While this granularity can help test analysis, it will incur high costs with thousands of time series.

For example, if you add `keepTags: ["name"]` on `http_*` metrics, and your load test calls many dynamic URLs, the number of produced time series can build up very quickly.
Refer to [URL Grouping](/using-k6/http-requests#url-grouping) for how to reduce the value count for a `name` tag.

k6 recommends exporting only tags that are necessary and don't have many distinct values.

</Blockquote>

#### Metric configuration detailed example

```javascript
export const options = {
  ext: {
    loadimpact: {
      apm: [
        {
          // ...
          includeDefaultMetrics: false,
          includeTestRunId: true,

          metrics: [
            // keep vus metrics for whole test run
            'vus',
            // total byte count for data sent/received by k6
            'data_sent',
            'data_received',

            // export checks metric, keeping 'check' (name of the check) tag
            {
              sourceMetric: 'checks',
              keepTags: ['check'],
            },

            // export HTTP durations from 'default' scenario,
            // keeping only successful response codes (2xx, 3xx), using regex selector syntax
            {
              sourceMetric: 'http_req_duration{scenario="default",status=~"[23][0-9][0-9]"}',
              targetMetric: 'k6_http_request_duration', // name of metric as it appears in Prometheus
              keepTags: ['name', 'method', 'status'],
            },

            // count HTTP responses with status 500
            {
              sourceMetric: 'http_reqs{status="500"}',
              targetMetric: 'k6_http_server_errors_count',
              keepTags: ['scenario', 'group', 'name', 'method'],
            },
          ],
        },
      ],
    },
  },
};
```


### Supported authentication mechanisms

Currently, the integration supports only bearer token and HTTP basic authentication mechanisms.
To configure one of the supported auhentication methods, set the `credentials` option as follows.

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

When running the cloud test, k6 Cloud will export the metrics to the Prometheus endpoint with a slight delay.

## Read more

- [Cloud APM](/cloud/integrations/cloud-apm/)

