---
title: 'CookieJar.set(url, name, value, [options])'
description: 'Set a cookie in the jar by specifying url, name, value and some other optional settings like domain, path, etc.'
---

# CookieJar.set(url, name, value, [options])

Set a cookie in the jar by specifying url, name, value and some other optional settings like domain, path, etc.

| Parameter          | Type   | Description                                                                                 |
| ------------------ | ------ | ------------------------------------------------------------------------------------------- |
| url                | string | Cookie URL                                                                                  |
| name               | string | Cookie name                                                                                 |
| value              | string | Cookie value                                                                                |
| options (optional) | object | Specific cookie settings: `domain`, `path`, `expires`, `max_age`, `secure` and `http_only`. |

### Example

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const jar = http.cookieJar();
  jar.set('http://quickpizza.grafana.com', 'my_cookie', 'hello world', {
    domain: 'quickpizza.grafana.com',
    path: '/api/cookies',
    secure: true,
    max_age: 600,
  });
  const res = http.get('https://quickpizza.grafana.com/api/cookies');
  console.log(res.body);
  check(res, {
    'has status 200': (r) => r.status === 200,
    "has cookie 'my_cookie'": (r) => r.json().cookies.my_cookie !== null,
    'cookie has correct value': (r) => r.json().cookies.my_cookie == 'hello world',
  });
}
```

{{< /code >}}
