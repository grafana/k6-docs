---
title: 'CookieJar.cookiesForURL(url)'
excerpt: 'Get object with all cookies for the given URL, where the key is the cookie name and the value is an array.'
---

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| url       | string | The URL to get cookies for. |

### Returns

| Type   | Description |
| ------ | ----------- |
| object | A JS object with all cookies for the given URL, where the key is the cookie name and the value is an array. |

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
Example return value from `cookiesForUrl`
```
{
  "cookieName1": ["cookieValue1", "cookieValue2"],
  "cookieName2": ["cookieValue3"],
  "cookieName3": ["cookieValue4", "cookieValue5", "cookieValue6"]
}
```
</CodeGroup>
