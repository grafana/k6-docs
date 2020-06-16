---
title: 'post( url, [body], [params] )'
description: 'Issue an HTTP POST request.'
---

| Parameter           | Type            | Description                                                                                      |
| ------------------- | --------------- | ------------------------------------------------------------------------------------------------ |
| `url`               | string          | Request URL (e.g. `http://example.com`).                                                         |
| `body`              | string / object | Request body; objects will be `x-www-form-urlencoded`.                                           |
| `params` (optional) | object          | [Params](/javascript-api/k6-http/params) object containing additional request parameters |

### Returns

| Type       | Description                                                       |
| ---------- | ----------------------------------------------------------------- |
| `Response` | HTTP [Response](/javascript-api/k6-http/response) object. |

### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import http from "k6/http";

export default function() {
  const url = 'https://httpbin.org/post';
  let headers = {'Content-Type': 'application/json'};
  let data = { name: 'Bert' };

  let res = http.post(url, JSON.stringify(data), {headers: headers});
  console.log(JSON.parse(res.body).json.name);

  headers = {'Content-Type': 'application/x-www-form-urlencoded'};

  res = http.post(url, data, {headers: headers});
  console.log(JSON.parse(res.body).form.name);
};
```

</div>
