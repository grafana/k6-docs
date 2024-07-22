---
title: 'del( url, [body], [params] )'
description: 'Issue an HTTP DELETE request.'
excerpt: 'Issue an HTTP DELETE request.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-http/del/
---

Make a DELETE request.

| Parameter                    | Type            | Description                                                                                                                                                                                                                                     |
| ---------------------------- | --------------- | -----------------------------------------------------------------------------------------                                                                                                                                                       |
| url                          | string / [HTTP URL](/javascript-api/k6-http/urlurl#returns) | Request URL (e.g. `http://example.com`).                                                                                                                                                                                                        |
| body (optional, discouraged) | string / object / ArrayBuffer | Request body; objects will be `x-www-form-urlencoded`. This is discouraged, because sending a DELETE request with a body has [no defined semantics](https://tools.ietf.org/html/rfc7231#section-4.3.5) and may cause some servers to reject it. |
| params (optional)            | object          | [Params](/javascript-api/k6-http/params) object containing additional request parameters.                                                                                                                                                       |

### Returns

| Type     | Description                                               |
| -------- | --------------------------------------------------------- |
| Response | HTTP [Response](/javascript-api/k6-http/response) object. |

### Example

<CodeGroup labels={[], lineNumbers=[true]}>

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/delete';

export default function () {
  const params = { headers: { 'X-MyHeader': 'k6test' } };
  http.del(url, null, params);
}
```

</CodeGroup>
