---
title: 'request( method, url, [body], [params] )'
description: 'Issue any type of HTTP request.'
---

| Parameter         | Type                          | Description                                                                               |
| ----------------- | ----------------------------- | ----------------------------------------------------------------------------------------- |
| method            | string                        | Request method (e.g. `POST`). Note, the method must be uppercase.                         |
| url               | string                        | Request URL (e.g. `http://example.com`).                                                  |
| body (optional)   | string / object / ArrayBuffer | Request body; objects will be `x-www-form-urlencoded`.                                    |
| params (optional) | object                        | [Params](/javascript-api/k6-http/params) object containing additional request parameters. |

### Returns

| Type     | Description                                               |
| -------- | --------------------------------------------------------- |
| Response | HTTP [Response](/javascript-api/k6-http/response) object. |

### Example

Using http.request() to issue a POST request:

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/post';
const logoBin = open('./logo.png', 'b');

export default function () {
  let data = { name: 'Bert' };

  // Using a JSON string as body
  let res = http.request('POST', url, JSON.stringify(data),
                         { headers: { 'Content-Type': 'application/json' } });
  console.log(JSON.parse(res.body).json.name);

  // Using an object as body, the headers will automatically include
  // 'Content-Type: application/x-www-form-urlencoded'.
  res = http.request('POST', url, data);
  console.log(JSON.parse(res.body).form.name);

  // Using an ArrayBuffer as body, allowing more flexibility when
  // building requests with binary data.
  // Make sure to open() the file as binary (with the 'b' argument),
  // then wrap the raw binary array in a TypedArray view, and pass the
  // underlying ArrayBuffer to http.post().
  data = new Uint8Array(logoBin);
  http.request('POST', url, data.buffer, { headers: { 'Content-Type': 'image/png' }});
}
```

</CodeGroup>
