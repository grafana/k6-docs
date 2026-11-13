---
title: 'query( url, [body], [params] )'
description: 'Issue an HTTP QUERY request.'
weight: 10
---

# query( url, [body], [params] )

`http.query()` issues an HTTP [QUERY](https://datatracker.ietf.org/doc/html/rfc10008) request, defined in RFC 10008. QUERY is safe and idempotent like GET, but carries a request body, which makes it a good fit for queries that are too large, complex, or sensitive to put in the URL.

| Parameter           | Type                                                                                            | Description                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `url`               | string /[HTTP URL](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/url#returns) | Request URL (e.g. `http://example.com`).                                                                                          |
| `body`              | string / object / ArrayBuffer                                                                   | Request body; objects will be `x-www-form-urlencoded`.                                                                            |
| `params` (optional) | object                                                                                          | [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) object containing additional request parameters. |

For object bodies without file uploads, refer to the [form encoding rules](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/request#form-encoded-request-bodies).

### Returns

| Type       | Description                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------- |
| `Response` | HTTP [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) object. |

### Example

```javascript
import http from 'k6/http';

const url = 'https://quickpizza.grafana.com/api/query';

export default function () {
  const headers = { 'Content-Type': 'application/json' };
  const query = { maxPrice: 15, filters: ['vegetarian'] };

  const res = http.query(url, JSON.stringify(query), { headers: headers });

  console.log(JSON.parse(res.body).json);
}
```
