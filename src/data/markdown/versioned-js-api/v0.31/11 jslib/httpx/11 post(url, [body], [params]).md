---
title: 'post(url, [body], [params])'
head_title: 'httpx.post'
description: 'httpx.post makes POST requests'
excerpt: 'httpx.post makes POST requests'
---

| Parameter         | Type                                                                                            | Description                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| url               | string                                                                                          | HTTP URL. If baseURL is set, provide only path.                                          |
| body (optional)   | null / string / object / ArrayBuffer / [SharedArray](/javascript-api/v0.31/k6-data/sharedarray) | Request body; objects will be `x-www-form-urlencoded`. Set to `null` to omit the body.   |
| params (optional) | null or object {}                                                                               | Additional [parameters](/javascript-api/v0.31/k6-http/params) for this specific request. |

### Returns

| Type                                               | Description                                                     |
| -------------------------------------------------- | --------------------------------------------------------------- |
| [Response](/javascript-api/v0.31/k6-http/response) | HTTP [Response](/javascript-api/v0.31/k6-http/response) object. |

### Example

<CodeGroup labels={[]}>

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.4/index.js';

let session = new Httpx({
  baseURL: 'https://test-api.k6.io',
  timeout: 20000, // 20s timeout.
});

export default function testSuite() {
  let resp = session.post(`/user/register/`, {
    first_name: 'Mr',
    last_name: 'Croco',
    username: 'my user',
    password: 'my password',
  });
}
```

</CodeGroup>
