---
title: 'post( url, [body], [params] )'
description: 'Issue an HTTP POST request.'
---

| Parameter           | Type                          | Description                                                                              |
| ------------------- | ----------------------------- | ---------------------------------------------------------------------------------------- |
| `url`               | string                        | Request URL (e.g. `http://example.com`).                                                 |
| `body`              | string / object / ArrayBuffer | Request body; objects will be `x-www-form-urlencoded`.                                   |
| `params` (optional) | object                        | [Params](/javascript-api/k6-http/params) object containing additional request parameters |

### Returns

| Type       | Description                                               |
| ---------- | --------------------------------------------------------- |
| `Response` | HTTP [Response](/javascript-api/k6-http/response) object. |

### Example

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/post';
const logoBin = open('./logo.png', 'b');

export default function () {
  let data = { name: 'Bert' };

  // Using a JSON string as body
  let res = http.post(url, JSON.stringify(data),
                      { headers: { 'Content-Type': 'application/json' } });
  console.log(JSON.parse(res.body).json.name);

  // Using an object as body, the headers will automatically include
  // 'Content-Type: application/x-www-form-urlencoded'.
  res = http.post(url, data);
  console.log(JSON.parse(res.body).form.name);

  // Using an ArrayBuffer as body, allowing more flexibility when
  // building requests with binary data.
  // Make sure to open() the file as binary (with the 'b' argument),
  // then wrap the raw binary array in a TypedArray view, and pass the
  // underlying ArrayBuffer to http.post().
  data = new Uint8Array(logoBin);
  http.post(url, data.buffer, { headers: { 'Content-Type': 'image/png' }});
}
```

</CodeGroup>
