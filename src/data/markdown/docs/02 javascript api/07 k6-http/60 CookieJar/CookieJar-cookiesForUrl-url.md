---
title: 'CookieJar.cookiesForURL(url)'
excerpt: ''
---

| Parameter | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| url       | string | The URL for which to get cookies. |

### Returns

| Type   | Description                                                                   |
| ------ | ----------------------------------------------------------------------------- |
| object | Object of cookies where the key is the cookie name and the value is an array. |

### Example

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  let res = http.get(
    'https://httpbin.org/cookies/set?my_cookie=hello%20world',
    { redirects: 0 },
  );
  let jar = http.cookieJar();
  let cookies = jar.cookiesForURL('http://httpbin.org/');
  check(res, {
    "has cookie 'my_cookie'": (r) => cookies.my_cookie.length > 0,
    'cookie has correct value': (r) => cookies.my_cookie[0] === 'hello world',
  });
}
```

</CodeGroup>
