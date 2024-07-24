---
title: 'post(url, [body], [params])'
head_title: 'httpx.post'
description: 'httpx.post makes POST requests'
excerpt: 'httpx.post makes POST requests'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/jslib/httpx/post/
redirect: https://grafana.com/docs/k6/latest/javascript-api/jslib/httpx/post/
---


| Parameter         | Type                                                                                      | Description                                                                            |
|-------------------|-------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| url               | string                                                                                    | HTTP URL. If baseURL is set, provide only path.                                        |
| body (optional)   | null / string / object / ArrayBuffer / [SharedArray](/javascript-api/k6-data/sharedarray) | Request body; objects are `x-www-form-urlencoded`. To omit body, set to `null` . |
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
  baseURL: 'https://test-api.k6.io',
  timeout: 20000, // 20s timeout.
});

export default function testSuite() {
  const resp = session.post(`/user/register/`, {
    first_name: 'Mr',
    last_name: 'Croco',
    username: 'my user',
    password: 'my password',
  });
}
```

</CodeGroup>
