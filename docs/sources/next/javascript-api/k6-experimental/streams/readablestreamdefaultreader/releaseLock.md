---
title: 'releaseLock()'
description: "The releaseLock() method of the ReadableStreamDefaultReader interface releases the reader's lock on the stream."
weight: 40
---

# releaseLock()

The `releaseLock()` method of the [ReadableStreamDefaultReader](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultreader) interface releases the reader's lock on the stream.

If the associated stream is errored as the lock is released, the reader will be errored as well. This method is useful when you're done with the stream and want to release the lock on it.

If the reader's lock is released as pending read operations are still in progress, the reader's [ReadableStreamDefaultReader.read()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultreader/read) calls are immediately rejected with a `TypeError`.

## Exceptions

| Exception | Description                                                                                                                                                                       |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeError | Thrown when the source object is not a [ReadableStreamDefaultReader](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultreader) |

## Example

{{< code >}}

```javascript

```

{{< /code >}}
