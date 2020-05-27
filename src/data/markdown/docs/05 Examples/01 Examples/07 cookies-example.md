---
title: "Cookies Example"
excerpt: "Scripting examples on how you can interact with cookies during your load test if required."
---

Scripting examples on how you can interact with cookies during your load test if required.

## Cookies
As HTTP is a stateless protocol, cookies are used by server-side applications to persist data
on client machines. This is used more or less everywhere on the web, commonly for user session
tracking purposes. In k6 cookies are managed automatically by default, however, there are use
cases where access to read and manipulate cookies are required.

## From the response headers

<div class="code-group" data-props='{ "labels": ["access-cookie.js"], "lineNumbers": [true] }'>

```js
import http from "k6/http";
import { check, group } from "k6";

export default function() {
    // Since this request redirects the `res.cookies` property won't contain the cookies
    let res = http.get("http://httpbin.org/cookies/set?name1=value1&name2=value2");
    check(res, {
        "status is 200": (r) => r.status === 200
    });

    // Make sure cookies have been added to VU cookie jar
    let vuJar = http.cookieJar();
    let cookiesForURL = vuJar.cookiesForURL(res.url);
    check(null, {
        "vu jar has cookie 'name1'": () => cookiesForURL.name1.length > 0,
        "vu jar has cookie 'name2'": () => cookiesForURL.name2.length > 0
    });
}
```

</div>

## Log all the cookies in a response
>    ### ⚠️ Note that this only works when using k6 locally
>
>    The `console.log()` family of APIs are currently only usable when running k6 locally.
>    When running k6 tests with LoadImpact Cloud Execution the logs will be discarded.

<div class="code-group" data-props='{ "labels": ["log-all-cookies.js"], "lineNumbers": [true] }'>

```js

// Example showing two methods how to log all cookies (with attributes) from a HTTP response.

import http from "k6/http";

function logCookie(cookie) {
    // Here we log the name and value of the cookie along with additional attributes.
    // For full list of attributes see: https://k6.io/docs/using-k6/cookies#properties-of-a-response-cookie-object
    console.log(`${cookie.name}: ${cookie.value}\n\tdomain: ${cookie.domain}\n\tpath: ${cookie.path}\n\texpires: ${cookie.expires}\n\thttpOnly: ${cookie.http_only}`);
}

export default function() {
    let res = http.get("https://www.google.com/");

    // Method 1: Use for-loop and check for non-inherited properties
    for (var name in res.cookies) {
        if (res.cookies.hasOwnProperty(name) !== undefined) {
            logCookie(res.cookies[name][0]);
        }
    }

    // Method 2: Use ES6 Map to loop over Object entries
    new Map(Object.entries(res.cookies)).forEach((v, k) => logCookie(v[0]) );
}
```

</div>

## Setting a cookie in the VU cookie jar
To set a cookie that should be sent with every request matching a particular domain, path, etc.
you'd do something like this:

<div class="code-group" data-props='{ "labels": ["set-cookie-in-jar.js"], "lineNumbers": [true] }'>

```js
import http from "k6/http";
import { check } from "k6";

export default function() {
    // Get VU cookie jar and add a cookie to it providing the parameters
    // that a request must match (domain, path, HTTPS or not etc.)
    // to have the cookie attached to it when sent to the server.
    let jar = http.cookieJar();
    jar.set("https://httpbin.org/cookies", "my_cookie", "hello world",
            { domain: "httpbin.org", path: "/cookies", secure: true, max_age: 600 });

    // As the following request is matching the above cookie in terms of domain,
    // path, HTTPS (secure) and will happen within the specified "age" limit, the
    // cookie will be attached to this request.
    let res = http.get("https://httpbin.org/cookies");
    check(res, {
        "has status 200": (r) => r.status === 200,
        "has cookie 'my_cookie'": (r) => r.json().cookies.my_cookie !== null,
        "cookie has correct value": (r) => r.json().cookies.my_cookie == "hello world"
    });
}
```

</div>

**Relevant k6 APIs**:
- [http.CookieJar](/javascript-api/k6-http/cookiejar-k6-http)
    - [set(name, value, [options])](/javascript-api/k6-http/cookiejar/cookiejar-set-name-value-options)
- [http.cookieJar()](/javascript-api/k6-http/cookiejar)
