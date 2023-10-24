---
title: 'injectGrpcFaults()'
excerpt: 'xk6-disruptor: PodDisruptor.injectGrpcFaults method'
canonicalUrl: https://grafana.com/docs/k6
---

injectGrpcFaults injects gRPC faults in the requests served by a target Pod.

| Parameter | Type   | Description |
| --------- | ------ |------- |
| fault     | object | description of the [gRPC faults](/javascript-api/xk6-disruptor/api/faults/grpc) to be injected |
| duration  | string | duration of the disruption |
| options (optional)   | object | [options](#options) that control the injection of the fault |


## options

The injection of the fault is controlled by the following options:

| Option    | Type   | Description |
| --------- | ------ | -------- |
| proxyPort | number | port the agent will use to listen for requests in the target pods ( default `8000`) |


## Example

<!-- eslint-skip -->

```javascript
    const fault = {
        averageDelay: "50ms",
        statusCode: 13,
        errorRate: 0.1
    }
    disruptor.injectGrpcFaults(fault, "30s")
```