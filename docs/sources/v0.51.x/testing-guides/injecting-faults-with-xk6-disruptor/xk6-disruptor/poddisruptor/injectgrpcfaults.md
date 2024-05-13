---
aliases:
  - ../../../../javascript-api/xk6-disruptor/poddisruptor/injectgrpcfaults # docs/k6/<K6_VERSION>/javascript-api/xk6-disruptor/poddisruptor/injectgrpcfaults
title: 'injectGrpcFaults()'
description: 'xk6-disruptor: PodDisruptor.injectGrpcFaults method'
weight: 200
---

# injectGrpcFaults()

injectGrpcFaults injects gRPC faults in the requests served by a target Pod.

| Parameter          | Type   | Description                                                                                                                                                            |
| ------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fault              | object | description of the [gRPC faults](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/faults/grpc) to be injected |
| duration           | string | duration of the disruption                                                                                                                                             |
| options (optional) | object | [options](#options) that control the injection of the fault                                                                                                            |

## options

The injection of the fault is controlled by the following options:

| Option    | Type   | Description                                                                         |
| --------- | ------ | ----------------------------------------------------------------------------------- |
| proxyPort | number | port the agent will use to listen for requests in the target pods ( default `8000`) |

## Example

<!-- eslint-skip -->

```javascript
const fault = {
  averageDelay: '50ms',
  statusCode: 13,
  errorRate: 0.1,
};
disruptor.injectGrpcFaults(fault, '30s');
```
