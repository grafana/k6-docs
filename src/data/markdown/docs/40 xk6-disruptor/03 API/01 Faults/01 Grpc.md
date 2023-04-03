---
title: 'Grpc'
excerpt: 'xk6-disruptor: GrpcP Fault attributes'
---

A Grpc Fault describes the characteristics of the faults to be injected in the Grpc requests served by a target.

A Grpc fault is described by the following attributes:

| Attribute | Description |
| --------- | ------------|
| averageDelay | average delay added to requests in milliseconds (default `0ms`) |
| delayVariation| variation in the injected delay in milliseconds (default `0ms`) |
| statusMessage | message to be returned when an error is injected |
| statusCode | status to be returned when an error is injected |
| errorRate | rate of requests that will return an error, represented as a float in the range `0.0` to `1.0` (default `0.0`) |
| exclude | comma-separated list of services to be excluded from disruption |
| port | port on which the requests will be intercepted |

<Blockquote mod="note">

`averageDelay` and `delayVariation` are applied to all requests affected by the fault, regardless of the value of `errorRate`. `statusCode` is returned only to a fraction of requests defined by `errorRate`.

</Blockquote>

## Example

This example defines a Grpc fault that introduces a delay of `50ms` in all requests and returns a status code `13` in `10%` of the requests.

```javascript
const fault = {
  averageDelay: 50,
  statusCode: 10,
  errorRate: 0.1,
};
```