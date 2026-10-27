---
title: 'HTTP debugging'
description: "Things don't always work as expected. For those cases there is a handy CLI flag, --http-debug, that is good to be aware of."
_build:
  list: false
weight: 17
---

# HTTP debugging

Things don't always work as expected. For those cases, enabling the [--http-debug](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#http-debug) option will log HTTP requests and responses to help you debugging the script.

- `--http-debug` logs the HTTP requests and responses, skipping the body.
- `--http-debug="full"` logs the HTTP requests and responses, including the full body.
- `--http-debug="redacted"` or `--http-debug="full,redacted"` logs the same output and masks credential headers.

The value is a comma-separated list, in any order and case-insensitive. For the full list of values, refer to the [HTTP debug option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#http-debug).

## Credential masking

By default, the debug output shows credential headers in plain text. To mask them, add `redacted` to the value:

```sh
k6 run --http-debug=full,redacted script.js
```

k6 then replaces the secret part of each credential header with `***REDACTED***`. This applies to requests and responses, including the `Authorization` header that k6 adds for URL credentials (`http://user:pass@host`) and digest authentication, and cookies from the cookie jar.

k6 masks these headers, case-insensitive:

- `Authorization` and `Proxy-Authorization`: k6 keeps the auth scheme, for example, `Authorization: Bearer ***REDACTED***`.
- `Cookie`: k6 keeps the cookie names, for example, `Cookie: session=***REDACTED***; theme=***REDACTED***`.
- `Set-Cookie`: k6 keeps the cookie name and attributes, for example, `Set-Cookie: sid=***REDACTED***; Path=/; HttpOnly`.
- `X-Api-Key`, `X-Auth-Token`, and `X-Amz-Security-Token`: k6 masks the whole value, for example, `X-Api-Key: ***REDACTED***`.

For gRPC, `--http-debug` also controls debug logging, and `redacted` masks gRPC metadata with the same names, for example, `authorization`. `full` still controls whether k6 logs gRPC payloads.

{{< admonition type="caution" >}}

`redacted` doesn't mask secrets inside request and response bodies, which `full` logs, or in URL query strings. For `k6 cloud run`, k6 also sends the debug output to the cloud logs, so check what your test logs before you share it.

Older k6 versions don't know `redacted`. They read `full,redacted` as `headers` and log credentials in plain text.

{{< /admonition >}}

## Example

Given the following script:

```javascript
import http from "k6/http";

export default function () {
      http.get("https://google.com/");
}
```

If we run it using `k6 run --http-debug script.js` we get output that looks like this:

```bash
          /\      |‾‾|  /‾‾/  /‾/
     /\  /  \     |  |_/  /  / /
    /  \/    \    |      |  /  ‾‾\
   /          \   |  |‾\  \ | (_) |
  / __________ \  |__|  \__\ \___/ .io

   execution: local
      output: -
      script: script.js

    duration: -,  iterations: 1
         vus: 1, max: 1

Request: [----------------------------------------------------------] starting

GET / HTTP/1.1
Host: google.com
User-Agent: k6/0.20.0 (https://k6.io/);
Accept-Encoding: gzip


RedirectResponse:
HTTP/2.0 302 Found
Content-Length: 267
Alt-Svc: hq=":443"; ma=2592000; quic=51303432; quic=51303431; quic=51303339; quic=51303335,quic=":443"; ma=2592000; v="42,41,39,35"
Cache-Control: private
Content-Type: text/html; charset=UTF-8
Date: Thu, 22 Mar 2018 13:39:44 GMT
Location: https://www.google.se/?gfe_rd=cr&dcr=0&ei=ILKzWqiODOaxX_LBi5AG
Referrer-Policy: no-referrer


RedirectRequest:
GET /?gfe_rd=cr&dcr=0&ei=ILKzWqiODOaxX_LBi5AG HTTP/1.1
Host: www.google.se
User-Agent: k6/0.19.0 (https://k6.io/);
Referer: https://google.com/
Accept-Encoding: gzip


Response:
HTTP/2.0 200 OK
Connection: close
Accept-Ranges: none
Alt-Svc: hq=":443"; ma=2592000; quic=51303432; quic=51303431; quic=51303339; quic=51303335,quic=":443"; ma=2592000; v="42,41,39,35"
Cache-Control: private, max-age=0
Content-Type: text/html; charset=ISO-8859-1
Date: Thu, 22 Mar 2018 13:39:44 GMT
Expires: -1
P3p: CP="This is not a P3P policy! See g.co/p3phelp for more info."
Server: gws
Set-Cookie: 1P_JAR=2018-03-22-13; expires=Sat, 21-Apr-2018 13:39:44 GMT; path=/; domain=.google.se
Set-Cookie: NID=126=asTcm5s3-jMa1-pquG09m9lpUrowy-OtzZ9cUomBuKeJePbvwJAZe5wCtiyLITj9_RrlWLf6DTQ8ufpdB39MCRV-zUpfXAUw8XUVMWtgdU1gbtnQ9rssin56333g9Hyo; expires=Fri, 21-Sep-2018 13:39:44 GMT; path=/; domain=.google.se; HttpOnly
Vary: Accept-Encoding
X-Frame-Options: SAMEORIGIN
X-Xss-Protection: 1; mode=block

...

```

## Read more

- [Debugging Using a Web Proxy](https://k6.io/blog/k6-load-testing-debugging-using-a-web-proxy/)
