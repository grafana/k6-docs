---
title: 'CookieJar.clear(url)'
excerpt: 'Clear all cookies in the jar by specifying url.'
---

Clear all cookies in the jar by specifying url.

| Parameter          | Type   | Description                                                                                 |
| ------------------ | ------ | ------------------------------------------------------------------------------------------- |
| url                | string | Cookie URL                                                                                  |

### Example

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const jar = http.cookieJar();
  jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie', 'hello world');
  const res1 = http.get('https://httpbin.test.k6.io/cookies');
  check(res1, {
    'has status 200': (r) => r.status === 200,
    "has cookie 'my_cookie'": (r) => r.json().cookies.my_cookie !== null,
    'cookie has correct value': (r) => r.json().cookies.my_cookie == 'hello world',
  });
  
  jar.clear('https://httpbin.test.k6.io/cookies');
  
  const res2 = http.get('https://httpbin.test.k6.io/cookies');
  check(res2, {
    'has status 200': (r) => r.status === 200,
    "hasn't cookie 'my_cookie'": (r) => r.json().cookies.my_cookie == null,
  });
}
```

</CodeGroup>
