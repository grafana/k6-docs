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
import { ReadableStream } from 'k6/experimental/streams';
import { setTimeout } from 'k6/timers';

export default async function () {
  // Define a number stream that emits numbers from 1 to 10 every second
  const stream = numbersStream();

  // We use the getReader method to create a reader and lock the stream to it
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
  }

  // Release the lock on the stream, so we're free to obtain another reader
  // and read from the stream again
  reader.releaseLock();
}

function numbersStream() {
  let currentNumber = 0;

  return new ReadableStream({
    start(controller) {
      const fn = () => {
        if (currentNumber < 10) {
          controller.enqueue(++currentNumber);
          setTimeout(fn, 1000);
          return;
        }

        controller.close();
      };
      setTimeout(fn, 1000);
    },
  });
}
```

{{< /code >}}
