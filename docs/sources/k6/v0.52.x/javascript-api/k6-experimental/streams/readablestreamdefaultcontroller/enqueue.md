---
title: 'enqueue(chunk)'
description: 'The enqueue method of the ReadableStreamDefaultController interface enqueues a chunk of data into the associated stream.'
weight: 30
---

# enqueue(chunk)

The `enqueue()` method of the [ReadableStreamDefaultController](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller) interface enqueues a chunk of data into the associated stream.

## Parameters

| Name  | Type | Description                                   |
| ----- | ---- | --------------------------------------------- |
| chunk | any  | The chunk of data to enqueue into the stream. |

## Exceptions

| Exception | Description                                                                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TypeError | Thrown when the source object is not a [ReadableStreamDefaultController](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestreamdefaultcontroller). |

## Example

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
    // Read and process each item from the stream
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

          // Clear remaining to signal the end
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
