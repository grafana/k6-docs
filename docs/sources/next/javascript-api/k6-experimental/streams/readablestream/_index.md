---
title: 'ReadableStream'
description: 'ReadableStream represents a readable stream of data.'
weight: 10
---

# ReadableStream

The `ReadableStream` type represents a readable stream of data.

## Constructing a ReadableStream

The constructor creates a new `ReadableStream` object.

It takes two **optional** arguments, `underlyingsource` allowing to define the underlying source of data, as well as the queuing strategy to adopt.

```javascript
import { ReadableStream } from 'k6/experimental/streams';

new ReadableStream(
  {
    start(controller) {
      // Perform any setup tasks
    },

    pull(controller) {
      // Fetch and queue data into the stream
    },

    cancel(reason) {
      // Perform any cleanup tasks
    },

    type: 'default',
  },
  {
    highWaterMark: 1,
    size(chunk) {
      return 1;
    },
  }
);
```

### Constructor arguments

#### underlyingSource (optional)

The `underlyingSource` argument is an object that defines the source of data for the stream. It can be an object with the following properties:

- `start(controller)`: An **optional** function that is called when the stream is created. It can be used to perform any setup tasks. The content of this method is to be defined by the user. The `controller` parameter passed to this method is a [ReadableStreamDefaultController](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller) object.
- `pull(controller)`: An **optional** function that is called repeatedly to fetch and queue data into the stream, until it reaches its high water mark. If `pull()` returns a promise, it won't be called again until the promise is resolved. The `controller` parameter passed to this method is a [ReadableStreamDefaultController](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller) object.
- `cancel(reason)`: An **optional** function, defined by the user, that is called when the stream is canceled. It can be used to release access to the stream source and perform any cleanup tasks. The `reason` parameter passed to this method is an optional human-readable value that represents the reason for canceling the stream.
- `type`: An **optional** string that specifies the type of the underlying source. It can currently only receive the value `'default'` which is its default value.

#### queuingStrategy argument (optional)

The `queuingStrategy` argument is an object that defines the queuing strategy to adopt for the stream. It can be an object with the following properties:

- `highWaterMark`: An **optional** number that represents the maximum number of chunks that the stream can hold in its internal queue. The default value is `1`.
- `size(chunk)`: An **optional** function that returns the size of the chunk passed as an argument. The default value is a function that returns `1`.

Although you can define your own custom queueing strategy, the default behavior and recommended way to use the `ReadableStream` is to use a [CountQueuingStrategy](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestream/countqueuingstrategy) object.

## Methods

| Name                                                                                                                    | Description                                             |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [cancel(reason)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestream/cancel) | Closes the stream and signals a reason for the closure. |
| [getReader()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestream/getreader) | Returns a `ReadableStreamDefaultReader` object.         |

## Examples

The simplest illustrative example of using a `ReadableStream` is to create a stream of numbers.

{{< code >}}

```javascript
import { ReadableStream } from 'k6/experimental/streams';
import { setTimeout } from 'k6/timers';

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

export default async function () {
  const stream = numbersStream();
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log(`received number ${value} from stream`);
  }

  console.log('we are done');
}
```

{{< /code >}}

A much more useful illustration of defining a `ReadableStream` is to read lines from a file.

{{< code >}}

```javascript
import { open } from 'k6/experimental/fs';
import { ReadableStream } from 'k6/experimental/streams';

// Open a csv file containing the data to be read
let file;
(async function () {
  file = await open('./data.csv');
})();

export default async function () {
  let lineReaderState;

  // Define a ReadableStream that reads lines from the file
  // and parses them into objects with name and color properties.
  const fileLinesStream = new ReadableStream({
    // The start function is called when the readable stream is
    // created. In here, you can connect to the data source
    // and perform administrative tasks.
    async start(controller) {
      lineReaderState = {
        buffer: new Uint8Array(1024),
        remaining: '',
      };
    },

    // The pull function is called repeatedly to get data, while the
    // internal high water mark is not reached.
    async pull(controller) {
      const line = await getNextLine(file, lineReaderState);
      if (line === null) {
        controller.close();
        return;
      }

      const [name, color] = line.split(',');
      controller.enqueue({ name, color });
    },
  });

  // Obtain and lock a reader to the stream
  const reader = fileLinesStream.getReader();

  try {
    // Read and process each items from the stream
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      console.log(value);
    }
  } catch (error) {
    console.error('Stream reading failed: ', error);
  }
}

// getNextLine reads the next line from the file and returns it.
//
// It reads the file in chunks and buffers the remaining data
// to handle partial lines. It returns null when there are no
// more lines to read.
async function getNextLine(file, state) {
  while (true) {
    if (state.remaining.includes('\n')) {
      const lineEndIndex = state.remaining.indexOf('\n');
      const line = state.remaining.substring(0, lineEndIndex).trim();

      state.remaining = state.remaining.substring(lineEndIndex + 1);

      if (line) {
        return line;
      }
    } else {
      const bytesRead = await file.read(state.buffer);
      if (bytesRead === null) {
        // EOF

        if (state.remaining) {
          const finalLine = state.remaining.trim();

          // Clear the remaining to signal the end
          state.remaining = '';

          // Return the last non-empty line
          return finalLine;
        }

        // Indicate that there are no more lines to read
        return null;
      }

      state.remaining += String.fromCharCode.apply(
        null,
        new Uint8Array(state.buffer.slice(0, bytesRead))
      );
    }
  }
}
```

{{< /code >}}
