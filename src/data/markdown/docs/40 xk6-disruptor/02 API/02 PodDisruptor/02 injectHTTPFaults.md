---
title: 'injectHTTPFaults()'
excerpt: 'xk6-disruptor: PodDisruptor.injectHTTPFaults method'
---

injectHTTPFaults injects HTTP faults in the requests served by a target Pod.

| Parameters | Description |
| ---------- | ----------- |
| fault | description of the [http faults](/javascript-api/xk6-disruptor/api/faults/http) to be injected |
| duration | duration of the disruption in seconds |
| [options](#options) | options that control the injection of the fault |


## options

The injection of the fault is controlled by the following options:

| Option | Description |
| ------ | ----------- |
| proxyPort | port the agent will use to listen for requests in the target pods ( default `8080`) |
| iface | network interface where the agent will capture the traffic ( default `eth0`) |