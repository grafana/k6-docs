---
title: 'FileData'
description: 'Used for wrapping data representing a file when doing multipart requests (file uploads).'
excerpt: 'Used for wrapping data representing a file when doing multipart requests (file uploads).'
---

_FileData_ is an object for wrapping data representing a file when doing
[multipart requests (file uploads)](/examples/data-uploads#multipart-request-uploading-a-file).
You create it by calling [http.file( data, [filename], [contentType] )](/javascript-api/k6-http/file).

| Name                  | Type                         | Description                                                              |
| --------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| FileData.data         | string / Array / ArrayBuffer | File data as string, array of numbers, or an `ArrayBuffer` object. |
| FileData.content_type | string                       | The content type that will be specified in the multipart request.        |
| FileData.filename     | string                       | The filename that will be specified in the multipart request.            |

### Example

<CodeGroup labels={[]}>

```javascript
import { sleep } from 'k6';
import { md5 } from 'k6/crypto';
import http from 'k6/http';

const binFile = open('/path/to/file.bin', 'b');

export default function () {
  const f = http.file(binFile, 'test.bin');
  console.log(md5(f.data, 'hex'));
  console.log(f.filename);
  console.log(f.content_type);
}
```

</CodeGroup>
