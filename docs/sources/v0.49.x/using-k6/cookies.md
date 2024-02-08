---
title: 'Cookies'
description: 'k6 will transparently manage the receiving, storage and sending of cookies as described above, so that testing of your cookie-based web site or app will just work.'
weight: 09
---

# Cookies

HTTP Cookies are used by web sites and apps to store pieces of stateful information on user devices.
Through the `Set-Cookie` HTTP header, a server tells a client what information it wants stored on the user machine.

The user's browser stores the cookie data and associates it with the hostname of the server.
For each subsequent request to that hostname, it includes the stored cookie data in a
`Cookie` header.

You can then control more specific rules for whether to send the cookie data or not,
including limiting it to specific subdomains or paths.
You can also set an expiry date on the cookie and tell the browser to send it only over encrypted (SSL/TLS) connections.

## Cookies with k6

For most purposes, k6 transparently manages the reception, storage, and transmission of cookies as described.
Testing of your cookie-based web site or app will _just work_ without requiring any special action of you.

In some cases, though, you might want more control over cookies.
k6 provides multiple options to do this.
You can:

- [Directly manipulate HTTP headers](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/params),
- Use the more ergonomic cookie API.

The following section shows how to use the Cookie API.

## Setting simple cookies

To simulate that a cookie has previously been set by a browser and is now supposed to be included
in subsequent requests to the server, include the cookie in the `cookies` request parameter:

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  http.get('https://httpbin.test.k6.io/cookies', {
    cookies: {
      my_cookie: 'hello world',
    },
  });
}
```

{{< /code >}}

This applies only to the cookie for the request in question.
It isn't sent for any subsequent requests.
To send the cookie for subsequent requests, add it to a cookie jar.
By default, k6 has a cookie jar for each VU, which you can interact with to set and inspect cookies:

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  const jar = http.cookieJar();
  jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie', 'hello world');
  http.get('https://httpbin.test.k6.io/cookies');
}
```

{{< /code >}}

The per-VU cookie jar stores all cookies received from the server in a `Set-Cookie` header.
You can also create "local cookie jars" that override the per-VU cookie jar (shown in a subsequent section).

You can also override a cookie that is already part of the per-VU cookie jar:

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const jar = http.cookieJar();
  jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie', 'hello world');

  const cookies = {
    my_cookie: {
      value: 'hello world 2',
      replace: true,
    },
  };

  const res = http.get('https://httpbin.test.k6.io/cookies', {
    cookies,
  });

  check(res.json(), {
    'cookie has correct value': (b) => b.cookies.my_cookie == 'hello world 2',
  });
}
```

{{< /code >}}

## Accessing cookies

To see which cookies were set for a particular response, look in the `cookies` property of the response object:

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://httpbin.test.k6.io/cookies/set?my_cookie=hello%20world', {
    redirects: 0,
  });
  check(res, {
    "has cookie 'my_cookie'": (r) => r.cookies.my_cookie.length > 0,
    'cookie has correct value': (r) => r.cookies.my_cookie[0].value === 'hello world',
  });
}
```

{{< /code >}}

The response object's `cookies` property is a map where the key is the cookie name and the value
is an array of response cookie objects.
This array can support multiple cookies that have the same name but different `domain` or `path` attributes, as specified in [RFC6265](https://tools.ietf.org/html/rfc6265#section-5.3).

## Properties of a response cookie object

A response cookie object contains the following properties:

| Property  | Type      | Description                                                                                                   |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| name      | `string`  | the name of the cookie                                                                                        |
| value     | `string`  | the value of the cookie                                                                                       |
| domain    | `string`  | domain deciding what hostnames this cookie should be sent to                                                  |
| path      | `string`  | limiting the cookie to only be sent if the path of the request matches this value                             |
| expires   | `string`  | when the cookie expires, this needs to be in the RFC1123 format looking like: `Mon, 02 Jan 2006 15:04:05 MST` |
| max_age   | `number`  | used for the same purpose as expires but defined as the number of seconds a cookie will be valid              |
| secure    | `boolean` | if true, the cookie will only be sent over an encrypted (SSL/TLS) connection                                  |
| http_only | `boolean` | if true, the cookie would not be exposed to JavaScript in a browser environment                               |

## Inspecting a cookie in the jar

To see which cookies are set and stored in the cookie jar for a particular URL,
use the `cookieForURL()` method of the cookie jar object:

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

The `cookies` object returned by the jar's `cookiesForURL()` method is a map where the key is the
cookie name and the value is an array of cookie values (strings). It is an array to support
multiple cookies having the same name (but different `domain` and/or `path` attributes), which
is part of [RFC6265](https://tools.ietf.org/html/rfc6265#section-5.3).

## Setting advanced cookies with attributes

To set cookies that more tightly controls the behavior of the cookie we must add the cookie to a
cookie jar. An example:

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const jar = http.cookieJar();
  jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie', 'hello world', {
    domain: 'httpbin.test.k6.io',
    path: '/cookies',
    secure: true,
    max_age: 600,
  });
  const res = http.get('https://httpbin.test.k6.io/cookies');
  check(res, {
    'has status 200': (r) => r.status === 200,
    "has cookie 'my_cookie'": (r) => r.cookies.my_cookie[0] !== null,
    'cookie has correct value': (r) => r.cookies.my_cookie[0].value == 'hello world',
  });
}
```

{{< /code >}}

## Local cookie jars

Besides the per-VU cookie jar, you can also create local cookie jars to override the per-VU
cookie jar on a per-request basis:

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const jar = new http.CookieJar();

  // Add cookie to local jar
  const cookieOptions = {
    domain: 'httpbin.test.k6.io',
    path: '/cookies',
    secure: true,
    max_age: 600,
  };
  jar.set('https://httpbin.test.k6.io/cookies', 'my_cookie', 'hello world', cookieOptions);

  // Override per-VU jar with local jar for the following request
  const res = http.get('https://httpbin.test.k6.io/cookies', { jar });
  check(res, {
    'has status 200': (r) => r.status === 200,
    "has cookie 'my_cookie'": (r) => r.cookies.my_cookie[0] !== null,
    'cookie has correct value': (r) => r.cookies.my_cookie[0].value == 'hello world',
  });
}
```

{{< /code >}}

## Examples

{{< code >}}

```javascript
// Example showing two methods how to log all cookies (with attributes) from a HTTP response.
import http from 'k6/http';

function logCookie(c) {
  // Here we log the name and value of the cookie along with additional attributes.
  // For full list of attributes see:
  // https://grafana.com/docs/k6/using-k6/cookies#properties-of-a-response-cookie-object
  const output = `
     ${c.name}: ${c.value}
     tdomain: ${c.domain}
     tpath: ${c.path}
     texpires: ${c.expires}
     thttpOnly: ${c.http_only}
  `;
  console.log(output);
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
  new Map(Object.entries(res.cookies)).forEach((v, k) => {
    logCookie(v[0]);
  });
}
```

{{< /code >}}
