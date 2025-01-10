---
title: 'Cookies Example'
description: 'Scripting examples on how you can interact with cookies during your load test if required.'
weight: 08
---

# Cookies Example

Scripting examples on how you can interact with cookies during your load test if required.

## Cookies

As HTTP is a stateless protocol, cookies are used by server-side applications to persist data
on client machines. This is used more or less everywhere on the web, commonly for user session
tracking purposes. In k6 cookies are managed automatically by default, however, there are use
cases where access to read and manipulate cookies are required.

## From the response headers

{{< code >}}

```javascript
import http from 'k6/http';
import { check, group } from 'k6';

export default function () {
  // Since this request redirects the `res.cookies` property won't contain the cookies
  const res = http.get('https://httpbin.test.k6.io/cookies/set?name1=value1&name2=value2');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Make sure cookies have been added to VU cookie jar
  const vuJar = http.cookieJar();
  const cookiesForURL = vuJar.cookiesForURL(res.url);
  check(null, {
    "vu jar has cookie 'name1'": () => cookiesForURL.name1.length > 0,
    "vu jar has cookie 'name2'": () => cookiesForURL.name2.length > 0,
  });
}
```

{{< /code >}}

## Log all the cookies in a response

> ### ⚠️ Note that this only works when using k6 locally
>
> The `console.log()` family of APIs are currently only usable when running k6 locally.
> When running k6 tests with LoadImpact Cloud Execution the logs will be discarded.

{{< code >}}

```javascript
// Example showing two methods how to log all cookies (with attributes) from a HTTP response.

import http from 'k6/http';

function logCookie(cookie) {
  // Here we log the name and value of the cookie along with additional attributes.
  // For full list of attributes see: https:///grafana.com/docs/k6/using-k6/cookies#properties-of-a-response-cookie-object
  console.log(
    `${cookie.name}: ${cookie.value}\n\tdomain: ${cookie.domain}\n\tpath: ${cookie.path}\n\texpires: ${cookie.expires}\n\thttpOnly: ${cookie.http_only}`
  );
}

export default function () {
  const res = http.get('https://www.google.com/');

  // Method 1: Use for-loop and check for non-inherited properties
  for (const name in res.cookies) {
    if (res.cookies.hasOwnProperty(name) !== undefined) {
      logCookie(res.cookies[name][0]);
    }
  }

  // Method 2: Use ES6 Map to loop over Object entries
  new Map(Object.entries(res.cookies)).forEach((v, k) => logCookie(v[0]));
}
```

{{< /code >}}

## Setting a cookie in the VU cookie jar

To set a cookie that should be sent with every request matching a particular domain, path, etc.
you'd do something like this:

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  // Get VU cookie jar and add a cookie to it providing the parameters
  // that a request must match (domain, path, HTTPS or not etc.)
  // to have the cookie attached to it when sent to the server.
  const jar = http.cookieJar();
  jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie', 'hello world', {
    domain: 'httpbin.test.k6.io',
    path: '/cookies',
    secure: true,
    max_age: 600,
  });

  // As the following request is matching the above cookie in terms of domain,
  // path, HTTPS (secure) and will happen within the specified "age" limit, the
  // cookie will be attached to this request.
  const res = http.get('https://httpbin.test.k6.io/cookies');
  check(res, {
    'has status 200': (r) => r.status === 200,
    "has cookie 'my_cookie'": (r) => r.json().cookies.my_cookie !== null,
    'cookie has correct value': (r) => r.json().cookies.my_cookie == 'hello world',
  });
}
```

{{< /code >}}

## Delete a cookie in the VU cookie jar

To delete a cookie in the jar for a specific URL and name, use the `delete` method.

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
    "res2 hasn't cookie 'my_cookie_1'": (r) => r.json().cookies.my_cookie_1 == null,
    "res2 has cookie 'my_cookie_2'": (r) => r.json().cookies.my_cookie_2 !== null,
    'res2 cookie has correct value_2': (r) => r.json().cookies.my_cookie_2 == 'hello world_2',
  });
}
```

{{< /code >}}

## Clear all cookies in the VU cookie jar

To clear all cookies in the jar by specifying url, use the `clear` method.

{{< code >}}

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

{{< /code >}}

**Relevant k6 APIs**:

- [http.cookieJar()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar-method)
- [http.CookieJar](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar)

- [set(url, name, value, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar/cookiejar-set)
- [delete(url, name)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar/cookiejar-delete)
- [clear(url)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/cookiejar/cookiejar-clear)
