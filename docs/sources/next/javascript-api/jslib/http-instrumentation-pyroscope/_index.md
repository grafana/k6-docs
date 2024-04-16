---
title: "http instrument pyroscope"
descriptiontion: "k6 pyroscope instrumentation API"
weight: 04
weight: 04
---

# Pyroscope


With this jslib, you can _instrument_ HTTP requests so that Grafana Cloud Profiles can match profiles to Grafana Cloud K6 tests.

## About baggage header

A _barrage header_ is a standardized HTTP header to propagate distributed context. The [W3C specification](https://www.w3.org/TR/baggage/) goes into more details on the specifics, but like many other headers is a list of key, value  pairs. 

This module by default adds a 3 key value pairs, scenario name, the name of the request (url if not set) and the value of `__ENV.K6_CLOUDRUN_TEST_RUN_ID` which is automatically in grafana k6 cloud.

## API

| Class/Function                                                                                                   | Description                                                                                                               |
| :--------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| [instrumentHTTP](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/http-instrumentation-pyroscope/instrumenthttp) | instruments the k6 http module with baggage header.                                                                 |
| [Client](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/http-instrumentation-pyroscope/client)                 | configurable Client that exposes instrumented HTTP operations. |

## Example

This example demonstrates how to use the this library to instrument every HTTP request made in a script with baggage header.

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
