---
title: 'CountQueuingStrategy'
description: 'The CountQueuingStrategy interface of the Streams API represents a built-in queuing strategy that counts the number of chunks in the queue.'
weight: 300
---

# CountQueuingStrategy

The `CountQueuingStrategy` interface of the Streams API represents a built-in queuing strategy that counts the number of chunks in the queue.

## Properties

| Name          | Type   | Description                                              |
| ------------- | ------ | -------------------------------------------------------- |
| highWaterMark | number | The maximum number of chunks that the queue can contain. |

## Example

{{< code >}}

```javascript
import { CountQueuingStrategy, ReadableStream } from 'k6/experimental/streams';
import { setTimeout } from 'k6/timers';

export default async function () {
  // Define a number stream that emits numbers from 1 to 10 every second
  const stream = numbersStream();

  // We use the getReader method to create a reader and lock the stream to it
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log(`received number ${value} from stream`);
  }
}

function numbersStream() {
  let currentNumber = 0;

  // Using the CountQueuingStrategy to limit the number of chunks in the queue to 5
  const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 5 });

  return new ReadableStream(
    {
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
    },
    queuingStrategy
  );
}
```

{{< /code >}}
