---
title: 'get( url, [params] )'
description: 'Issue an HTTP GET request.'
---

Make a GET request.

| Parameter         | Type   | Description                                                                               |
| ----------------- | ------ | ----------------------------------------------------------------------------------------- |
| url               | string | Request URL (e.g. `http://example.com`).                                                  |
| params (optional) | object | [Params](/javascript-api/k6-http/params) object containing additional request parameters. |

### Returns

| Type                                         | Description           |
| -------------------------------------------- | --------------------- |
| [Response](/javascript-api/k6-http/response) | HTTP Response object. |

### Example fetching a URL

<CodeGroup labels={[]}>

```js
import http from 'k6/http';

export default function () {
  let res = http.get('https://k6.io');
}
```

</CodeGroup>
