---
title: 'seek'
description: 'seek sets the file position indicator for the file to the passed offset bytes.'
weight: 30
---

# seek

The `seek` method sets the file position indicator for the file to the passed `offset` bytes, under the mode given by `whence`. The call resolves to the new position within the resource (bytes from the start).

Based on the [SeekMode](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/seekmode) passed, the offset is interpreted as follows:

- when using `SeekMode.Start`, the offset must be greater than or equal to zero.
- when using `SeekMode.Current`, the offset can be positive or negative.
- when using `SeekMode.End`, the offset must be less than or equal to zero.

## Parameters

| Parameter | Type                                                                                            | Description                                                  |
| :-------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| offset    | number                                                                                          | The offset in bytes from the position specified by `whence`. |
| whence    | [SeekMode](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/seekmode) | The position from which the offset is applied.               |

## Returns

A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) resolving to the new offset within the file.

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
