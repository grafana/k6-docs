---
title: 'request( method, url, [body], [params] )'
description: 'Issue any type of HTTP request.'
excerpt: 'Issue any type of HTTP request.'
---

| Parameter         | Type                          | Description                                                                                     |
| ----------------- | ----------------------------- | ----------------------------------------------------------------------------------------------- |
| method            | string                        | Request method (e.g. `POST`). Note, the method must be uppercase.                               |
| url               | string                        | Request URL (e.g. `http://example.com`).                                                        |
| body (optional)   | string / object / ArrayBuffer | Request body; objects will be `x-www-form-urlencoded`.                                          |
| params (optional) | object                        | [Params](/javascript-api/v0.32/k6-http/params) object containing additional request parameters. |

### Returns

| Type     | Description                                                     |
| -------- | --------------------------------------------------------------- |
| Response | HTTP [Response](/javascript-api/v0.32/k6-http/response) object. |

### Example

Using http.request() to issue a POST request:

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/post';

export default function () {
  let data = { name: 'Bert' };

  // Using a JSON string as body
  let res = http.request('POST', url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(res.json().json.name); // Bert

  // Using an object as body, the headers will automatically include
  // 'Content-Type: application/x-www-form-urlencoded'.
  res = http.request('POST', url, data);
  console.log(res.json().form.name); // Bert
}
```

</CodeGroup>
