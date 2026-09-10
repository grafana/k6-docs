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

### Form-encoded request bodies

When you pass a JavaScript object as the body without file uploads, k6 encodes it as `application/x-www-form-urlencoded`:

- `null` and `undefined` become empty values, such as `name=`. The field remains in the request.
- Arrays produce repeated keys, such as `tag=one&tag=two`.
- Nested objects and nested arrays become empty values and cause k6 to log a warning. This also applies to objects inside arrays.

For example, `{ name: null, tags: ['one', null] }` becomes `name=&tags=one&tags=`.
To preserve nested data, serialize the body with `JSON.stringify()` and set the `Content-Type` header to `application/json`. Setting the header alone does not convert an object body to JSON.

These rules also apply to methods such as [post()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/post).

### Returns

| Type     | Description                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------- |
| Response | HTTP [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) object. |

### Example

Using http.request() to issue a POST request:

```javascript
import http from 'k6/http';

const url = 'https://quickpizza.grafana.com/api/post';

export default function () {
  const data = { name: 'Bert' };

  // Using a JSON string as body
  let res = http.request('POST', url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(res.json().name); // Bert

  // Using an object as body, the headers will automatically include
  // 'Content-Type: application/x-www-form-urlencoded'.
  res = http.request('POST', url, data);
  console.log(res.body); // name=Bert
}
```
