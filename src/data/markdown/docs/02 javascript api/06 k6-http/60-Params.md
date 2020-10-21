---
title: 'Params'
description: 'Used for setting various HTTP request-specific parameters such as headers, cookies, etc.'
---

_Params_ is an object used by the http.\* methods that generate HTTP requests. _Params_ contains request-specific options like e.g. HTTP headers that should be inserted into the request.

| Name                  | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Params.auth`         | string | The authentication method used for the request. It currently supports `digest`, `ntlm`, and `basic` authentication methods.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `Params.cookies`      | object | Object with key-value pairs representing request scoped cookies (they won't be added to VU cookie jar)<br />`{cookies: { key: "val", key2: "val2" }}`<br /><br />You also have the option to say that a request scoped cookie should override a cookie in the VU cookie jar:<br />`{cookies: { key: { value: "val", replace: true }}}`                                                                                                                                                                                                                                                            |
| `Params.headers`      | object | Object with key-value pairs representing custom HTTP headers the user would like to add to the request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `Params.jar`          | object | http.CookieJar object to override default VU cookie jar with. Cookies added to request will be sourced from this jar and cookies set by server will be added to this jar.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `Params.redirects`    | number | The number of redirects to follow for this request. Overrides the global test option [`maxRedirects`](/using-k6/options).                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `Params.tags`         | object | Key-value pairs where the keys are names of tags and the values are tag values. Response time metrics generated as a result of the request will have these tags added to them, allowing the user to filter out those results specifically, when looking at results data.                                                                                                                                                                                                                                                                                                                          |
| `Params.timeout`      | number | Request timeout to use in milliseconds. Default timeout is 60000ms(60 seconds).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `Params.compression`  | string | Sets whether the request body should be compressed. If set to `gzip` it will use gzip to compress the body and set the appropriate `Content-Length` and `Content-Encoding` headers.<br /><br />Possible values: `gzip`, `deflate`, `br`, `zstd`, and any comma-separated combination of them (for stacked compression)                                                                                                                                                                                                                                                                            |
| `Params.responseType` | string | ResponseType is used to specify how to treat the body of the response. The three options are:<br />- text: k6 will return it as a string. This might not be what you want in cases of binary data as the conversation to UTF-16 will probably break it. This is also the default if<br />[discardResponseBodies](/using-k6/options) is set to false or not set at all.<br />- `binary`: k6 will return an array of ints/bytes<br />- `none`: k6 will return null as the body. The whole body will be ignored. This is the default when [discardResponseBodies](/using-k6/options) is set to true. |

### Example of custom HTTP headers and tags

_A k6 script that will make an HTTP request with a custom HTTP header and tag results data with a specific tag_

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

export default function () {
  let params = {
    cookies: { my_cookie: 'value' },
    headers: { 'X-MyHeader': 'k6test' },
    redirects: 5,
    tags: { k6test: 'yes' },
  };
  let res = http.get('https://k6.io', params);
}
```

</CodeGroup>

### Example using http.batch() with Params

Here is another example using [http.batch()](/javascript-api/k6-http/batch-requests) with a `Params` argument:

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

let url1 = 'https://api.k6.io/v3/account/me';
let url2 = 'http://httpbin.org/get';
let apiToken =
  'f232831bda15dd233c53b9c548732c0197619a3d3c451134d9abded7eb5bb195';
let requestHeaders = {
  'User-Agent': 'k6',
  Authorization: 'Token ' + apiToken,
};

export default function () {
  let res = http.batch([
    { method: 'GET', url: url1, params: { headers: requestHeaders } },
    { method: 'GET', url: url2 },
  ]);
}
```

</CodeGroup>

### Example of Digest Authentication

Here is one example of how to use the `Params` to Digest Authentication.

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  // Passing username and password as part of URL plus the auth option will authenticate using HTTP Digest authentication
  let res = http.get(
    'http://user:passwd@httpbin.org/digest-auth/auth/user/passwd',
    { auth: 'digest' },
  );

  // Verify response
  check(res, {
    'status is 200': (r) => r.status === 200,
    'is authenticated': (r) => r.json().authenticated === true,
    'is correct user': (r) => r.json().user === 'user',
  });
}
```

</CodeGroup>
Example how to overwrite discardResponseBodies:

### Example of overwrite discardResponseBodies

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

export var options = { discardResponseBodies: true };
export default function () {}
export function setup() {
  // Get 10 random bytes in as an array of ints/bytes, without the responseType the body will be null
  const response = http.get('https://httpbin.org/bytes/10', {
    responseType: 'binary',
  });
  // Print the array. Will look something like `176,61,15,66,233,98,223,196,43,1`
  console.log(response.body);
}
```

</CodeGroup>
