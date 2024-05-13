---
title: 'cancel(reason)'
description: 'Returns a Promise that resolves when the stream is canceled.'
weight: 100
---

# cancel(reason)

The `cancel()` method of the [ReadableStream](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestream) interface returns a `Promise` that resolves when the stream is canceled.

Cancel is used when you've completely finished with the stream and don't need any more data from it, even if chunks are enqueued waiting to be read. That data is lost after `cancel` is called, and the stream is not readable any more. To close the stream without getting rid of enqueued chunks, use [ReadableStreamDefaultController.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller/close).

## Arguments

| Name   | Type | Description                                                                           |
| ------ | ---- | ------------------------------------------------------------------------------------- |
| reason | any  | An optional human-readable value that represents the reason for canceling the stream. |

## Return value

A promise that resolves with the value `undefined` when the stream is canceled.

## Exceptions

| Exception | Description                              |
| --------- | ---------------------------------------- |
| TypeError | Thrown the stream is locked to a reader. |

## Example

{{< code >}}

```javascript
import { ReadableStream } from 'k6/experimental/streams';
import { setTimeout } from 'k6/timers';

export default async function () {
  // Define a number stream that emits numbers from 1 to 10 every second
  const stream = numbersStream();
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    if (value === 8) {
      // Cancel the stream when the number is 8, any enqueued chunks are lost
      await reader.cancel('cancelling the stream');
      break;
    }
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
