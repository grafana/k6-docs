---
title: 'Cookies'
excerpt: ''
---

HTTP Cookies are used by web sites and apps to store pieces of stateful information on the user's
device. A server tells the client, via a `Set-Cookie` HTTP header, what information it wants to be
stored on the user's machine.

The user's browser will store the cookie data and associate it with the hostname of the server,
and for each subsequent request to that hostname, it will include the stored cookie data in a
`Cookie` header.

You can then control more specific rules for when cookie data should be sent or not, including
limiting it to specific subdomains of the domain or a specific path. It's also possible to set an
expiry date on the cookie and tell the browser only to send it over encrypted (SSL/TLS)
connections.

## Cookies with k6

For most intents and purposes k6 will transparently manage the receiving, storage and sending of
cookies as described above, so that testing of your cookie-based web site or app will just work
without you having to do anything special.

There are however use cases where more control over cookies is desired. In k6 you have two
options, [either to directly manipulate HTTP headers](/javascript-api/k6-http/params-k6-http),
or use the more ergonomic cookie API. We will go through the latter below.

## Setting simple cookies

To simulate that a cookie has previously been set by a browser and is now supposed to be included
in a subsequent request to the server we include the cookie in the `cookies` request parameter:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
import http from 'k6/http';

export default function() {
  http.get('https://httpbin.org/cookies', {
    cookies: {
      my_cookie: 'hello world',
    },
  });
}
```

</div>

This will only apply the cookie for the request in question, but will not be sent for any
subsequent requests. If you want to do that you have to add the cookie to a cookie jar, and by
default there's a per-VU cookie jar we can interact with to set and inspect cookies:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
import http from 'k6/http';

export default function() {
  const jar = http.cookieJar();
  jar.set('https://httpbin.org/cookies', 'my_cookie', 'hello world');
  http.get('https://httpbin.org/cookies');
}
```

</div>

The per-VU cookie jar stores all cookies received from the server in a `Set-Cookie` header. You
can also create "local cookie jars" that overrides the per-VU cookie jar, but more on that in a bit.

You can also specify that a cookie should be overridden if already part of the per-VU cookie jar:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
import http from 'k6/http';
import { check } from 'k6';

export default function() {
  const jar = http.cookieJar();
  jar.set('https://httpbin.org/cookies', 'my_cookie', 'hello world');

  const cookies = {
    my_cookie: {
      value: 'hello world 2',
      replace: true,
    },
  };

  const res = http.get('https://httpbin.org/cookies', {
    cookies,
  });

  check(res, {
    'cookie has correct value': r =>
      r.json().cookies.my_cookie === 'hello world 2',
  });
}
```

</div>

## Accessing cookies

To see which cookies were set for a particular response we can look in the `cookies` property of
the response object:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
import http from 'k6/http';
import { check } from 'k6';

export default function() {
  const res = http.get(
    'https://httpbin.org/cookies/set?my_cookie=hello%20world',
    { redirects: 0 },
  );
  check(res, {
    "has cookie 'my_cookie'": r => r.cookies.my_cookie.length > 0,
    'cookie has correct value': r =>
      r.cookies.my_cookie[0].value === 'hello world',
  });
}
```

</div>

