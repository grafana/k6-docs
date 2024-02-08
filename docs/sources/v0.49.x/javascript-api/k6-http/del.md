---
title: 'del( url, [body], [params] )'
description: 'Issue an HTTP DELETE request.'
description: 'Issue an HTTP DELETE request.'
weight: 10
---

# del( url, [body], [params] )

Make a DELETE request.

| Parameter                    | Type                                                                                            | Description                                                                                                                                                                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url                          | string /[HTTP URL](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/url#returns) | Request URL (e.g. `http://example.com`).                                                                                                                                                                                                        |
| body (optional, discouraged) | string / object / ArrayBuffer                                                                   | Request body; objects will be `x-www-form-urlencoded`. This is discouraged, because sending a DELETE request with a body has [no defined semantics](https://tools.ietf.org/html/rfc7231#section-4.3.5) and may cause some servers to reject it. |
| params (optional)            | object                                                                                          | [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) object containing additional request parameters.                                                                                                               |

### Returns

| Type     | Description                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------- |
| Response | HTTP [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) object. |

### Example

{{< code >}}

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/delete';

export default function () {
  const params = { headers: { 'X-MyHeader': 'k6test' } };
  http.del(url, null, params);
}
```

{{< /code >}}
