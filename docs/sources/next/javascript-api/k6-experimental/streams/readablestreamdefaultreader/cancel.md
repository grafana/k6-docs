---
title: 'cancel'
description: 'Returns a Promise that resolves when the stream is canceled.'
weight: 20
---

# cancel

The `cancel()` method of the [ReadableStreamDefaultReader](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultreader) interface returns a `Promise` that resolves when the stream is canceled. Calling this method signals a loss of interest in the stream by a consumer.

Cancel is used when you've completely finished with the stream and don't need any more data from it, even if there are chunks enqueued waiting to be read. That data is lost after cancel is called, and the stream is not readable any more. To read those chunks still and not completely get rid of the stream, you'd use [ReadableStreamDefaultController.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller/close).

## Arguments

| Name   | Type | Description                                                                           |
| ------ | ---- | ------------------------------------------------------------------------------------- |
| reason | any  | An optional human-readable value that represents the reason for canceling the stream. |

## Returns

A promise that resolves with the provided `reason` when the stream is canceled.

## Exceptions

| Exception | Description                                                                                                                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeError | Thrown when the source object is not a [ReadableStreamDefaultReader](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultreader) or the stream has no owner. |

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
    if (value === 8) {
      // Cancel the stream when the number is 8
      await reader.cancel('cancelling the stream');
      break;
    }

    console.log(`received number ${value} from stream`);
  }
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
