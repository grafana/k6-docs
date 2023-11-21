---
title: 'open'
excerpt: 'open opens a file and returns a promise resolving to a File instance.'
weight: 20
---

# open

The `open` function opens a file and returns a promise that resolves to a [File](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file) instance. This function loads the file into shared memory space accessible by all Virtual Users (VUs). This approach significantly ~reduces the memory footprint~, enabling the handling of large files without overwhelming memory resources.

### Asynchronous Nature

It's important to note that `open` is asynchronous and returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Due to k6's current limitation with the Init context (which doesn't support asynchronous functions directly), you need to use an asynchronous wrapper like this:

{{< code >}}

```javascript
let file;
(async function () {
  file = await open('bonjour.txt');
})();
```

{{< /code >}}

## Parameters

| Parameter | Type   | Description                                                                          |
| :-------- | :----- | :----------------------------------------------------------------------------------- |
| path      | string | The path to the file to open. Relative paths are resolved relative to the k6 script. |

## Returns

A promise resolving to a [File](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/fs/file) instance.

## Example

{{< code >}}

```javascript
import { open } from 'k6/experimental/fs';

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

  console.log(JSON.stringify(fileinfo));
}
```

{{< /code >}}
