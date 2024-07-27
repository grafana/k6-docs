---
title: 'Options'
excerpt: 'Options allows to configure the tracing instrumentation behavior.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/tracing/options/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/tracing/options/
---

Use the `Options` object to configure the tracing instrumentation behavior. It is used during the instantiation of a [`Client`](/javascript-api/k6-experimental/tracing/client) instance and also as a parameter to the [`instrumentHTTP`](/javascript-api/k6-experimental/tracing/instrumenthttp) function. It controls the general behavior of the tracing instrumentation and is unspecific to any particular tracing client instance.

## Options

| Option name  | Type     | Default | Description                                                                    |
| :----------- | :------- | :------ | :----------------------------------------------------------------------------- |
| `propagator` | `string` | `w3c`   | The trace context propagation format. Currently supported: `w3c` and `jaeger`. |