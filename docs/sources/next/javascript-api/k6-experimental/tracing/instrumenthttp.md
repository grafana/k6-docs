---
title: 'instrumentHTTP'
description: 'instrumentHTTP instruments the k6 http module with tracing capabilities.'
weight: 01
---

# instrumentHTTP

The `instrumentHTTP` function instruments the k6 http module with tracing capabilities. It transparently replaces each of the k6 http module functions with versions that automatically attach a trace context to every request. Instrumented functions include [del](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/del),[get](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/get),[head](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/head),[options](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/options),[patch](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/patch),[post](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/post),[put](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/head), and [request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/request).

The `instrumentHTTP` automatically adds tracing information to HTTP requests performed using the `k6/http` module functions (mentioned above).
This means that, to instrument the HTTP requests, you don't need to rewrite any code.
Instead, call it once in the init context.
From that point forward, all requests made by the HTTP module from that point forward will have a trace context header added to them, and the metadata for the data-point output will have the used `trace_id`. For details about propagation, refer to [About trace contexts](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/tracing#about-trace-contexts).

## Parameters

| Name      | Type                                                                                                 | Description                                                                                                                                                    |
| :-------- | :--------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options` | [`Options`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/tracing/options) | Configures the tracing behavior with the provided [`Options`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/tracing/options) object. |

## Example

This example demonstrates how calling the `instrumentHTTP` function in the init context of a script once ensures that all requests made by the HTTP module from that point forward will have a trace context header attached.

{{< code >}}

```javascript
import { check } from 'k6';
import tracing from 'k6/experimental/tracing';
import http from 'k6/http';

// instrumentHTTP will ensure that all requests made by the http module
// will be traced. The first argument is a configuration object that
// can be used to configure the tracer.
//
// Currently supported HTTP methods are: get, post, put, patch, head,
// del, options, and request.
tracing.instrumentHTTP({
  // propagator defines the trace context propagation format.
  // Currently supported: w3c and jaeger.
  // Default: w3c
  propagator: 'w3c',
});

export default () => {
  const res = http.get('http://httpbin.org/get', {
    headers: {
      'X-Example-Header': 'instrumented/get',
    },
  });
};
```

{{< /code >}}
