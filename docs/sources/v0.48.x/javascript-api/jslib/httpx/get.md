---
title: 'get(url, [body], [params])'
description: 'httpx.get makes GET requests'
excerpt: 'httpx.get makes GET requests'
weight: 10
---

# get(url, [body], [params])

`session.get(url, body, params)` makes a GET request. Only the URL parameter is required

| Parameter         | Type                                                                                                              | Description                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| url               | string                                                                                                            | HTTP URL. If baseURL is set, provide only path.                                                            |
| body (optional)   | null / string / object / ArrayBuffer / [SharedArray](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-data/sharedarray) | Set to `null` to omit the body.                                                                            |
| params (optional) | null or object {}                                                                                                 | Additional [parameters](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) for this specific request. |

### Returns

| Type                                                                  | Description                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) | HTTP [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) object. |

### Example

{{< code >}}

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx({
  baseURL: 'https://test-api.k6.io',
  timeout: 20000, // 20s timeout.
});

export default function testSuite() {
  const resp = session.get(`/public/crocodiles/`);
}
```

{{< /code >}}
