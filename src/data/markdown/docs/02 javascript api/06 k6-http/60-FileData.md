---
title: "FileData"
category: "k6api-class"
description: "Used for wrapping data representing a file when doing multipart requests (file uploads)."
---

_FileData_ is an object for wrapping data representing a file when doing [multipart requests (file uploads)](/using-k6/multipart-requests-file-uploads). You create it by calling [http.file( data, [filename], [contentType] )](/javascript-api/k6-http/file-data-filename-contenttype).

| Name | Type | Description |
| ---- | ---- | ----------- |
| FileData.data | string / bytes | The bytes representing the file contents. |
| FileData.content_type | string | The content type that will be specified in the multipart request. |
| FileData.filename | string | The filename that will be specified in the multipart request. |


### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import { sleep } from "k6";
import { md5 } from "k6/crypto";
import http from "k6/http";

let binFile = open("/path/to/file.bin", "b");

export default function() {
  let f = http.file(binFile, "test.bin");
  console.log(md5(f.data, "hex"));
  console.log(f.filename);
  console.log(f.content_type);
}
```

</div>
