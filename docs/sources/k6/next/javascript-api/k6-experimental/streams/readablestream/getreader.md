---
title: 'getReader()'
description: 'Creates a reader and locks the stream to it.'
weight: 200
---

# getReader()

Creates a reader and locks the [stream](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestream) to it. While the stream is locked, no other reader can be acquired until this one is released.

## Arguments

The `getReader` method takes a single optional `options` argument, which is an object with the following properties:

| Name | Type   | Default value | Description                                                                                               |
| ---- | ------ | ------------- | --------------------------------------------------------------------------------------------------------- |
| mode | string | `undefined`   | A property that specifies the type of reader to create. It currently only supports the `undefined` value. |

## Return value

A [ReadableStreamDefaultReader](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultreader/) object instance.

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
