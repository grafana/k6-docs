---
title: "cookieJar()"
description: "Get active HTTP Cookie jar."
---

Get the active cookie jar.

| Type                                                       | Description         |
| ---------------------------------------------------------- | ------------------- |
| [CookieJar](/javascript-api/k6-http/cookiejar-k6-http) | A CookieJar object. |

### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import http from 'k6/http';

export default function() {
  let jar = http.cookieJar();
}
```

</div>
