---
title: 'streams'
description: 'k6 streams experimental API'
weight: 10
---

# streams

{{< docs/shared source="k6" lookup="experimental-module.md" version="<K6_VERSION>" >}}

The k6 streams experimental module provides an implementation of the Streams API specification, providing a way to define and consume streams of data within your test scripts. It currently implements a subset of the full specification, and offers support for defining and consuming readable streams.

## Concepts and usage

Streaming involves breaking a resource that one wants to process or consume into smaller chunks, which can be processed or consumed incrementally. This is particularly useful when dealing with large files or data sources, as it allows you to work with the data in smaller, more manageable pieces.

With the Streams API support in k6, you can start processing raw data with Javascript bit by bit, as soon as it's available, without needing to generate a full in-memory representation of the data. This helps to reduce memory usage and improve performance, especially when working with large data sets.

## API Overview

| Class                                                                                                           | Description                           |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| [ReadableStream](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestream) | Represents a readable stream of data. |

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
