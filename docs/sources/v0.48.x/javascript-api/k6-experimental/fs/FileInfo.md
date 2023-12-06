---
title: 'FileInfo'
description: 'FileInfo represents information about a file.'
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
  // Retrieve information about the file
  const fileinfo = await file.stat();
  if (fileinfo.name != 'bonjour.txt') {
    throw new Error('Unexpected file name');
  }
}
```

{{< /code >}}
