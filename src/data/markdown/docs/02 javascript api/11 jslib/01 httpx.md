---
title: "httpx"
excerpt: "httpx is a wrapper library around the native k6 http module"
---

The `httpx` module is an external JavaScript library that wraps around the native [k6/http](/javascript-api/k6-http) module. 
It a http client with features that are not yet available in the native module.
 - ability to set set http options globally (such as timeout)
 - ability to set default headers that will be used for all requests
 - ability to execute a custom callback after the response is received
 - more user-friendly arguments to request functions (get, post, put take the same arguments)
 - set baseURL 


httpx module integrates well with functional library. 


<Blockquote mod='warning'>

#### This library is in active development

This library is stable enough to be useful, but pay attention to the new versions released in jslib.k6.io. 

This documentation is for the last version only. If you discover that some of the code below does not work, it most likely means that you are using an older version.

</Blockquote>


### Example

<CodeGroup labels={["httpx session used together with functional library"]}>

```javascript
import { test } from 'https://jslib.k6.io/functional/0.0.1/index.js';
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.3/index.js';
import { randomIntBetween, 
         randomItem } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

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

  test(`Create a test user ${USERNAME}`, (t) => {

    let resp = session.post(`/user/register/`, {
      first_name: 'Crocodile',
      last_name: 'Owner',
      username: USERNAME,
      password: PASSWORD,
    });

    t.expect(resp.status).as("status").toEqual(201)
      .and(resp).toHaveValidJson();
  })

  &&

  test(`Authenticate the new user ${USERNAME}`, (t) => {

    let resp = session.post(`/auth/token/login/`, {
      username: USERNAME,
      password: PASSWORD
    });

    t.expect(resp.status).as("Auth status").toBeBetween(200, 204)
      .and(resp).toHaveValidJson()
      .and(resp.json('access')).as("auth token").toBeTruthy();

    let authToken = resp.json('access');
    // set the authorization header on the session for the subsequent requests.
    session.addHeader('Authorization', `Bearer ${authToken}`);

  })

  &&

  test('Create a new crocodile', (t) => {
    let payload = {
      name: `Croc Name`,
      sex: randomItem(["M", "F"]),
      date_of_birth: '2019-01-01',
    };

    let resp = session.post(`/my/crocodiles/`, payload);

    t.expect(resp.status).as("Croc creation status").toEqual(201)
      .and(resp).toHaveValidJson();
  })

}
```

</CodeGroup>