---
title: 'ReadableStreamDefaultReader'
description: 'ReadableStreamDefaultReader represents a default reader that can be used to read stream data.'
weight: 20
---

# ReadableStreamDefaultReader

The `ReadableStreamDefaultReader` type represents a default reader that can be used to read stream data. It can be used to read from a [ReadableStream](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestream) object that has an [underlying source](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestream/underlyingsource) of any type.

## Methods

| Name                                                                                                                                     | Description                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cancel(reason)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultreader/cancel)     | Returns a `Promise` that resolves when the stream is canceled.                                                                                                    |
| [read()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultreader/read)               | Returns a `Promise` that resolves with an object containing the `done` and `value` properties, providing access to the next chunk in the stream's internal queue. |
| [releaseLock()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultreader/releaselock) | Releases the lock on the stream.                                                                                                                                  |
