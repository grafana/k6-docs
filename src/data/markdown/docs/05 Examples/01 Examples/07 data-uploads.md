---
title: "Data Uploads"
excerpt: "Scripting examples on how to execute a load test that will upload a file to the System Under Test(SUT)."
---

Scripting examples on how to execute a load test that will upload a file to the System Under Test(SUT).

## Binary file upload

<div class="code-group" data-props='{ "labels": ["upload-bin-file.js"], "lineNumbers": [true] }'>

```js
import http from "k6/http";
import { sleep } from "k6";

const binFile = open("/path/to/file.bin", "b");

export default function() {
  var data = {
    file: http.file(binFile, "test.bin")
  };
  var res = http.post("https://example.com/upload", data);
  sleep(3);
}
```

</div>

### Relevant k6 APIs
- [open(filePath, [mode])](/javascript-api/init-context/open-filepath-mode)
- [http.file(data, [filename], [contentType])](/javascript-api/k6-http/file-data-filename-contenttype)

## Creating a multipart request
With multipart requests, you combine pieces of data with possibly different content types into one
request body. A common scenario is, for example, a form with regular text input fields and a file
field used for uploading a file:

<div class="code-group" data-props='{ "labels": ["multipart-upload.js"], "lineNumbers": [true] }'>

```js
import http from "k6/http";
import { sleep } from "k6";

let file = open("/path/to/file.txt");

export default function() {
  var data = {
    field: "this is a standard form field",
    file: http.file(file, "test.txt")
  };
  var res = http.post("https://example.com/upload", data);
  sleep(3);
}
```

</div>

### Relevant k6 APIs
- [open(filePath, [mode])](/javascript-api/init-context/open-filepath-mode)
- [http.file(data, [filename], [contentType])](/javascript-api/k6-http/file-data-filename-contenttype)

