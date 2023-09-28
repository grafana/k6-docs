---
title: 'CookieJar'
head_title: 'CookieJar object'
description: 'Used for storing cookies, set by the server and/or added by the client.'
excerpt: 'Used for storing cookies, set by the server and/or added by the client.'
---

_CookieJar_ is an object for storing cookies, set by the server and/or added by the client. As described in the how-to guide on using [Cookies](/using-k6/cookies), k6 handles cookies automatically by default. If you need more control over cookies you can however create your own cookie jar and select it as the active jar (instead of the default one created by k6) for one or more requests.

| Method                                                                                                     | Description                                                                                               |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [cookiesForURL(url)](/javascript-api/k6-http/cookiejar/cookiejar-cookiesforurl)                        | Get Object of cookies where the key is the cookie name and the value is an array.                         |
| [set(url, name, value, [options])](/javascript-api/k6-http/cookiejar/cookiejar-set) | Set a cookie in the jar by specifying name, value and some other optional settings like domain, path etc. |

### Example

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://httpbin.test.k6.io/cookies/set?my_cookie=hello%20world', {
    redirects: 0,
  });
  const jar = http.cookieJar();
  const cookies = jar.cookiesForURL('https://httpbin.test.k6.io/');
  check(res, {
    "has cookie 'my_cookie'": (r) => cookies.my_cookie.length > 0,
    'cookie has correct value': (r) => cookies.my_cookie[0] === 'hello world',
  });
}
```

</CodeGroup>
