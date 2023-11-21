---
title: 'read'
excerpt: 'the read method is used to read a chunk of the file.'
weight: 20
---

# read

The `read` method is used to read a chunk of the file into an [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) buffer.

It resolves to either the number of bytes read during the operation, or `null` if there was nothing more to read.

## Parameters

| Parameter | Type                                                                                                      | Description                       |
| :-------- | :-------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| buffer    | [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | The buffer to read the data into. |

## Returns

A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) resolving to the number of bytes read or `null` if the end of the file has been reached.

## Example

### Reading a file

In the following example, we open a file and read it in chunks of 128 bytes until we reach the end of the file.

{{< code >}}

```javascript
import { open, SeekMode } from 'k6/experimental/fs';

let file;
(async function () {
  file = await open('bonjour.txt');
})();

export default async function () {
  const buffer = new Uint8Array(128);

  let totalBytesRead = 0;
  while (true) {
    // Read into the buffer
    const bytesRead = await file.read(buffer);
    if (bytesRead == null) {
      // EOF
      break;
    }

    // Do something useful with the content of the buffer
    totalBytesRead += bytesRead;

    // If bytesRead is less than the buffer size, we've read the whole file
    if (bytesRead < buffer.byteLength) {
      break;
    }
  }

  // Seek back to the beginning of the file
  await file.seek(0, SeekMode.Start);
}
```

{{< /code >}}

### `readAll` helper function

The following helper function can be used to read the entire contents of a file into a [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) buffer.

{{< code >}}

```javascript
import { open, SeekMode } from 'k6/experimental/fs';

let file;
(async function () {
  file = await open('bonjour.txt');
})();

async function readAll(file, bufferSize = 128) {
  // Obtain the size of the file
  const fileInfo = await file.stat();
  const fileSize = fileInfo.size;

  // Prepare a buffer to store the file content
  const fileContent = new Uint8Array(fileInfo.size);
  let fileOffset = 0;

  // Prepare a buffer to read the chunks of the file into
  const buffer = new Uint8Array(Math.min(bufferSize, fileSize));

  while (true) {
    // Read a chunk of the file
    const bytesRead = await file.read(buffer);
    if (bytesRead == null || bytesRead === 0) {
      // EOF
      break;
    }

    // Copy the content of the buffer into the file content buffer
    fileContent.set(buffer.slice(0, bytesRead), fileOffset);

    // Do something useful with the content of the buffer
    fileOffset += bytesRead;

    // If bytesRead is less than the buffer size, we've read the whole file
    if (bytesRead < buffer.byteLength) {
      break;
    }
  }

  return fileContent;
}

export default async function () {
  // Read the whole file
  const fileContent = await readAll(file);
  console.log(JSON.stringify(fileContent));

  // Seek back to the beginning of the file
  await file.seek(0, SeekMode.Start);
}
```

{{< /code >}}
