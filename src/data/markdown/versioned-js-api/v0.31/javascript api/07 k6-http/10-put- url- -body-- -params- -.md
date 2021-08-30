---
title: 'put( url, [body], [params] )'
description: 'Issue an HTTP PUT request.'
excerpt: 'Issue an HTTP PUT request.'
---

| Parameter         | Type                          | Description                                                                                     |
| ----------------- | ----------------------------- | ----------------------------------------------------------------------------------------------- |
| url               | string                        | Request URL (e.g. `http://example.com`).                                                        |
| body (optional)   | string / object / ArrayBuffer | Request body; objects will be `x-www-form-urlencoded`.                                          |
| params (optional) | object                        | [Params](/v0.31/javascript-api/k6-http/params) object containing additional request parameters. |

### Returns

| Type     | Description                                                     |
| -------- | --------------------------------------------------------------- |
| Response | HTTP [Response](/v0.31/javascript-api/k6-http/response) object. |

### Example

<CodeGroup labels={[], lineNumbers=[true]}>

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/put';

export default function () {
  const headers = { 'Content-Type': 'application/json' };
  const data = { name: 'Bert' };

  let res = http.put(url, JSON.stringify(data), { headers: headers });

  console.log(JSON.parse(res.body).json.name);
}
```

</CodeGroup>
