---
title: "tracing"
descriptiontion: "k6 Tracing experimental API"
weight: 04
weight: 04
---

# tracing

{{< docs/shared source="k6" lookup="experimental-module.md" version="<K6_VERSION>" >}}

With this experimental module, you can _instrument_ HTTP requests so that they emit traces as the test runs.

## About trace contexts

A _trace context_ is a set of standardized HTTP headers added to a request that lets a tracing system correlate the request with other requests as they navigate through a system. The trace context specifications, such as the supported [W3C Trace Context](https://www.w3.org/TR/trace-context/) and [Jaeger Trace Context](https://www.jaegertracing.io/docs/1.21/client-libraries/#propagation-format), define specific header names and an encoding format for the header values.

A trace context generally consists of, at least, a `trace_id`, a `span_id`, and a `sampled` flag. The `trace_id` is a unique identifier for the trace, the `span_id` is a unique identifier for the request, and the `sampled` flag is a boolean that indicates whether the request should be traced. For instance, the [W3C Trace Context](https://www.w3.org/TR/trace-context/) defines the `Traceparent` header, whose value contains a `trace_id`, a `span_id` and a `sampled` flag, encoded as a dash (`-`) separated list of hexadecimal values. When a trace context header is attached to an HTTP request, we refer to it as being _propagated_ to the downstream service.

## API

| Class/Function                                                                                                   | Description                                                                                                               |
| :--------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| [instrumentHTTP](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/tracing/instrumenthttp) | instruments the k6 http module with tracing capabilities.                                                                 |
| [Client](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/tracing/client)                 | configurable Client that exposes instrumented HTTP operations and allows selectively instrumenting requests with tracing. |

## Example

This example demonstrates how to use the tracing API to instrument every HTTP request made in a script with tracing information.

{{< code >}}

```javascript
import { check } from 'k6';
import tracing from 'k6/experimental/tracing';
import http from 'k6/http';

// instrumentHTTP will ensure that all requests made by the http module
// from this point forward will have a trace context attached.
//
// The first argument is a configuration object that
// can be used to configure the tracer.
tracing.instrumentHTTP({
  // possible values: "w3c", "jaeger"
  propagator: 'w3c',
});

export default () => {
  // the instrumentHTTP call in the init context replaced
  // the http module with a version that will automatically
  // attach a trace context to every request.
  //
  // Because the instrumentHTTP call was configured with the
  // w3c trace propagator, this request will as a result have
  // a `traceparent` header attached.
  const res = http.get('http://httpbin.org/get', {
    headers: {
      'X-Example-Header': 'instrumented/get',
    },
  });
};
```

{{< /code >}}
