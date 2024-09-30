---
title: 'CookieJar.cookiesForURL(url)'
description: 'Get object with all cookies for the given URL, where the key is the cookie name and the value is an array.'
---

# CookieJar.cookiesForURL(url)

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| url       | string | The URL to get cookies for. |

### Returns

| Type   | Description                                                                                                 |
| ------ | ----------------------------------------------------------------------------------------------------------- |
| object | A JS object with all cookies for the given URL, where the key is the cookie name and the value is an array. |

### Example

{{< code >}}

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

{{< /code >}}
