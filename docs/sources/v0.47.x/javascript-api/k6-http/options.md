---
title: 'options( url, [body], [params] )'
description: 'Issue an HTTP OPTIONS request.'
description: 'Issue an HTTP OPTIONS request.'
weight: 10
---

# options( url, [body], [params] )

| Parameter         | Type                                                                                            | Description                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| url               | string /[HTTP URL](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/url#returns) | Request URL (e.g. `http://example.com`).                                                                                          |
| body (optional)   | string / object / ArrayBuffer                                                                   | Request body; objects will be `x-www-form-urlencoded`.                                                                            |
| params (optional) | object                                                                                          | [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) object containing additional request parameters. |

### Returns

| Type     | Description                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------- |
| Response | HTTP [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) object. |

### Example

{{< code >}}

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/';

export default function () {
  const params = { headers: { 'X-MyHeader': 'k6test' } };
  const res = http.options(url, null, params);
  console.log(res.headers['Allow']);
}
```

{{< /code >}}