The response object's `cookies` property is a map where the key is the cookie name and the value
is an array of response cookie objects (see below for description). It is an array to support
multiple cookies having the same name (but different `domain` and/or `path` attributes), which
is part of [RFC6265](https://tools.ietf.org/html/rfc6265#section-5.3).

## Properties of a response cookie object

A response cookie object contains the following properties:

| Property  | Type      | Description                                                                                                                                            |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name      | `string`  | the name of the cookie                                                                                                                                 |
| value     | `string`  | the value of the cookie                                                                                                                                |
| domain    | `string`  | domain deciding what hostnames this cookie should be sent to                                                                                           |
| path      | `string`  | limiting the cookie to only be sent if the path of the request matches this value                                                                      |
| expires   | `string`  | when the cookie expires, this needs to be in the RFC1123 format looking like: `Mon, 02 Jan 2006 15:04:05 MST` |
| max_age   | `number`  | used for the same purpose as expires but defined as the number of seconds a cookie will be valid                                                     |
| secure    | `boolean` | if true, the cookie will only be sent over an encrypted (SSL/TLS) connection                                                                               |
| http_only | `boolean` | if true, the cookie would not be exposed to JavaScript in a browser environment                                                                            |

## Inspecting a cookie in the jar

To see which cookies are set, and stored in the cookie jar, for a particular URL we can use the
`cookieForURL()` method of the cookie jar object:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
import http from 'k6/http';
import { check } from 'k6';

export default function() {
  let res = http.get(
    'https://httpbin.org/cookies/set?my_cookie=hello%20world',
    { redirects: 0 },
  );
  let jar = http.cookieJar();
  let cookies = jar.cookiesForURL('http://httpbin.org/');
  check(res, {
    "has cookie 'my_cookie'": r => cookies.my_cookie.length > 0,
    'cookie has correct value': r => cookies.my_cookie[0] === 'hello world',
  });
}
```

</div>

The `cookies` object returned by the jar's `cookiesForURL()` method is a map where the key is the
cookie name and the value is an array of cookie values (strings). It is an array to support
multiple cookies having the same name (but different `domain` and/or `path` attributes), which
is part of [RFC6265](https://tools.ietf.org/html/rfc6265#section-5.3).

## Setting advanced cookies with attributes

To set cookies that more tightly controls the behavior of the cookie we must add the cookie to a
cookie jar. An example:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
import http from 'k6/http';
import { check } from 'k6';

export default function() {
  let jar = http.cookieJar();
  jar.set('https://httpbin.org/cookies', 'my_cookie', 'hello world', {
    domain: 'httpbin.org',
    path: '/cookies',
    secure: true,
    max_age: 600,
  });
  let res = http.get('https://httpbin.org/cookies');
  check(res, {
    'has status 200': r => r.status === 200,
    "has cookie 'my_cookie'": r => r.json().cookies.my_cookie !== null,
    'cookie has correct value': r =>
      r.json().cookies.my_cookie == 'hello world',
  });
}
```

</div>

## Local cookie jars

Besides the per-VU cookie jar you can also create local cookie jars that can override the per-VU
cookie jar on a per-request basis. An example:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
import http from 'k6/http';
import { check } from 'k6';

export default function() {
  const jar = new http.CookieJar();

  // Add cookie to local jar
  const cookieOptions = {
    domain: 'httpbin.org',
    path: '/cookies',
    secure: true,
    max_age: 600,
  };
  jar.set(
    'https://httpbin.org/cookies',
    'my_cookie',
    'hello world',
    cookeOptions,
  );

  // Override per-VU jar with local jar for the following request
  let res = http.get('https://httpbin.org/cookies', { jar });
  check(res, {
    'has status 200': r => r.status === 200,
    "has cookie 'my_cookie'": r => r.json().cookies.my_cookie !== null,
    'cookie has correct value': r =>
      r.json().cookies.my_cookie == 'hello world',
  });
}
```

</div>

## Examples

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```js
// Example showing two methods how to log all cookies (with attributes) from a HTTP response.
import http from 'k6/http';

function logCookie(c) {
  // Here we log the name and value of the cookie along with additional attributes.
  // For full list of attributes see:
  // https://k6.io/docs/using-k6/cookies#properties-of-a-response-cookie-object
  const output = `
     ${c.name}: ${c.value}
     tdomain: ${c.domain}
     tpath: ${c.path}
     texpires: ${c.expires}
     thttpOnly: ${c.http_only}
  `;
  console.log(output);
}
export default function() {
  let res = http.get('https://www.google.com/');

  // Method 1: Use for-loop and check for non-inherited properties
  for (var name in res.cookies) {
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
