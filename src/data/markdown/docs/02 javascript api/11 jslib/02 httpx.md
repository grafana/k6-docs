---
title: "httpx"
excerpt: "httpx is a wrapper library around the native k6 http module"
---

The `httpx` module is an external JavaScript library that wraps around the native [k6/http](/javascript-api/k6-http) module. 
It's a http client with features that are not yet available in the native module.
 - ability to set http options globally (such as timeout)
 - ability to set default tags and headers that will be used for all requests
 - more user-friendly arguments to request functions (get, post, put take the same arguments)

httpx module integrates well with expect library. 

<Blockquote mod='warning'>

#### This library is in active development

This library is stable enough to be useful, but pay attention to the new versions released on [jslib.k6.io](https://jslib.k6.io). 

This documentation is for the last version only. If you discover that some of the code below does not work, it most likely means that you are using an older version.

</Blockquote>

Source code available on [GitHub](https://github.com/k6io/k6-jslib-httpx). 

Please request features and report bugs through [GitHub issues](https://github.com/k6io/k6-jslib-httpx/issues).


### Example

<CodeGroup labels={["httpx session"]}>

```javascript
import { fail } from 'k6';
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.3/index.js';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

const USERNAME = `user${randomIntBetween(1, 100000)}@example.com`;  // random email address
const PASSWORD = 'superCroc2021';

let session = new Httpx({
    baseURL: 'https://test-api.k6.io', 
    headers: {
        'User-Agent': "My custom user agent",
        "Content-Type": 'application/x-www-form-urlencoded' 
    },
    timeout: 20000 // 20s timeout.
});

export default function testSuite() {

  let registrationResp = session.post(`/user/register/`, {
    first_name: 'Crocodile',
    last_name: 'Owner',
    username: USERNAME,
    password: PASSWORD,
  });

  if (registrationResp.status !== 201){
    fail("registration failed")
  }

  let loginResp = session.post(`/auth/token/login/`, {
    username: USERNAME,
    password: PASSWORD
  });

  if(loginResp.status !== 200){
    fail("Authentication failed");
  }

  let authToken = loginResp.json('access');

  // set the authorization header on the session for the subsequent requests.
  session.addHeader('Authorization', `Bearer ${authToken}`);

  let payload = {
    name: `Croc Name`,
    sex: "M",
    date_of_birth: '2019-01-01',
  };

  // this request uses the Authorization header set above.
  let respCreateCrocodile = session.post(`/my/crocodiles/`, payload);

  if(respCreateCrocodile.status !== 201){
    fail("Crocodile creation failed");
  }
  else{
    console.log("New crocodile created");
  }
}

```

</CodeGroup>