---
title: 'Params'
description: 'Used for setting various HTTP request-specific parameters such as headers, cookies, etc.'
description: 'Used for setting various HTTP request-specific parameters such as headers, cookies, etc.'
weight: 60
---

# Params

_Params_ is an object used by the http.\* methods that generate HTTP requests. _Params_ contains request-specific options like e.g. HTTP headers that should be inserted into the request.

| Name                      | Type                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Params.auth`             | string                                                                                                | The authentication method used for the request. It currently supports `digest`, `ntlm`, and `basic` authentication methods.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `Params.cookies`          | object                                                                                                | Object with key-value pairs representing request scoped cookies (they won't be added to VU cookie jar)<br />`{cookies: { key: "val", key2: "val2" }}`<br /><br />You also have the option to say that a request scoped cookie should override a cookie in the VU cookie jar:<br />`{cookies: { key: { value: "val", replace: true }}}`                                                                                                                                                                                                                                                                                                                                                                     |
| `Params.headers`          | object                                                                                                | Object with key-value pairs representing custom HTTP headers the user would like to add to the request.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `Params.jar`              | object                                                                                                | http.CookieJar object to override default VU cookie jar with. Cookies added to request will be sourced from this jar and cookies set by server will be added to this jar.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `Params.redirects`        | number                                                                                                | The number of redirects to follow for this request. Overrides the global test option [`maxRedirects`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `Params.tags`             | object                                                                                                | Key-value pairs where the keys are names of tags and the values are tag values. Response time metrics generated as a result of the request will have these tags added to them, allowing the user to filter out those results specifically, when looking at results data.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `Params.timeout`          | string / number                                                                                       | Maximum time to wait for the request to complete. Default timeout is 60 seconds (`"60s"`). <br/> The type can also be a number, in which case k6 interprets it as milliseconds, e.g., `60000` is equivalent to `"60s"`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `Params.compression`      | string                                                                                                | Sets whether the request body should be compressed. If set to `gzip` it will use gzip to compress the body and set the appropriate `Content-Length` and `Content-Encoding` headers.<br /><br />Possible values: `gzip`, `deflate`, `br`, `zstd`, and any comma-separated combination of them (for stacked compression). The default is no compression.                                                                                                                                                                                                                                                                                                                                                     |
| `Params.responseType`     | string                                                                                                | ResponseType is used to specify how to treat the body of the response. The three options are:<br />- text: k6 will return it as a string. This might not be what you want in cases of binary data as the conversation to UTF-16 will probably break it. This is also the default if<br />[discardResponseBodies](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference) is set to false or not set at all.<br />- `binary`: k6 will return an ArrayBuffer object<br />- `none`: k6 will return null as the body. The whole body will be ignored. This is the default when [discardResponseBodies](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference) is set to true. |
| `Params.responseCallback` | [expectedStatuses](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/expected-statuses) | sets a [responseCallback](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/set-response-callback) only for this request. For performance reasons it's better to initialize it once and reference it for each time the same callback will need to be used.                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### Example of custom HTTP headers and tags

_A k6 script that will make an HTTP request with a custom HTTP header and tag results data with a specific tag_

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  const params = {
    cookies: { my_cookie: 'value' },
    headers: { 'X-MyHeader': 'k6test' },
    redirects: 5,
    tags: { k6test: 'yes' },
  };
  const res = http.get('https://k6.io', params);
}
```

{{< /code >}}

### Example using http.batch() with Params

Here is another example using [http.batch()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/batch) with a `Params` argument:

{{< code >}}

```javascript
import http from 'k6/http';

const url1 = 'https://api.k6.io/v3/account/me';
const url2 = 'https://httpbin.test.k6.io/get';
const apiToken = 'f232831bda15dd233c53b9c548732c0197619a3d3c451134d9abded7eb5bb195';
const requestHeaders = {
  'User-Agent': 'k6',
  'Authorization': 'Token ' + apiToken,
};

export default function () {
  const res = http.batch([
    { method: 'GET', url: url1, params: { headers: requestHeaders } },
    { method: 'GET', url: url2 },
  ]);
}
```

{{< /code >}}

### Example of Digest Authentication

Here is one example of how to use the `Params` to Digest Authentication.

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  // Passing username and password as part of URL plus the auth option will authenticate using HTTP Digest authentication
  const res = http.get('http://user:passwd@httpbin.test.k6.io/digest-auth/auth/user/passwd', {
    auth: 'digest',
  });

  // Verify response
  check(res, {
    'status is 200': (r) => r.status === 200,
    'is authenticated': (r) => r.json().authenticated === true,
    'is correct user': (r) => r.json().user === 'user',
  });
}
```

{{< /code >}}

### Example of overriding discardResponseBodies

{{< code >}}

```javascript
import http from 'k6/http';

export const options = { discardResponseBodies: true };
export default function () {}
export function setup() {
  // Get 10 random bytes as an ArrayBuffer. Without the responseType the body
  // will be null.
  const response = http.get('https://httpbin.test.k6.io/bytes/10', {
    responseType: 'binary',
  });
  // response.body is an ArrayBuffer, so wrap it in a typed array view to access
  // its elements.
  const bodyView = new Uint8Array(response.body);
  // This will output something like `176,61,15,66,233,98,223,196,43,1`
  console.log(bodyView);
}
```

{{< /code >}}
