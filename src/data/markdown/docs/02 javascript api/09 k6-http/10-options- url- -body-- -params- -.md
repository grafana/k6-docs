---
title: "options( url, [body], [params] )"
description: "Issue an HTTP OPTIONS request."
excerpt: "Issue an HTTP OPTIONS request."
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-http/options/
---

| Parameter         | Type                          | Description                                                                                           |
| ----------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| url               | string / [HTTP URL](/javascript-api/k6-http/urlurl#returns)                    | Request URL (e.g. `http://example.com`).                                                              |
| body (optional)   | string / object / ArrayBuffer | Request body; objects will be `x-www-form-urlencoded`.                                                |
| params (optional) | object                        | [Params](/javascript-api/k6-http/params) object containing additional request parameters.             |


### Returns

| Type     | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| Response | HTTP [Response](/javascript-api/k6-http/response) object. |


### Example

<CodeGroup labels={[], lineNumbers=[true]}>

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/';

export default function () {
  const params = { headers: { 'X-MyHeader': 'k6test' } };
  const res = http.options(url, null, params);
  console.log(res.headers['Allow']);
}
```

</CodeGroup>
