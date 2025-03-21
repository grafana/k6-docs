---
title: 'Client'
description: 'Client is a HTTP client attaching tracing information to its requests.'
weight: 02
---

# Client

`Client` is an HTTP client constructor that attaches tracing information to its requests. Use it to include a tracing context in HTTP requests so that tracing backends (such as [Grafana Tempo](https://grafana.com/oss/tempo/)) can incorporate their results.

The `Client` class acts as a drop-in replacement for the standard `http` module and attaches a [trace context](https://www.w3.org/TR/trace-context/) to the requests headers, and add a `trace_id` to HTTP-related k6 output's data points metadata. It currently supports the [W3C Trace Context](https://www.w3.org/TR/trace-context/) and [Jaeger](https://www.jaegertracing.io/docs/1.21/client-libraries/#propagation-format) trace context propagation formats. For details about propagation, refer to [About trace contexts](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/tracing#about-trace-contexts).

The `Client` constructor accepts an [`Options`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/tracing/options) object as its only parameter.

## Example

This example demonstrates how to instantiate a tracing client and use it to instrument HTTP calls with trace context headers. It also illustrates how you can use it alongside the standard `http` module to perform non-instrumented HTTP calls.

{{< code >}}

```javascript
import { check } from 'k6';
import tracing from 'k6/experimental/tracing';
import http from 'k6/http';

// Explicitly instantiating a tracing client allows to distringuish
// instrumented from non-instrumented HTTP calls, by keeping APIs separate.
// It also allows for finer-grained configuration control, by letting
// users changing the tracing configuration on the fly during their
// script's execution.
const instrumentedHTTP = new tracing.Client({
  propagator: 'w3c',
});

const testData = { name: 'Bert' };

export default () => {
  // Using the tracing client instance, HTTP calls will have
  // their trace context headers set.
  let res = instrumentedHTTP.request('GET', 'http://httpbin.org/get', null, {
    headers: {
      'X-Example-Header': 'instrumented/request',
    },
  });

  // The tracing client offers more flexibility over
  // the `instrumentHTTP` function, as it leaves the
  // imported standard http module untouched. Thus,
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

The `Client` class exposes the same API as the standard `http` module. Except for the `batch` method, which is absent from `Client`. The following table lists the `Client` methods which have an equivalent in the standard `http` module:

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

## Configuration

`Client` instances support being reconfigured using the following API:

| Method                      | Description                                                                                                                                                     |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Client.configure(options)` | Reconfigures the tracing client instance with the provided [`Options`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/tracing/options) |
