---
title: 'options( url, [body], [params] )'
description: 'Issue an HTTP OPTIONS request.'
excerpt: 'Issue an HTTP OPTIONS request.'
---

| Parameter         | Type                          | Description                                                                                     |
| ----------------- | ----------------------------- | ----------------------------------------------------------------------------------------------- |
| url               | string                        | Request URL (e.g. `http://example.com`).                                                        |
| body (optional)   | string / object / ArrayBuffer | Request body; objects will be `x-www-form-urlencoded`.                                          |
| params (optional) | object                        | [Params](/javascript-api/v0.31/k6-http/params) object containing additional request parameters. |

### Returns

| Type     | Description                                                     |
| -------- | --------------------------------------------------------------- |
| Response | HTTP [Response](/javascript-api/v0.31/k6-http/response) object. |

### Example

<CodeGroup labels={[], lineNumbers=[true]}>

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/';

export default function () {
  let params = { headers: { 'X-MyHeader': 'k6test' } };
  let res = http.options(url, null, params);
  console.log(res.headers['Allow']);
}
```

</CodeGroup>
