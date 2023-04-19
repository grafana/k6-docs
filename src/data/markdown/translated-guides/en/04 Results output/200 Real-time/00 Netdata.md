---
title: 'Netdata'
excerpt: 'You can send k6 output to Netdata. With this integration, visualize test results with zero configuration, in seconds'
---

k6 can send performance testing metrics to [Netdata](https://netdata.cloud). This enables the user to start monitoring their k6 experiments right away, as Netdata is a monitoring tool with:
- auto-configuration and auto-detection of data sources
- automatic organization of metrics into **meaningful** charts and visualization
- per-second metric granularity

## Run Netdata

Netdata runs on many different systems and platforms. The easiest way to download and run Netdata is through the `kickstart` script:

```bash
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```
Alternatively, you can read more about installing and running Netdata in their [documentation](https://learn.netdata.cloud/docs/get-started/).

## Setup Netdata for K6

Netdata runs a fully functional [StatsD](https://learn.netdata.cloud/docs/agent/collectors/statsd.plugin) server by default and we have included a default configuration file for k6 metrics. 

## Run the k6 test

```bash
k6 run --out statsd script.js
```

**Caveat**: By default, Netdata binds the StatsD server to `localhost`. That means that if Netdata and k6 are in different hosts, you will need to edit the configuration file of Netdata.
1. Visit [StatsD documentation](https://learn.netdata.cloud/docs/agent/collectors/statsd.plugin) for a reference on the configuration options. We are interested in `#bind to` option.
2. Use `sudo ./edit-config netdata.conf` from inside the directory where Netdata stores its configuration files (e.g `/etc/netdata/`) and add `bind to=udp:0.0.0.0:8125`.

## Visualize in Netdata

Netdata will automatically create charts for your application, as illustrated in the [documentation](https://learn.netdata.cloud/docs/agent/collectors/statsd.plugin/k6). 

Simply head over to `localhost:19999` (assuming that you are running Netdata on the same machine) and find the k6 section. If you had opened Netdata before running the experiment, you will need to refresh the dashboard page.

![image](https://user-images.githubusercontent.com/13405632/117691411-8a7baf00-b1c4-11eb-9d87-8e9e7214871f.png)




