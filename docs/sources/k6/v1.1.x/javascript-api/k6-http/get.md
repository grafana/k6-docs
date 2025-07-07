---
title: 'get( url, [params] )'
description: 'Issue an HTTP GET request.'
description: 'Issue an HTTP GET request.'
weight: 10
---

# get( url, [params] )

Make a GET request.

| Parameter         | Type                                                                                            | Description                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| url               | string /[HTTP URL](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/url#returns) | Request URL (e.g. `http://example.com`).                                                                                          |
| params (optional) | object                                                                                          | [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params) object containing additional request parameters. |

### Returns

| Type                                                                                 | Description           |
| ------------------------------------------------------------------------------------ | --------------------- |
| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) | HTTP Response object. |

### Example fetching a URL

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  const res = http.get('https://test.k6.io');
  console.log(JSON.stringify(res.headers));
}
```

{{< /code >}}
