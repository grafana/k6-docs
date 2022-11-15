---
title: 'HTTP'
excerpt: 'xk6-disruptor: HTTP Fault attributes'
---

A HTTP Fault describes the characteristics of the faults to be injected in the HTTP requests served by a target.

A HTTP fault is described by the following attributes:

| Attribute | Description |
| --------- | ------------|
| averageDelay | average delay added to requests in milliseconds (default `0ms`) |
| delayVariation| variation in the injected delay in milliseconds (default `0ms`) |
| errorBody | body to be returned when an error in injected |
| errorCode | error code to return |
| errorRate | rate of requests that will return an error, represented as a float in the range `0.0` to `1.0` (default `0.0`) |
| exclude | comma-separated list of urls to be excluded from disruption (e.g. /health) |
| port | port on which the requests will be intercepted |