---
title: 'Netdata'
description: 'You can send k6 output to Netdata. With this integration, visualize test results with zero configuration, in seconds'
weight: 00
---

# Netdata

{{% admonition type="warning" %}}

The built-in StatsD output has been deprecated on k6 v0.47.0. You can continue to use this feature by using the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd), and this guide has been updated to include instructions for how to use it.

For more information on the reason behind this change, you can follow [this issue](https://github.com/grafana/k6/issues/2982) in the k6 repository.

{{% /admonition %}}

k6 can send performance testing metrics to [Netdata](https://netdata.cloud). This enables the user to start monitoring their k6 experiments right away, as Netdata is a monitoring tool with:

- Auto-configuration and auto-detection of data sources
- Automatic organization of metrics into **meaningful** charts and visualization
- Per-second metric granularity

## Before you begin

To use the StatsD output option, you have to build a k6 binary using the [xk6-output-statsd extension](https://github.com/LeonAdato/xk6-output-statsd). For more details, refer to [StatsD](https://grafana.com/docs/k6/<K6_VERSION>/results-output/real-time/statsd).

## Run Netdata

Netdata runs on many different systems and platforms. The easiest way to download and run Netdata is through the `kickstart` script:

```bash
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

Alternatively, you can read more about installing and running Netdata in their [documentation](https://learn.netdata.cloud/docs/get-started/).

## Setup Netdata for K6

Netdata runs a fully functional [StatsD](https://github.com/netdata/netdata/blob/master/collectors/statsd.plugin/README.md) server by default and we have included a default configuration file for k6 metrics.

## Run the k6 test

```bash
k6 run --out output-statsd script.js
```

Make sure you're using the k6 binary you built with the xk6-output-statsd extension.

**Caveat**: By default, Netdata binds the StatsD server to `localhost`. That means that if Netdata and k6 are in different hosts, you will need to edit the configuration file of Netdata.

1. Visit the [StatsD documentation](https://github.com/netdata/netdata/blob/master/collectors/statsd.plugin/README.md) for a reference on the configuration options. We are interested in the `#bind to` option.
2. Use `sudo ./edit-config netdata.conf` from inside the directory where Netdata stores its configuration files (e.g `/etc/netdata/`) and add `bind to=udp:0.0.0.0:8125`.

## Visualize in Netdata

Netdata will automatically create charts for your application, as illustrated in the [documentation](https://github.com/netdata/netdata/blob/master/collectors/statsd.plugin/k6.md).

Simply head over to `localhost:19999` (assuming that you are running Netdata on the same machine) and find the k6 section. If you had opened Netdata before running the experiment, you will need to refresh the dashboard page.

![Netdata k6 dashboard](/media/docs/k6-oss/netdata-k6-dashboard.png)
