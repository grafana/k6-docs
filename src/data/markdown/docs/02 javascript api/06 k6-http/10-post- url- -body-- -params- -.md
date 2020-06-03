---
title: 'post( url, [body], [params] )'
description: 'Issue an HTTP POST request.'
---

| Parameter           | Type            | Description                                                                                      |
| ------------------- | --------------- | ------------------------------------------------------------------------------------------------ |
| `url`               | string          | Request URL (e.g. `http://example.com`).                                                         |
| `body`              | string / object | Request body; objects will be `x-www-form-urlencoded`.                                           |
| `params` (optional) | object          | [Params](/javascript-api/k6-http/params-k6-http) object containing additional request parameters |

### Returns

| Type       | Description                                                       |
| ---------- | ----------------------------------------------------------------- |
| `Response` | HTTP [Response](/javascript-api/k6-http/response-k6-http) object. |

### Example

Using http.post() to perform a user login at an E-commerce site:

<div class="code-group" data-props='{"labels": []}'>

```js
import http from 'k6/http';
import { check, fail } from 'k6';

export let options = { maxRedirects: 10 };

const baseURL = 'https://dev-li-david.pantheonsite.io';

export default function() {
  // Fetch the login page, with the login HTML form
  let res = http.get(baseURL + '/user/login');
  // Extract hidden value needed to POST form
  let formBuildID = res.body.match('name="form_build_id" value="(.*)"')[1];
  // Create an Object containing the form data
  let formdata = {
    name: 'testuser1',
    pass: 'testuser1',
    form_build_id: formBuildID,
    form_id: 'user_login',
    op: 'Log in',
  };
  let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  // Send login request
  res = http.post(baseURL + '/user/login', formdata, { headers: headers });
  // Verify that we ended up on the user page
  check(res, {
    'login succeeded': res => res.url == `${baseURL}/users/testuser1`,
  }) || fail('login failed');
}
```

</div>
