---
title: 'post( url, [body], [params] )'
description: 'Issue an HTTP POST request.'
description: 'Issue an HTTP POST request.'
weight: 10
---

# post( url, [body], [params] )

| Parameter           | Type                                                                                            | Description                                                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `url`               | string /[HTTP URL](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/url#returns) | Request URL (e.g. `http://example.com`).                                                                                         |
| `body`              | string / object / ArrayBuffer                                                                   | Request body; objects will be `x-www-form-urlencoded`.                                                                           |
| `params` (optional) | object                                                                                          | [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) object containing additional request parameters |

### Returns

| Type       | Description                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------- |
| `Response` | HTTP [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) object. |

### Example

{{< code >}}

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/post';
const logoBin = open('./logo.png', 'b');

export default function () {
  let data = { name: 'Bert' };

  // Using a JSON string as body
  let res = http.post(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(res.json().json.name); // Bert

  // Using an object as body, the headers will automatically include
  // 'Content-Type: application/x-www-form-urlencoded'.
  res = http.post(url, data);
  console.log(res.json().form.name); // Bert

  // Using a binary array as body. Make sure to open() the file as binary
  // (with the 'b' argument).
  http.post(url, logoBin, { headers: { 'Content-Type': 'image/png' } });

  // Using an ArrayBuffer as body. Make sure to pass the underlying ArrayBuffer
  // instance to http.post(), and not the TypedArray view.
  data = new Uint8Array([104, 101, 108, 108, 111]);
  http.post(url, data.buffer, { headers: { 'Content-Type': 'image/png' } });
}
```

{{< /code >}}
