---
title: "k6/experimental"
excerpt: "k6 experimental APIs"
weight: 07
---

# k6/experimental

{{< docs/shared source="k6" lookup="experimental-module.md" version="<K6_VERSION>" >}} >}}

| Modules                                                                           | Description                                                                                                              |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [browser](/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser)       | Provides browser-level APIs to interact with browsers and collect frontend performance metrics as part of your k6 tests. |
| [redis](/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/redis)           | Functionality to interact with [Redis](https://redis.io/).                                                               |
| [timers](/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/timers)         | `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval`                                                             |
| [tracing](/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/tracing)       | Support for instrumenting HTTP requests with tracing information.                                                        |
| [webcrypto](/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/webcrypto)   | Implements the [WebCrypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API).                         |
| [websockets](/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets) | Implements the browser's [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).                    |
| [grpc](/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/grpc)             | Extends `k6/net/grpc` with the streaming capabilities.                                                                   |
