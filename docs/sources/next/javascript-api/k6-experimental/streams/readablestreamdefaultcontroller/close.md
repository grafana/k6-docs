---
title: 'close'
description: 'The close method closes the associated stream.'
weight: 20
---

# close

The `close()` method of the [ReadableStreamDefaultController](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller) interface closes the associated stream.

Readers will still be able to read any previously enqueued chunks from stream. Once those chunks are read, the stream will be closed and no more data will be available.

## Exceptions

| Exception | Description                                                                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TypeError | Thrown when the source object is not a [ReadableStreamDefaultController](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller). |

## Example

{{< code >}}

```javascript
import { ReadableStream } from 'k6/experimental/streams';
import { setTimeout } from 'k6/timers';

export default async function () {
  let currentNumber = 0;

  const stream = new ReadableStream({
    start(controller) {
      const fn = () => {
        if (currentNumber % 8 == 0) {
          // Close the stream when the number is divisible by 8
          controller.close();
          return;
        }

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

  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log(`received number ${value} from stream`);
  }
}
```

{{< /code >}}
