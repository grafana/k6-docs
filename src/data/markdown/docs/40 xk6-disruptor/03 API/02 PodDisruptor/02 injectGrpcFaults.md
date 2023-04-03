---
title: 'injectGrpcFaults()'
excerpt: 'xk6-disruptor: PodDisruptor.injectGrpcFaults method'
---

injectGrpcFaults injects gRPC faults in the requests served by a target Pod.

| Parameter | Description |
| ---------- | ----------- |
| fault | description of the [gRPC faults](/javascript-api/xk6-disruptor/api/faults/grpc) to be injected |
| duration | duration of the disruption in seconds |
| [options](#options) | options that control the injection of the fault |


## options

The injection of the fault is controlled by the following options:

| Option | Description |
| ------ | ----------- |
| proxyPort | port the agent will use to listen for requests in the target pods ( default `8080`) |
| iface | network interface where the agent will capture the traffic ( default `eth0`) |


## Example

<!-- eslint-skip -->

```javascript
    const fault = {
        averageDelay: 50,
        statusCode: 13,
        errorRate: 0.1
    }
    disruptor.injectGrpcFaults(fault, 30)
```