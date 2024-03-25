---
title: 'CookieJar.delete(url, name)'
description: 'Delete a cookie of a specified `name` for the given URL.'
---

# CookieJar.delete(url, name)

| Parameter | Type   | Description                                |
| --------- | ------ | ------------------------------------------ |
| url       | string | The URL to delete cookies for.             |
| name      | string | The name of the cookie you want to delete. |

### Example

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const jar = http.cookieJar();
  jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie_1', 'hello world_1');
  jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie_2', 'hello world_2');

  const res1 = http.get('https://httpbin.test.k6.io/cookies');
  check(res1, {
    'res1 has status 200': (r) => r.status === 200,
    "res1 has cookie 'my_cookie_1'": (r) => r.json().cookies.my_cookie_1 !== null,
    'res1 cookie has correct value_1': (r) => r.json().cookies.my_cookie_1 == 'hello world_1',
    "res1 has cookie 'my_cookie_2'": (r) => r.json().cookies.my_cookie_2 !== null,
    'res1 cookie has correct value_2': (r) => r.json().cookies.my_cookie_2 == 'hello world_2',
  });

  jar.delete('https://httpbin.test.k6.io/cookies', 'my_cookie_1');

  const res2 = http.get('https://httpbin.test.k6.io/cookies');
  check(res2, {
    'res2 has status 200': (r) => r.status === 200,
    "res2 doesn't have cookie 'my_cookie_1'": (r) => r.json().cookies.my_cookie_1 == null,
    "res2 has cookie 'my_cookie_2'": (r) => r.json().cookies.my_cookie_2 !== null,
    'res2 cookie has correct value_2': (r) => r.json().cookies.my_cookie_2 == 'hello world_2',
  });
}
```

{{< /code >}}
