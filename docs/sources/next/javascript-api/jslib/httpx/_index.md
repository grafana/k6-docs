---
title: 'httpx'
description: 'httpx is a wrapper library around the native k6 http module'
weight: 02
---

# httpx

{{< admonition type="note" >}}

The source code for this library can be found in the [grafana/k6-jslib-httpx](https://github.com/k6io/k6-jslib-httpx) GitHub repository.

{{< /admonition >}}

The `httpx` module is an external JavaScript library that wraps around the native [k6/http](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http) module.
It's an HTTP client with features that are not yet available in the native module.

- Ability to set HTTP options globally (such as timeout).
- Ability to set default tags and headers that will be used for all requests.
- More user-friendly arguments to request functions (get, post, put take the same arguments).

The `httpx` module integrates well with the expect library.

{{< admonition type="caution" >}}

This library is in active development. It's stable enough to be useful, but you can watch the [GitHub repository](https://github.com/k6io/k6-jslib-httpx) to be notified when a new version is released.

{{< /admonition >}}

### Methods

| Function                                                                                                                        | Description                                                        |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [asyncRequest(method, url, [body], [params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/asyncrequest) | Generic method for making arbitrary, asynchronous HTTP requests.   |
| [request(method, url, [body], [params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/request)           | Generic method for making arbitrary HTTP requests.                 |
| [get(url, [body], [params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/get)                           | Makes GET request                                                  |
| [post(url, [body], [params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/post)                         | Makes POST request                                                 |
| [put(url, [body], [params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/put)                           | Makes PUT request                                                  |
| [patch(url, [body], [params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/patch)                       | Makes PATCH request                                                |
| [delete(url, [body], [params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/delete)                     | Makes DELETE request                                               |
| [batch(requests)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/batch)                                    | Batches multiple HTTP requests together to issue them in parallel. |
| [setBaseUrl(url)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/setbaseurl)                               | Sets the base URL for the session                                  |
| [addHeader(key, value)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/addheader)                          | Adds a header to the session                                       |
| [addHeaders(object)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/addheaders)                            | Adds multiple headers to the session                               |
| [clearHeader(name)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/clearheader)                            | Removes header from the session                                    |
| [addTag(key, value)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/addtag)                                | Adds a tag to the session                                          |
| [addTags(object)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/addtags)                                  | Adds multiple tags to the session                                  |
| [clearTag(name)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/httpx/cleartag)                                  | Removes tag from the session                                       |

### Example

{{< code >}}

```javascript
import { fail } from 'k6';
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const USERNAME = `user${randomIntBetween(1, 100000)}@example.com`; // random email address
const PASSWORD = 'superCroc2021';

const session = new Httpx({
  baseURL: 'https://test-api.k6.io',
  headers: {
    'User-Agent': 'My custom user agent',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  timeout: 20000, // 20s timeout.
});

export default function testSuite() {
  const registrationResp = session.post(`/user/register/`, {
    first_name: 'Crocodile',
    last_name: 'Owner',
    username: USERNAME,
    password: PASSWORD,
  });

  if (registrationResp.status !== 201) {
    fail('registration failed');
  }

  const loginResp = session.post(`/auth/token/login/`, {
    username: USERNAME,
    password: PASSWORD,
  });

  if (loginResp.status !== 200) {
    fail('Authentication failed');
  }

  const authToken = loginResp.json('access');

  // set the authorization header on the session for the subsequent requests.
  session.addHeader('Authorization', `Bearer ${authToken}`);

  const payload = {
    name: `Croc Name`,
    sex: 'M',
    date_of_birth: '2019-01-01',
  };

  // this request uses the Authorization header set above.
  const respCreateCrocodile = session.post(`/my/crocodiles/`, payload);

  if (respCreateCrocodile.status !== 201) {
    fail('Crocodile creation failed');
  } else {
    console.log('New crocodile created');
  }
}
```

{{< /code >}}
