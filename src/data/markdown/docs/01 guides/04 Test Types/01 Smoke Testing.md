---
title: "Smoke testing"
head_title: 'What is Smoke Testing? How to create a Smoke Test in k6'
excerpt: "Smoke test is a regular load test, configured for minimal load. You want to run a smoke test as a sanity check every time you write a new
script or modify an existing script. Let’s see an example."
---

Smoke test is a regular load test, configured for minimal load. 
You want to run a smoke test as a sanity check every time you write a new script or modify an existing script.

You want to run a smoke test to:
 1. Verify that your test script doesn't have errors.
 2. Verify that your system doesn't throw any errors when under minimal load.

## Smoke testing in k6

Here's a relatively simple smoke test script to get you started. You can copy it, change a few URLs and start testing in no time.
If you would like to see more comprehensive script, check out our [example section](/examples).

<div class="code-group" data-props='{"labels": ["sample-smoke-test.js"], "lineNumbers": [true]}'>

```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1,  // 1 user looping for 1 minute
  duration: '1m',

  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  }
};

const BASE_URL = 'https://test-api.k6.io'; 
const USERNAME = 'TestUser';
const PASSWORD = 'SuperCroc2020';

export default () => {
  let loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
    username: USERNAME,
    password: PASSWORD
  });  

  check(loginRes, { 'logged in successfully': (resp) => resp.json('access') !== '' });

  let authHeaders = { headers: {
    Authorization: `Bearer ${loginRes.json('access')}`
  }};

  let myObjects = http.get(`${BASE_URL}/my/crocodiles/`, authHeaders).json();
  check(myObjects, { 'retrieved crocodiles': (obj) => obj.length > 0 });

  sleep(1);
}
```
</div>

The VU chart of a smoke test should look similar to this. You want to use only 1 or 2 VUs. 
![Smoke test VU chart](./images/smoke-test.png)

If your smoke test produced any errors, you must either correct the script or fix your environment 
before you can continue. 

The k6 output should look similar to this:
![Smoke test Terminal Output](./images/smoke-test-terminal-output.png)

Once your smoke test shows 0 errors, as on the screenshot above, you can go to the next step and execute a [load test](/test-types/load-testing) to assess the performance of your system.
