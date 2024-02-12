---
title: 'asyncRequest(method, url, [body], [params])'
head_title: 'httpx.asyncRequest()'
description: 'Generic method for making asynchronous HTTP requests'
description: 'Generic method for making asynchronous HTTP requests'
weight: 08
---

# asyncRequest(method, url, [body], [params])

Generic method for making arbitrary asynchronous HTTP requests.
Note, this method returns a Promise. You must use the `await` keyword to resolve it.

| Parameter         | Type                                                                                                                              | Description                                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| method            | string                                                                                                                            | HTTP method. Must be uppercase (GET, POST, PUT, PATCH, OPTIONS, HEAD, etc)                                                 |
| url               | string                                                                                                                            | HTTP URL. If baseURL is set, provide only path.                                                                            |
| body (optional)   | null / string / object / ArrayBuffer / [SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) | Request body; objects will be `x-www-form-urlencoded`. Set to `null` to omit the body.                                     |
| params (optional) | null or object {}                                                                                                                 | Additional [parameters](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) for this specific request. |

### Returns

| Type                  | Description                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| Promise with Response | HTTP [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) object. |

### Example

{{< code >}}

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx({
  baseURL: 'https://httpbin.test.k6.io',
  timeout: 20000, // 20s timeout.
});

export default async function testSuite() {
  const resp_get = await session.asyncRequest('GET', `/status/200`);
  const resp_post = await session.asyncRequest('POST', `/status/200`, { key: 'value' });
  const resp_put = await session.asyncRequest('PUT', `/status/200`, { key: 'value' });
  const resp_patch = await session.asyncRequest('PATCH', `/status/200`, { key: 'value' });
  const resp_delete = await session.asyncRequest('DELETE', `/status/200`);

  // specific methods are also available.
  const respGet = await session.asyncGet(`/status/200`);
  const respPost = await session.asyncPost(`/status/200`, { key: 'value' });
  const respPut = await session.asyncPut(`/status/200`, { key: 'value' });
  const respPatch = await session.asyncPatch(`/status/200`, { key: 'value' });
  const respDelete = await session.asyncDelete(`/status/200`);
}
```

{{< /code >}}
