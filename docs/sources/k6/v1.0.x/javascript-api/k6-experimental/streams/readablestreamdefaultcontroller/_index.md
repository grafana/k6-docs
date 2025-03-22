---
title: 'ReadableStreamDefaultController'
description: "ReadableStreamDefaultController allows to control a ReadableStream's state and internal queue."
weight: 30
---

# ReadableStreamDefaultController

The `ReadableStreamDefaultController` type allows you to control a `ReadableStream`'s state and internal queue.

## Methods

| Name                                                                                                                                      | Description                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller/close)          | Closes the associated stream.                        |
| [enqueue(chunk)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller/enqueue) | Enqueues a chunk of data into the associated stream. |
| [error(reason)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller/error)    | Causes the stream to become errored.                 |
