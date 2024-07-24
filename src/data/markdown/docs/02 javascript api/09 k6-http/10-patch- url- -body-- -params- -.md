---
title: 'patch( url, [body], [params] )'
description: 'Issue an HTTP PATCH request.'
excerpt: 'Issue an HTTP PATCH request.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-http/patch/
---

| Parameter         | Type                          | Description                                                                              |
| ----------------- | ----------------------------- | ---------------------------------------------------------------------------------------- |
| url               | string / [HTTP URL](/javascript-api/k6-http/urlurl#returns)       | Request URL (e.g. `http://example.com`).                                                 |
| body (optional)   | string / object / ArrayBuffer | Request body; objects will be `x-www-form-urlencoded`.                                   |
| params (optional) | object                        | [Params](/javascript-api/k6-http/params) object containing additional request parameters |

### Returns

| Type                                         | Description           |
| -------------------------------------------- | --------------------- |
| [Response](/javascript-api/k6-http/response) | HTTP Response object. |

### Example

<CodeGroup labels={[], lineNumbers=[true]}>

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/patch';

export default function () {
  const headers = { 'Content-Type': 'application/json' };
  const data = { name: 'Bert' };

  const res = http.patch(url, JSON.stringify(data), { headers: headers });

  console.log(JSON.parse(res.body).json.name);
}
```

</CodeGroup>
