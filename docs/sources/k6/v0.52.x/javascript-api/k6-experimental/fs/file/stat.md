---
title: 'stat'
description: 'stat returns a promise resolving to a FileInfo object with information about the file.'
weight: 40
---

# stat

The `stat` method returns a promise resolving to a [FileInfo](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/fileinfo) object with information about the file.

## Returns

A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) resolving to a [FileInfo](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/fileinfo) object with information about the file.

## Examples

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

  console.log(JSON.stringify(fileinfo));
}
```

{{< /code >}}
