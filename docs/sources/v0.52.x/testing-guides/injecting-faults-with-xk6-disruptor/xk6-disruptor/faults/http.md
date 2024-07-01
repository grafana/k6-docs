---
aliases:
  - ../../../../javascript-api/xk6-disruptor/faults/http # docs/k6/<K6_VERSION>/javascript-api/xk6-disruptor/faults/http
title: 'HTTP'
description: 'xk6-disruptor: HTTP Fault attributes'
weight: 02
---

# HTTP

A HTTP Fault describes the characteristics of the faults to be injected in the HTTP requests served by a target.

A HTTP fault is described by the following attributes:

| Attribute      | Type   | Description                                                                                                    |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| averageDelay   | string | average delay added to requests represented as a string (default `0`)                                          |
| delayVariation | string | variation in the injected delay (default `0`)                                                                  |
| errorBody      | string | body to be returned when an error is injected                                                                  |
| errorCode      | number | error code to return                                                                                           |
| errorRate      | number | rate of requests that will return an error, represented as a float in the range `0.0` to `1.0` (default `0.0`) |
| exclude        | string | comma-separated list of urls to be excluded from disruption (e.g. /health)                                     |
| port           | number | port on which the requests will be intercepted                                                                 |

{{% admonition type="note" %}}

`averageDelay` and `delayVariation` are applied to all requests affected by the fault, regardless of the value of `errorRate`. `errorCode` is returned only to a fraction of requests defined by `errorRate`.

{{% /admonition %}}

## Example

This example defines a HTTP fault that introduces a delay of `50ms` in all requests and returns an error code `500` in `10%` of the requests.

```javascript
const fault = {
  averageDelay: '50ms',
  errorCde: 500,
  errorRate: 0.1,
};
```
