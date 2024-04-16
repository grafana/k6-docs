---
aliases:
  - ../../../../javascript-api/xk6-disruptor/faults/grpc # docs/k6/<K6_VERSION>/javascript-api/xk6-disruptor/faults/grpc
title: 'gRPC'
description: 'xk6-disruptor: gRPC Fault attributes'
weight: 01
---

# gRPC

A gRPC Fault describes the characteristics of the faults to be injected in the gRPC requests served by a target.

A gRPC fault is described by the following attributes:

| Attribute      | Type   | Description                                                                                                    |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| averageDelay   | string | average delay added to requests represented as a string (default `0`)                                          |
| delayVariation | string | variation in the injected delay (default `0`)                                                                  |
| statusMessage  | string | message to be returned when an error is injected                                                               |
| statusCode     | number | status to be returned when an error is injected                                                                |
| errorRate      | number | rate of requests that will return an error, represented as a float in the range `0.0` to `1.0` (default `0.0`) |
| exclude        | string | comma-separated list of services to be excluded from disruption                                                |
| port           | number | port on which the requests will be intercepted                                                                 |

{{% admonition type="note" %}}

`averageDelay` and `delayVariation` are applied to all requests affected by the fault, regardless of the value of `errorRate`. `statusCode` is returned only to a fraction of requests defined by `errorRate`.

{{% /admonition %}}

## Example

This example defines a gRPC fault that introduces a delay of `50ms` in all requests and returns a status code `13` in `10%` of the requests.

```javascript
const fault = {
  averageDelay: '50ms',
  statusCode: 10,
  errorRate: 0.1,
};
```
