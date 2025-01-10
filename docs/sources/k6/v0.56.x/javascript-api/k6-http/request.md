---
title: 'request( method, url, [body], [params] )'
description: 'Issue any type of HTTP request.'
description: 'Issue any type of HTTP request.'
weight: 10
---

# request( method, url, [body], [params] )

| Parameter         | Type                                                                                            | Description                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| method            | string                                                                                          | Request method (e.g. `'POST'`). Must be uppercase.                                                                                |
| url               | string /[HTTP URL](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/url#returns) | Request URL (e.g. `'http://example.com'`).                                                                                        |
| body (optional)   | string / object / ArrayBuffer                                                                   | Request body; Objects will be `x-www-form-urlencoded` encoded.                                                                    |
| params (optional) | object                                                                                          | [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) object containing additional request parameters. |

### Returns

| Type     | Description                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------- |
| Response | HTTP [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) object. |

### Example

Using http.request() to issue a POST request:

{{< code >}}

```javascript
import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/post';

export default function () {
  const data = { name: 'Bert' };

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

{{< /code >}}
