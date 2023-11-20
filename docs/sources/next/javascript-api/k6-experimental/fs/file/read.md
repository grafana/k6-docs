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

{{< code >}}

```javascript
import { open, SeekMode } from 'k6/experimental/fs';

let file;
(async function () {
  file = await open('bonjour.txt');
})();

export default async function () {
  // About information about the file
  const fileinfo = await file.stat();
  if (fileinfo.name != 'bonjour.txt') {
    throw new Error('Unexpected file name');
  }

  const buffer = new Uint8Array(4);

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

  // Check that we read the expected number of bytes
  if (totalBytesRead != fileinfo.size) {
    throw new Error('Unexpected number of bytes read');
  }

  // Seek back to the beginning of the file
  await file.seek(0, SeekMode.Start);
}
```

{{< /code >}}
