---
title: 'read'
description: "The read() method of the ReadableStreamDefaultReader interface returns a Promise providing access to the next chunk in the stream's internal queue."
weight: 30
---

# read

The `read()` method of the [ReadableStreamDefaultReader](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultreader) interface returns a promise providing access to the next chunk in the stream's internal queue.

## Returns

A promise which fullfils or rejects with a value depending on the state of the stream:

- If a chunk is avilable, the promise resolves with an object of the form: `{ done: false, value: chunkValue }`.
- If the stream is closed and no more data is available, the promise resolves with an object of the form: `{ done: true, value: undefined }`.
- If the stream is errored, the promise rejects with the error that caused the stream to error.

## Exceptions

| Exception | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TypeError | Thrown when the source object is not a [ReadableStreamDefaultReader](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultreader), the stream has no owner, or [ReadableStreamDefaultReader.releaseLock()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultreader/releaseLock) is called. |

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
