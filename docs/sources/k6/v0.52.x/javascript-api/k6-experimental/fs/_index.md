---
title: 'fs'
description: 'k6 fs experimental API'
weight: 10
---

# fs

{{< docs/shared source="k6" lookup="experimental-module.md" version="<K6_VERSION>" >}}

The k6 filesystem experimental module provides a memory-efficient way to handle file interactions within your test scripts. It currently offers support for opening files, reading their content, seeking through their content, and retrieving metadata about them.

### Memory efficiency

One of the key advantages of the filesystem module is its memory efficiency. Unlike the traditional [open](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/init-context/open/) function, which loads a file multiple times into memory, the filesystem module reduces memory usage by loading the file as little as possible and sharing the same memory space between all VUs. This approach reduces the risk of encountering out-of-memory errors, especially in load tests involving large files.

### Notes on usage

An important consideration when using the filesystem module is its handling of external file modifications. Once k6 loads a file, it behaves like a "view" over its contents. If you modify the underlying file during a test, k6 will not reflect those changes in the loaded [File](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file/) instance.

## API Overview

The module exports functions and objects to interact with the file system:

| Function/Object                                                                                 | Description                                                                                          |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [open](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/open)         | Opens a file and returns a promise resolving to a `File` instance.                                   |
| [File](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file)         | Represents a file with methods for reading, seeking, and obtaining file stats.                       |
| [SeekMode](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/seekmode) | Enum for specifying the reference point for seek operations. Includes `Start`, `Current`, and `End`. |

## Example

{{< code >}}

```javascript
import { open, SeekMode } from 'k6/experimental/fs';

// k6 doesn't support async in the init context. We use a top-level async function for `await`.
//
// Each Virtual User gets its own `file` copy.
// So, operations like `seek` or `read` won't impact other VUs.
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
