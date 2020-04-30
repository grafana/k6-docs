---
title: "Datadog"
excerpt: "The Datadog integration allows visualizing load test results and correlating performance testing metrics in Datadog."
---

k6 can send performance testing metrics to [Datadog](https://www.datadoghq.com/). That allows visualizing and correlating performance testing metrics with other monitored metrics in Datadog.

This article outlines the instructions of the Datadog integration:

- Run the Datadog Agent
- Run the k6 test
- Visualize in Datadog

## Run the Datadog Agent

To get k6 metrics into Datadog, k6 sends metrics through the Datadog Agent, which collects, aggregates, and forwards the metrics to the Datadog platform.

Run the Datadog Agent service as a Docker container with this command:


<div class="code-group" data-props='{"labels": [""]}'>

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d \
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

</div>

**Note**: Replace `<YOUR_DATADOG_API_KEY>` with your [Datadog API key](https://app.datadoghq.com/account/settings#api). 

If your account is registered with Datadog EU, change the value of `DD_SITE` to `datadoghq.eu`.

<blockquote>
For additional information, read the <a href="https://docs.datadoghq.com/agent/docker/">Datadog Docker Agent documentation</a>.
</blockquote>

### DogStatsD

The Datadog agent includes the [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/) service to collect and aggregate metrics. DogStatsD implements the [StatsD](https://github.com/etsy/statsd) protocol with some extensions. For example, [DogStatsD tagging](https://docs.datadoghq.com/tagging/) allows to collect k6 metrics with tags to distinguish between requests for different URLs, response statuses, groups, etc.

The instruction above runs the `DogStatsD` service using the [Docker container](https://docs.datadoghq.com/developers/dogstatsd/?tab=containeragent#agent), but there are other alternatives like the [Host Agent](https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent#agent), [Kubernetes](https://docs.datadoghq.com/developers/dogstatsd/?tab=kubernetes#agent), and [Helm](https://docs.datadoghq.com/developers/dogstatsd/?tab=helm#agent). 

## Run the k6 test

Once the Datadog Agent service is running, run the k6 test and send the metrics to the Agent with:

<div class="code-group" data-props='{"labels": [""]}'>

```shell
k6 run --out datadog script.js
```

</div>


The environment variables for the command are:

| Name  | Value |
| ------------- | ------------- |
| `K6_DATADOG_ADDR` | Address of the DogsStatsD service, currently only UDP is supported. The default value is `localhost:8125`. |
| `K6_DATADOG_NAMESPACE` | The namespace used as a prefix for all the metric names. The default value is `k6.` |
| `K6_DATADOG_PUSH_INTEVAL` | Configure how often data batches are sent. The default value is `1s`. |
| `K6_DATADOG_BUFFER_SIZE` | The buffer size. The default value is `20`. |
| `K6_DATADOG_TAG_BLACKLIST` | This is a comma-separated list of tags that should NOT be sent to Datadog. For example, "tag1, tag2". The default value is empty. |


## Visualize in Datadog

While running the test, k6 sends metrics periodically to DataDog. By default, these metrics have `k6.` as the name prefix.

You can visualize k6 metrics in realtime with the [metrics explorer](https://docs.datadoghq.com/metrics/explorer/), [monitors](https://docs.datadoghq.com/monitors/), or [custom dashboards](https://docs.datadoghq.com/graphing/dashboards/).


![Datadog visualizing performance testing metrics](images/datadog-performance-testing-metrics.png)

<blockquote>

To learn more about all the types of k6 metrics, read the [k6 Metrics guide](/using-k6/metrics)

</blockquote>

**Note**: the first time Datadog detects the `k6.http_reqs` metric, the k6 integration tile is installed automatically, and the default k6 dashboard is added to your dashboard list. 

![k6 Datadog Dashboard](images/k6-datadog-dashboard.png)

Optionally, you can install the k6 integration tile following these instructions:

1. Log in to `Datadog`.
2. From the sidebar menu, choose `Integrations` > `Integrations`.
3. Search for `k6`, then select the `k6` integration.
4. Click on the `Configuration` tab option.
5. Scroll down and click on the `Install integration` button.



