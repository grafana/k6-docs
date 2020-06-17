---
title: "put( url, [body], [params] )"
description: "Issue an HTTP PUT request."
---

| Parameter         | Type   | Description                                                                                           |
| ----------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| url               | string | Request URL (e.g. `http://example.com`).                                                              |
| body (optional)   | string | object                                                                                                | Request body; objects will be `x-www-form-urlencoded`. |
| params (optional) | object | [Params](/javascript-api/k6-http/params) object containing additional request parameters. |


### Returns

| Type     | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| Response | HTTP [Response](/javascript-api/k6-http/response) object. |

### Example

<div class="code-group" data-props='{"labels": [], lineNumbers=[true]}'>

```js
import http from "k6/http";

export default function() {
  const url = 'https://httpbin.org/put';
  const headers = {'Content-Type': 'application/json'};
  const data = { name: 'Bert' };

  let res = http.put(url, JSON.stringify(data), {headers: headers});

  console.log(JSON.parse(res.body).json.name);
};
```

</div>
