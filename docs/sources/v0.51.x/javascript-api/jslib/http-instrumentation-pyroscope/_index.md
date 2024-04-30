---
title: HTTP instrumentation for Pyroscope
menuTitle: http-instrumentation-pyroscope
description: 'k6 Pyroscope instrumentation API'
weight: 04
---

# HTTP instrumentation for Pyroscope

With jslib, you can _instrument_ HTTP requests in a way that lets you tag Grafana Cloud Profiles with relevant information generated from k6 tests.

## About baggage header

The _baggage header_ is a standardized HTTP header used to propagate distributed context. The [W3C specification](https://www.w3.org/TR/baggage/) goes into more detail on the specifics, but like many other headers, the baggage header is a list of key-value pairs.

This module, by default, adds three key-value pairs:

1.  Scenario name
2.  Name of the request (URL if not set)
3.  Value of `__ENV.K6_CLOUDRUN_TEST_RUN_ID`, which is set automatically in Grafana Cloud k6.

## API

| Class/Function                                                                                                                | Description                                                    |
| :---------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| [instrumentHTTP](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/http-instrumentation-pyroscope/instrumenthttp) | Instruments the k6 http module with baggage header.            |
| [Client](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/http-instrumentation-pyroscope/client)                 | Configurable Client that exposes instrumented HTTP operations. |

## Example

This example demonstrates how to use the this library to instrument every HTTP request made in a script with the `baggage` header.

{{< code >}}

```javascript
import { check } from 'k6';
import pyroscope from 'https://jslib.k6.io/http-instrumentation-pyroscope/1.0.0/index.js';
import http from 'k6/http';

// instrumentHTTP will ensure that all requests made by the http module
// from this point forward will have a baggage context attached.
pyroscope.instrumentHTTP();

export default () => {
  // the instrumentHTTP call in the init context replaced
  // the http module with a version that will automatically
  // attach a baggage header to every request.
  const res = http.get('http://httpbin.org/get', {
    headers: {
      'X-Example-Header': 'instrumented/get',
    },
  });
};
```

{{< /code >}}
