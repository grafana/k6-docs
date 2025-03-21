---
title: 'SeekMode'
description: 'SeekMode is used to specify the position from which to seek in a file.'
weight: 40
---

# SeekMode

The `SeekMode` enum specifies the position from which to [seek](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file/seek) in a file.

## Members

| Member  | Value | Description                                 |
| :------ | :---- | :------------------------------------------ |
| Start   | 0     | Seek from the start of the file.            |
| Current | 1     | Seek from the current position in the file. |
| End     | 2     | Seek from the end of the file.              |

## Example

{{< code >}}

```javascript
import { open, SeekMode } from 'k6/experimental/fs';

let file;
(async function () {
  file = await open('bonjour.txt');
})();

export default async function () {
  // Seek 6 bytes from the start of the file
  await file.seek(6, SeekMode.Start);

  // Seek 2 more bytes from the current position
  await file.seek(2, SeekMode.Current);

  // Seek backwards 2 bytes from the end of the file
  await file.seek(-2, SeekMode.End);
}
```

{{< /code >}}
