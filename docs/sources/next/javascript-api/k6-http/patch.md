---
title: 'patch( url, [body], [params] )'
description: 'Issue an HTTP PATCH request.'
description: 'Issue an HTTP PATCH request.'
weight: 10
---

# patch( url, [body], [params] )

| Parameter         | Type                                                                                            | Description                                                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| url               | string /[HTTP URL](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/url#returns) | Request URL (e.g. `http://example.com`).                                                                                         |
| body (optional)   | string / object / ArrayBuffer                                                                   | Request body; objects will be `x-www-form-urlencoded`.                                                                           |
| params (optional) | object                                                                                          | [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) object containing additional request parameters |

### Returns

| Type                                                                                 | Description           |
| ------------------------------------------------------------------------------------ | --------------------- |
| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) | HTTP Response object. |

### Example

{{< code >}}

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

{{< /code >}}
