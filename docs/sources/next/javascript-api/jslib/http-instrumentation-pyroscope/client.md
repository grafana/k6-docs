---
title: 'Client'
description: 'Client is a HTTP client attaching baggage headers to its requests.'
weight: 02
---

# Client

`Client` is an HTTP client constructor that attaches baggage headers to its requests.
Use the `Client` class to include a context in HTTP requests so that [Grafana pyroscope](https://grafana.com/oss/pyroscope/) can incorporate their results.

The `Client` class acts as a drop-in replacement for the standard `http` module and attaches a [baggage header](https://www.w3.org/TR/baggage/) to the request. For details about propagation, refer to [About baggage header](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/http-instrumentation-pyroscope#about-baggage-header).

The `Client` constructor accepts a function that takes the method, the body, and the params of each request and returns a map of headers to be added to the request. By default, it appends the baggage header with the info necessary for Grafana Cloud Profiling to integrate with Grafana Cloud k6.

For details about propagation, refer to [About baggage header](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/http-instrumentation-pyroscope#about-baggage-header).

## Example

This example demonstrates how to instantiate a client and use it to instrument HTTP calls. The example also illustrates how you can use the client alongside the standard `http` module to perform non-instrumented HTTP calls.

{{< code >}}

```javascript
import { check } from 'k6';
import pyroscope from 'https://jslib.k6.io/http-instrumentation-pyroscope/1.0.0/index.js';
import http from 'k6/http';

// Explicitly instantiating a Pyroscope client allows to distinguish
// instrumented from non-instrumented HTTP calls, by keeping APIs separate.
const instrumentedHTTP = new pyroscope.Client();

const testData = { name: 'Bert' };

export default () => {
  // Using the pyroscope client instance, HTTP calls will have
  // baggage header added.
  let res = instrumentedHTTP.request('GET', 'http://httpbin.org/get', null, {
    headers: {
      'X-Example-Header': 'instrumented/request',
    },
  });

  // The client offers more flexibility over
  // the `instrumentHTTP` function, as it leaves the
  // imported standard `http` module untouched. Thus,
  // one can still perform non-instrumented HTTP calls
  // using it.
  res = http.post('http://httpbin.org/post', JSON.stringify(testData), {
    headers: { 'X-Example-Header': 'noninstrumented/post' },
  });

  res = instrumentedHTTP.del('http://httpbin.org/delete', null, {
    headers: { 'X-Example-Header': 'instrumented/delete' },
  });
};
```

{{< /code >}}

## HTTP module functions equivalents

The `Client` class exposes the same API as the standard `http` module except for the `batch` method, which is absent from `Client`. The following table lists the `Client` methods which have an equivalent in the standard `http` module:

| Method                                               | HTTP equivalent                                                                                   | Description                                                                                                                                                                             |
| :--------------------------------------------------- | :------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Client.del(url, [body], [params])`                  | [http.del](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/del)                   | Performs an instrumented HTTP DELETE request. The method has the same prototype as the `http.del` function and should transparently act as a drop-in replacement for it.                |
| `Client.get(url, [params])`                          | [http.get](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/get)                   | Performs an instrumented HTTP GET request. The method has the same prototype as the `http.get` function and should transparently act as a drop-in replacement for it.                   |
| `Client.head(url, [params])`                         | [http.head](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/head)                 | Performs an instrumented HTTP HEAD request. The method has the same prototype as the `http.head` function and should transparently act as a drop-in replacement for it.                 |
| `Client.options(url, [body], [params])`              | [http.options](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/options)           | Performs an instrumented HTTP OPTIONS request. The method has the same prototype as the `http.options` function and should transparently act as a drop-in replacement for it.           |
| `Client.patch(url, [body], [params])`                | [http.patch](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/patch)               | Performs an instrumented HTTP PATCH request. The method has the same prototype as the `http.patch` function and should transparently act as a drop-in replacement for it.               |
| `Client.post(url, [body], [params])`                 | [http.post](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/post)                 | Performs an instrumented HTTP POST request. The method has the same prototype as the `http.post` function and should transparently act as a drop-in replacement for it.                 |
| `Client.put(url, [body], [params])`                  | [http.put](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/head)                  | Performs an instrumented HTTP HEAD request. The method has the same prototype as the `http.put` function and should transparently act as a drop-in replacement for it.                  |
| `Client.request(method, url, [body], [params])`      | [http.request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/request)           | Performs an instrumented HTTP request. The method has the same prototype as the `http.request` function and should transparently act as a drop-in replacement for it.                   |
| `Client.asyncRequest(method, url, [body], [params])` | [http.asyncRequest](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/asyncrequest) | Performs an instrumented HTTP asynchronous request. The method has the same prototype as the `http.asyncRequest` function and should transparently act as a drop-in replacement for it. |
