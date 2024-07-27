---
title: 'head(url, [body], [params])'
description: 'httpx.head makes HEAD requests'
excerpt: 'httpx.head makes HEAD requests'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/jslib/httpx/head/
redirect: https://grafana.com/docs/k6/latest/javascript-api/jslib/httpx/head/
---

`session.head(url, body, params)` makes a HEAD request. Only the first parameter is required


| Parameter      | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| url  | string    | HTTP URL. If baseURL is set, provide only path. |
| body (optional) | null / string / object / ArrayBuffer / [SharedArray](/javascript-api/k6-data/sharedarray) | Request body; objects will be `x-www-form-urlencoded`. Set to `null` to omit the body. |
| params (optional) | null or object {} | Additional [parameters](/javascript-api/k6-http/params) for this specific request. |

### Returns

| Type                                         | Description           |
| -------------------------------------------- | --------------------- |
| [Response](/javascript-api/k6-http/response) | HTTP [Response](/javascript-api/k6-http/response) object. |


### Example

<CodeGroup labels={[]}>

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx({
  baseURL: 'https://httpbin.test.k6.io',
  timeout: 20000, // 20s timeout.
});

export default function testSuite() {
  const resp = session.head(`/head`);
  console.log(resp.status);
}
```

</CodeGroup>
