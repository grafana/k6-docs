---
aliases:
  - ../../k6-experimental/tracing/options/ # docs/k6/<K6_VERSION>/javascript-api/k6-experimental/tracing/options/
title: 'Options'
description: 'Options allows to configure the tracing instrumentation behavior.'
weight: 03
---

# Options

Use the `Options` object to configure the tracing instrumentation behavior. It is used during the instantiation of a [`Client`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/http-instrumentation-tempo/client) instance and also as a parameter to the [`instrumentHTTP`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/http-instrumentation-tempo/instrumenthttp) function. It controls the general behavior of the tracing instrumentation and is unspecific to any particular tracing client instance.

## Options

| Option name  | Type     | Default | Description                                                                                       |
| :----------- | :------- | :------ | :------------------------------------------------------------------------------------------------ |
| `propagator` | `string` | `w3c`   | The trace context propagation format. Currently supported: `w3c` and `jaeger`.                    |
| `sampling`   | `number` | `1`     | A number between 0 and 1 defining the sampling rate. 1 means sample always, 0 means never sample. |
