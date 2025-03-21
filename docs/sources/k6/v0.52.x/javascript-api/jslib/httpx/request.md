---
title: 'request(method, url, [body], [params])'
head_title: 'httpx.request()'
description: 'Generic method for making arbitrary HTTP requests'
description: 'Generic method for making arbitrary HTTP requests'
weight: 09
---

# request(method, url, [body], [params])

Generic method for making arbitrary HTTP requests.

Consider using specific methods for making common requests [get](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/get), [post](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/post), [put](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/put), [patch](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/patch).

| Parameter         | Type                                                                                                                              | Description                                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| method            | string                                                                                                                            | HTTP method. Must be uppercase (GET, POST, PUT, PATCH, OPTIONS, HEAD, etc)                                                 |
| url               | string                                                                                                                            | HTTP URL. If baseURL is set, provide only path.                                                                            |
| body (optional)   | null / string / object / ArrayBuffer / [SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) | Request body; objects are `x-www-form-urlencoded`. To omit body, set to `null`.                                            |
| params (optional) | null or object {}                                                                                                                 | Additional [parameters](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) for this specific request. |

### Returns

| Type                                                                                 | Description                                                                                       |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) | HTTP [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) object. |

### Example

{{< code >}}

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx({
  baseURL: 'https://httpbin.test.k6.io',
  timeout: 20000, // 20s timeout.
});

export default function testSuite() {
  const resp_get = session.request('GET', `/status/200`);
  const resp_post = session.request('POST', `/status/200`, { key: 'value' });
  const resp_put = session.request('PUT', `/status/200`, { key: 'value' });
  const resp_patch = session.request('PATCH', `/status/200`, { key: 'value' });
  const resp_delete = session.request('DELETE', `/status/200`);
}
```

{{< /code >}}
