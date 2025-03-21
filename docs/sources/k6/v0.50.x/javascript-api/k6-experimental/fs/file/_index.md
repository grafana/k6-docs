---
title: 'File'
description: 'File represents a file with methods for reading, seeking, and obtaining file stats.'
weight: 10
---

# File

The `File` class represents a file with methods for reading, seeking, and obtaining file stats. It's returned by the [open](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/init-context/open/) function.

## Properties

| Property | Type   | Description                    |
| :------- | :----- | :----------------------------- |
| path     | string | The absolute path to the file. |

## Methods

| Method                                                                                       | Description                                                                                                                                                               |
| :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [read](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file/read) | Reads up to `buffer.byteLength` bytes from the file into the passed `buffer`. Returns a promise resolving to the number of bytes read.                                    |
| [seek](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file/seek) | Sets the file position indicator for the file to the passed `offset` bytes. Returns a promise resolving to the new offset.                                                |
| [stat](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file/stat) | Returns a promise resolving to a [FileInfo](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/fileinfo/) object with information about the file. |

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
