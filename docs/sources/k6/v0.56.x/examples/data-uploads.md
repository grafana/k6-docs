---
title: 'Data Uploads'
description: 'Scripting examples on how to execute a load test that will upload a file to the System Under Test (SUT).'
weight: 09
---

# Data Uploads

Example to execute a load test that will upload a file to the System Under Test (SUT).

## The open() function

Using the built-in function [`open()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/init-context/open),
we can read the contents of a file given a filename or URL.

Below is a simple example showing how to load the contents of a local file `data.json`.

{{< code >}}

```json
{
  "my_key": "has a value"
}
```

{{< /code >}}

{{< code >}}

```javascript
const data = JSON.parse(open('./data.json'));

export default function () {
  console.log(data.my_key);
}
```

{{< /code >}}

If you want to open a binary file you need to pass in `"b"` as the second argument.

{{< code >}}

```javascript
const binFile = open('./image.png', 'b');

export default function () {
  //...
}
```

{{< /code >}}

## Multipart request (uploading a file)

Now that you know how to load a local file, let's look at a script that creates a POST request
to upload this data to an API endpoint along with a regular text field (`field` in the example
below):

{{< code >}}

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

const binFile = open('/path/to/file.bin', 'b');

export default function () {
  const data = {
    field: 'this is a standard form field',
    file: http.file(binFile, 'test.bin'),
  };

  const res = http.post('https://example.com/upload', data);
  sleep(3);
}
```

{{< /code >}}

In the example above we use the [http.file()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/file)
API to wrap the file contents in a [FileData](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/filedata) object.
When passing a JS object as the body parameter to [http.post()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/post),
or any of the other HTTP request functions, where one of the property values is a
[FileData](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/filedata) a multipart request will be constructed
and sent.

### Relevant k6 APIs

- [open(filePath, [mode])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/init-context/open)
- [http.file(data, [filename], [contentType])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/file)

## Advanced multipart request

The previous multipart request example has some limitations:

- It's not possible to assemble the parts in a specific order, because of the
  unordered nature of JS objects when they're converted to Golang maps, which k6 uses internally.
  Uploading files in a specific order is a requirement for some APIs (e.g. AWS S3).
- It's not possible to upload multiple files as part of the same form field, because
  JS object keys must be unique.

To address this we suggest using the [`FormData` polyfill for k6](https://jslib.k6.io/formdata/0.0.2/index.js).

Here's an example of uploading several binary files and a text file using the polyfill:

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

const img1 = open('/path/to/image1.png', 'b');
const img2 = open('/path/to/image2.jpg', 'b');
const txt = open('/path/to/text.txt');

export default function () {
  const fd = new FormData();
  fd.append('someTextField', 'someValue');
  fd.append('aBinaryFile', {
    data: new Uint8Array(img1).buffer,
    filename: 'logo.png',
    content_type: 'image/png',
  });
  fd.append('anotherTextField', 'anotherValue');
  fd.append('images', http.file(img1, 'image1.png', 'image/png'));
  fd.append('images', http.file(img2, 'image2.jpg', 'image/jpeg'));
  fd.append('text', http.file(txt, 'text.txt', 'text/plain'));

  const res = http.post('https://httpbin.test.k6.io/post', fd.body(), {
    headers: { 'Content-Type': 'multipart/form-data; boundary=' + fd.boundary },
  });
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
```

{{< /code >}}

Note that:

- Both binary files will be uploaded under the `images` form field, and the text file
  will appear last in the request under the `text` form field.
- It's required to specify the multipart boundary in the `Content-Type` header,
  so you must assemble the header manually as shown.
- Blob is not supported or implemented. For the same functionality, use
  a simple object with the fields `data`, `content_type` (defaulting to "application/octet-stream") and optionally
  `filename` as shown for `aBinaryFile` above.
