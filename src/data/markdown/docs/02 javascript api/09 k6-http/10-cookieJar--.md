---
title: 'cookieJar()'
slug: '/javascript-api/k6-http/cookiejar-method'
description: 'Get active HTTP Cookie jar.'
excerpt: 'Get active HTTP Cookie jar.'
canonicalUrl: https://grafana.com/docs/k6
---

Get the active cookie jar.

| Type                                           | Description         |
| ---------------------------------------------- | ------------------- |
| [CookieJar](/javascript-api/k6-http/cookiejar) | A CookieJar object. |

### Example

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

export default function () {
  const jar = http.cookieJar();
}
```

</CodeGroup>
