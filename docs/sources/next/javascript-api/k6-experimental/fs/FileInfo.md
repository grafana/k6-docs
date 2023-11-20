---
title: 'FileInfo'
excerpt: 'FileInfo represents information about a file.'
weight: 30
---

# FileInfo

The `FileInfo` class represents information about a [file](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file).

## Properties

| Property | Type   | Description                    |
| :------- | :----- | :----------------------------- |
| name     | string | The name of the file.          |
| size     | number | The size of the file in bytes. |

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
