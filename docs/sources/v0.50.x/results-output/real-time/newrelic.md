---
title: 'New Relic'
description: 'You can send k6 output to New Relic. With this integration visualize load test results and correlate them your New Relic telemetry data, create and share reports, and alert on k6 telemetry.'
weight: 00
slug: 'new-relic'
---

# New Relic

{{% admonition type="warning" %}}

The built-in StatsD output has been deprecated on k6 v0.47.0. You can continue to use this feature by using the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd), and this guide has been updated to include instructions for how to use it.

For more information on the reason behind this change, you can follow [this issue](https://github.com/grafana/k6/issues/2982) in the k6 repository.

{{% /admonition %}}

k6 can send telemetry data to [New Relic](https://newrelic.com/) through the New Relic [StatsD integration](https://docs.newrelic.com/docs/integrations/host-integrations/host-integrations-list/statsd-monitoring-integration-version-2). Within New Relic you can find your k6 performance data alongside your real users data and server side performance. This data can be visualized in dashboards and shared with others, used to compare load impact with system performance, and alert on metrics too.

This guide covers running the New Relic integration:

- Run the New Relic StatsD integration
- Run the k6 test
- Visualize k6 telemetry in New Relic

## Before you begin

To use the StatsD output option, you have to build a k6 binary using the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd). For more details, refer to [StatsD](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/statsd).

## Run the New Relic StatsD integration

To get k6 metrics into New Relic, k6 sends metrics to the New Relic StatsD integration which will take care of collecting, aggregate, format and send the telemetry to the New Relic Telemetry Data Platform. You can run this with or without a New Relic agent.

Run the New Relic integration as a Docker container with this command:

{{< code >}}

```bash
docker run --rm \
  -d --restart unless-stopped \
  --name newrelic-statsd \
  -h $(hostname) \
  -e NR_ACCOUNT_ID=<NR-ACCOUNT-ID> \
  -e NR_API_KEY="<NR-INSERT-API-KEY>" \
  -p 8125:8125/udp \
  newrelic/nri-statsd:latest
```

{{< /code >}}

Replace `<NR-ACCOUNT-ID>` with your [New Relic Account ID](https://docs.newrelic.com/docs/accounts/accounts-billing/account-setup/account-id#:~:text=If%20you%20have%20a%20single,account%20ID%20is%20displayed%20there.) and `<NR-INSERT-API-KEY>` with your [New Relic Insert API Key](https://docs.newrelic.com/docs/insights/insights-data-sources/custom-data/introduction-event-api#register).

If your account is hosted in the New Relic EU region, then also add this to the above command: `-e NR_EU_REGION=true \`

The _required_ environment variables used in the above command are:

| Name            | Value                                                                                                                                                                                                                                                       |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NR_ACCOUNT_ID` | The Account ID used in New Relic You can find your account ID [here](https://docs.newrelic.com/docs/accounts/accounts-billing/account-setup/account-id#:~:text=If%20you%20have%20a%20single,account%20ID%20is%20displayed%20there.).                        |
| `NR_API_KEY`    | The Insert API Key for your New Relic account to send k6 telemetry to the account ID specified above. You can generate an Insert API key [here](https://docs.newrelic.com/docs/insights/insights-data-sources/custom-data/introduction-event-api#register). |

_Optional_ environment variables you can use:

| Name             | Value                                                                                                                                                                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NR_EU_REGION`   | Setting this to `true` tells the integration your account is housed in the New Relic EU region.                                                                                                                                                                       |
| `TAGS`           | Setting tags in key:value format separated by a space lets you further understand your data in New Relic. For example identifying different test runs or machines running the tests. In the docker command add: `-e TAGS="k6Test:myExampleTest someKey:someValue" \`. |
| `NR_LOG_METRICS` | Setting this to `true` activates verbose logging for the integration.                                                                                                                                                                                                 |

### About the New Relic integration

The New Relic StatsD integration installed above can run standalone. Installing a New Relic agent is optional.

Everything provided in the command above is enough to send k6 performance metrics to New Relic. You can optionally however [add further configuration](https://docs.newrelic.com/docs/integrations/host-integrations/host-integrations-list/statsd-monitoring-integration-version-2#configure), [further define metrics and their formats](https://docs.newrelic.com/docs/integrations/host-integrations/host-integrations-list/statsd-monitoring-integration-version-2#metric-format) (you can however do this on the New Relic side configuration), [add custom tags](https://docs.newrelic.com/docs/integrations/host-integrations/host-integrations-list/statsd-monitoring-integration-version-2#add-tags), and [create alerts](https://docs.newrelic.com/docs/integrations/host-integrations/host-integrations-list/statsd-monitoring-integration-version-2#alerts). This is covered in the optional table below.

## Run the k6 test

Once the integration is running, run the k6 test and send the metrics to the integration with:

{{< code >}}

```bash
$ K6_STATSD_ENABLE_TAGS=true k6 run --out output-statsd script.js
```

{{< /code >}}

Make sure you're using the k6 binary you built with the xk6-output-statsd extension.

You can look at the [StatsD](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/statsd) output page for configuration options.

## Visualisation in New Relic

As your k6 test is running, k6 is sending performance metrics to the New Relic StatsD integration which in turn is sending these metrics to the New Relic Telemetry Data Platform. These will be prefixed with `k6.` so you can identify them.

![k6 metrics as seen in the New Relic data explorer](/media/docs/k6-oss/new-relic-data-explorer.png)

You can visualize the metrics sent from this integration in the [data explorer](https://docs.newrelic.com/docs/insights/use-insights-ui/explore-data/metric-explorer-search-chart-metrics-sent-new-relic-agents) in the top right of New Relic (_query your data_).

![Sample New Relic k6 dashboard](/media/docs/k6-oss/new-relic-dashboard.png)

You can also add these metrics to [dashboards](https://docs.newrelic.com/docs/query-your-data/explore-query-data/dashboards/introduction-new-relic-one-dashboards) and [alert on k6 metrics](https://docs.newrelic.com/docs/alerts-applied-intelligence/new-relic-alerts/alert-conditions/create-nrql-alert-conditions).

### Example NRQL Queries

{{% admonition type="note" %}}

New Relic doesn't support calculating percentiles from metric data, which is the data format sent by this k6 output. See [this New Relic forum post](https://discuss.newrelic.com/t/percentiles-of-values-from-metrics-api-with-nrql-not-working/95832) and [the documentation about the metric data type](https://docs.newrelic.com/docs/data-apis/understand-data/metric-data/query-metric-data-type/) for details.

{{% /admonition %}}

Here are some example NRQL queries you can easily copy and paste into widgets in a New Relic dashboard, you can however stick with the [chart builder](https://docs.newrelic.com/docs/query-your-data/explore-query-data/query-builder/introduction-query-builder). Find all your k6 Metrics under the metrics tab, prefixed with `k6.`

**Number of Virtual Users**

{{< code >}}

```plain
SELECT latest(k6.vus) FROM Metric TIMESERIES
```

{{< /code >}}

**Max, Median, and Average Request Duration**

{{< code >}}

```plain
SELECT max(k6.http_req_duration.summary) AS 'Max Duration', average(k6.http_req_duration.median) AS 'Median', average(k6.http_req_duration.mean) AS 'Avg' FROM Metric TIMESERIES
```

{{< /code >}}

**Rate of Requests**

{{< code >}}

```plain
SELECT rate(max(k6.http_reqs), 1 seconds) FROM Metric TIMESERIES
```

{{< /code >}}

**Data Sent and Data Received**

{{< code >}}

```plain
SELECT sum(k6.data_received) as 'Data Received', max(k6.data_sent) AS 'Data Sent' FROM Metric TIMESERIES
```

{{< /code >}}

**Histogram bucketing Requests**

{{< code >}}

```plain
SELECT histogram(`k6.http_reqs`, 80, 20) FROM Metric
```

{{< /code >}}

**Change in the number of Requests**

{{< code >}}

```plain
SELECT derivative(k6.http_reqs, 30 seconds) AS 'Rate /reqs' FROM Metric TIMESERIES
```

{{< /code >}}

**Scrolling List of all k6 Performance Metrics**

{{< code >}}

```plain
SELECT uniques(metricName) FROM Metric WHERE metricName LIKE 'k6%' LIMIT MAX
```

{{< /code >}}
