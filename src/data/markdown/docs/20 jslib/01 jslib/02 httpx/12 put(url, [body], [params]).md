---
title: 'put(url, [body], [params])'
head_title: 'httpx.put'
description: 'httpx.put makes PUT requests'
excerpt: 'httpx.put makes PUT requests'
---

`session.put(url, body, params)` makes a PUT request. Only the first parameter is required


| Parameter         | Type                                                                                      | Description                                                                            |
|-------------------|-------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| url               | string                                                                                    | HTTP URL. If baseURL is set, provide only path.                                        |
| body (optional)   | null / string / object / ArrayBuffer / [SharedArray](/javascript-api/k6-data/sharedarray) | Request body; objects will be `x-www-form-urlencoded`. Set to `null` to omit the body. |
| params (optional) | null or object {}                                                                         | Additional [parameters](/javascript-api/k6-http/params) for this specific request.     |

### Returns

| Type                                         | Description                                               |
|----------------------------------------------|-----------------------------------------------------------|
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
  const resp = session.put(`/put`, {
    first_name: 'Mr',
    last_name: 'Croco',
    username: 'my user',
    password: 'my password',
  });
  console.log(resp.status);
}
```

</CodeGroup>
