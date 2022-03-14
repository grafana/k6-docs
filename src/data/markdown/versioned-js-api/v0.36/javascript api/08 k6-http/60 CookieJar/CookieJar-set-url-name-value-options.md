---
title: 'CookieJar.set(url, name, value, [options])'
excerpt: 'Set a cookie in the jar by specifying url, name, value and some other optional settings like domain, path, etc.'
---

Set a cookie in the jar by specifying url, name, value and some other optional settings like domain, path, etc.

| Parameter          | Type   | Description                                                                                 |
| ------------------ | ------ | ------------------------------------------------------------------------------------------- |
| url                | string | Cookie URL                                                                                  |
| name               | string | Cookie name                                                                                 |
| value              | string | Cookie value                                                                                |
| options (optional) | object | Specific cookie settings: `domain`, `path`, `expires`, `max_age`, `secure` and `http_only`. |

### Example

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const jar = http.cookieJar();
  jar.set('https://httpbin.org/cookies', 'my_cookie', 'hello world', {
    domain: 'httpbin.org',
    path: '/cookies',
    secure: true,
    max_age: 600,
  });
  const res = http.get('https://httpbin.org/cookies');
  check(res, {
    'has status 200': (r) => r.status === 200,
    "has cookie 'my_cookie'": (r) => r.json().cookies.my_cookie !== null,
    'cookie has correct value': (r) => r.json().cookies.my_cookie == 'hello world',
  });
}
```

</CodeGroup>
