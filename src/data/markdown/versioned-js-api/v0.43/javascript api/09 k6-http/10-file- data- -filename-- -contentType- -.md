---
title: 'file( data, [filename], [contentType] )'
description: 'Create a file object that is used for building multi-part requests.'
excerpt: 'Create a file object that is used for building multi-part requests.'
---

Create a file object that is used for building [Multipart requests (file uploads)](/examples/data-uploads#multipart-request-uploading-a-file).

| Parameter   | Type                         | Description                                                                      |
| ----------- | ---------------------------- | -------------------------------------------------------------------------------- |
| data        | string / Array / ArrayBuffer | File data as string, array of numbers, or an `ArrayBuffer` object. |
| filename    | string                       | The filename to specify for this field (or "part") of the multipart request.     |
| contentType | string                       | The content type to specify for this field (or "part") of the multipart request. |

### Returns

| Type                                         | Description        |
| -------------------------------------------- | ------------------ |
| [FileData](/javascript-api/k6-http/filedata) | A FileData object. |

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
