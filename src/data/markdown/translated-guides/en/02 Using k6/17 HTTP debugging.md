---
title: 'HTTP debugging'
excerpt: "Things don't always work as expected. For those cases there is a handy CLI flag, --http-debug, that is good to be aware of."
hideFromSidebar: true
---

Things don't always work as expected. For those cases, enabling the [--http-debug](/using-k6/k6-options/reference#http-debug) option will log HTTP requests and responses to help you debugging the script.

- `--http-debug` logs the HTTP requests and responses, skipping the body.
- `--http-debug="full"` logs the HTTP requests and responses, including the full body.

## Example

Given the following script:

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
import http from "k6/http";

export default function() {
      http.get("https://google.com/");
}
```

</CodeGroup>

If we run it using `k6 run --http-debug script.js` we get output that looks like this:

<CodeGroup labels={[]} lineNumbers={[true]}>

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

</CodeGroup>


## Read more

- [Debugging Using a Web Proxy](https://k6.io/blog/k6-load-testing-debugging-using-a-web-proxy/)
- [What is the best way to debug my load test scripts?](/cloud/creating-and-running-a-test/troubleshooting/)
