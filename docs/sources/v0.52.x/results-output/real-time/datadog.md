---
title: 'Datadog'
description: 'Send k6 output to Datadog to visualize load test results and correlate performance testing metrics in Datadog.'
weight: 00
---

# Datadog

{{% admonition type="warning" %}}

The built-in StatsD output has been deprecated on k6 v0.47.0. You can continue to use this feature by using the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd), and this guide has been updated to include instructions for how to use it.

For more information on the reason behind this change, you can follow [this issue](https://github.com/grafana/k6/issues/2982) in the k6 repository.

{{% /admonition %}}

k6 can send metrics to [Datadog](https://www.datadoghq.com/). That allows visualizing and correlating performance testing metrics with other monitored metrics in Datadog.

This guide covers how to:

- Run the Datadog Agent
- Run the k6 test
- Visualize in Datadog

## Before you begin

To use the StatsD output option, you have to build a k6 binary using the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd). For more details, refer to [StatsD](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/statsd).

## Run the Datadog Agent

To get k6 metrics into Datadog, k6 sends metrics through the Datadog Agent, which collects, aggregates, and forwards the metrics to the Datadog platform.

Run the Datadog Agent service as a Docker container with this command:

{{< code >}}

```bash
DOCKER_CONTENT_TRUST=1 \
docker run --rm -d \
    --name datadog \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_SITE="datadoghq.com" \
    -e DD_API_KEY=<YOUR_DATADOG_API_KEY> \
    -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=1 \
    -p 8125:8125/udp \
    datadog/agent:latest
```

{{< /code >}}

Replace `<YOUR_DATADOG_API_KEY>` with your [Datadog API key](https://app.datadoghq.com/account/settings#api).

If your account is registered with Datadog EU, change the value of `DD_SITE` to `datadoghq.eu`.

{{% admonition type="note" %}}

For additional information, refer to the <a href="https://docs.datadoghq.com/agent/docker/">Datadog Docker Agent documentation</a>.

{{% /admonition %}}

### DogStatsD

The Datadog agent includes the [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/) service to collect and aggregate metrics. DogStatsD implements the [StatsD](https://github.com/etsy/statsd) protocol with some extensions. For example, [DogStatsD tagging](https://docs.datadoghq.com/tagging/) allows to collect k6 metrics with tags to distinguish between requests for different URLs, response statuses, groups, etc.

The instruction above runs the `DogStatsD` service in a [Docker container](https://docs.datadoghq.com/developers/dogstatsd/?tab=containeragent#agent), but it's also possible to run it either as [Host Agent](https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent#agent), [Kubernetes](https://docs.datadoghq.com/developers/dogstatsd/?tab=kubernetes#agent), and [Helm](https://docs.datadoghq.com/developers/dogstatsd/?tab=helm#agent).

## Run the k6 test

Once the Datadog Agent service is running, run the k6 test and send the metrics to the Agent with:

{{< code >}}

```bash
$ K6_STATSD_ENABLE_TAGS=true k6 run --out output-statsd script.js
```

{{< /code >}}

Make sure you're using the k6 binary you built with the xk6-output-statsd extension.

You can look at the [StatsD](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/statsd) output page for configuration options.

## Visualize in Datadog

While running the test, k6 sends metrics periodically to Datadog. By default, these metrics have `k6.` as the name prefix.

You can visualize k6 metrics in real-time with the [metrics explorer](https://docs.datadoghq.com/metrics/explorer/), [monitors](https://docs.datadoghq.com/monitors/), or [custom dashboards](https://docs.datadoghq.com/graphing/dashboards/).

![Datadog visualizing performance testing metrics](/media/docs/k6-oss/datadog-performance-testing-metrics.png)

<blockquote>

To learn more about all the types of k6 metrics, read the [k6 Metrics guide](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics)

</blockquote>

The first time Datadog detects the `k6.http_reqs` metric, the k6 integration tile is installed automatically, and the default k6 dashboard is added to your dashboard list.

![k6 Datadog Dashboard](/media/docs/k6-oss/datadog-k6-dashboard.png)

Optionally, you can install the k6 integration tile following these instructions:

1. Log in to `Datadog`.
2. From the sidebar menu, choose `Integrations` > `Integrations`.
3. Search for `k6`, then select the `k6` integration.
4. Click on the `Configuration` tab option.
5. Scroll down and click on the `Install integration` button.
