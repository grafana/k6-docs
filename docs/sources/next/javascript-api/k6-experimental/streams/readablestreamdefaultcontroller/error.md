---
title: 'error(reason)'
description: 'The error method of the ReadableStreamDefaultController makes any future interactions with the associated stream to error.'
weight: 40
---

# error(reason)

The `error()` method of the [ReadableStreamDefaultController](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller) makes any future interactions with the associated stream to error.

## Parameters

| Name | Type | Description                                                     |
| ---- | ---- | --------------------------------------------------------------- |
| e    | any  | The error to return to any future interactions with the stream. |

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
          // Error the stream when the number is divisible by 8
          controller.error('erroring the stream because we received a multiple of 8');
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
