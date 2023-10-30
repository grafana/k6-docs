---
title: 'cookieJar()'
slug: '/javascript-api/k6-http/cookiejar'
description: 'Get active HTTP Cookie jar.'
excerpt: 'Get active HTTP Cookie jar.'
weight: 10
weight: 60
---

# cookieJar()

Get the active cookie jar.

| Type                                                                    | Description         |
| ----------------------------------------------------------------------- | ------------------- |
| [CookieJar](/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar) | A CookieJar object. |

### Example

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  const jar = http.cookieJar();
}
```

{{< /code >}}
