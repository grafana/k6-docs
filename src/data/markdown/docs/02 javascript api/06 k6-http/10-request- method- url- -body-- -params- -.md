---
title: 'request( method, url, [body], [params] )'
description: 'Issue any type of HTTP request.'
---

| Parameter         | Type            | Description                                                                               |
| ----------------- | --------------- | ----------------------------------------------------------------------------------------- |
| method            | string          | Request method (e.g. `POST`). Note, the method must be uppercase.                         |
| url               | string          | Request URL (e.g. `http://example.com`).                                                  |
| body (optional)   | string / object | Request body; objects will be `x-www-form-urlencoded`.                                    |
| params (optional) | object          | [Params](/javascript-api/k6-http/params) object containing additional request parameters. |

### Returns

| Type     | Description                                               |
| -------- | --------------------------------------------------------- |
| Response | HTTP [Response](/javascript-api/k6-http/response) object. |

### Example

Using http.request() to issue a POST request, logging in to an e-commerce site:

<CodeGroup labels={[]}>

```js
import http from 'k6/http';

export default function () {
  const url = 'https://httpbin.org/post';
  let headers = { 'Content-Type': 'application/json' };
  let data = { name: 'Bert' };

  let res = http.request('POST', url, JSON.stringify(data), {
    headers: headers,
  });
  console.log(JSON.parse(res.body).json.name);

  headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

  res = http.request('POST', url, data, { headers: headers });
  console.log(JSON.parse(res.body).form.name);
}
```

</CodeGroup>
