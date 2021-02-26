---
title: 'Getting started with functional.js'
description: 'Introduction to functional testing in k6.'
---

The design of the `functional` library was inspired by Jest. If you already know Jest, using this library should be very simple. 

The `functional` library is built on top the built-in `check` and `group` k6 APIs.


Let's get started by writing a test for a hypothetical http API that should return '200 OK' response. 
First, create a `mytest.js` k6 script file.


<CodeGroup labels={[]}>

```javascript
import { test } from 'https://jslib.k6.io/functional/0.0.2/index.js';
import http from 'k6/http';

export default function testSuite() {

  test('Basic API test', (t) => {
    let response = http.get("https://test-api.k6.io/public/crocodiles")

    t.expect(response.status).as("API status code").toEqual(200);
  })
}
```

</CodeGroup>

If you are familiar with k6, this is similar to using the built-in `group` and `check` functionality, but with different names.

When you run this test with `k6 run mytest.js` the result should look similar to this:

```
█ Basic API test
    ✓ response status is 200.
```

This basic example is not very exciting, because the same result can be achieved with `group` and `check`, so let's move on to more interesting examples.

### Chain of checks.

When writing integration tests, it's often necessary to execute conditional checks. For example, you may want to verify the response json only when the http response is 200. If it's 500, there's probably no json in the response.

It's possible to chain checks using the `.and()` function.



### Making the test resilient

`functional` library is designed to make it easy to write test scripts that are resilient agains failing SUT. 

This is most simple to demonstrate with an example. 

<CodeGroup labels={[]}>

```javascript
import { check } from 'k6';
import http from 'k6/http';
export default function () {
  let res = http.get("https://test-api.k6.io/public/crocodiles");

  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  check(res, {
    'got more than 5 crocs': (r) => r.json().length > 5,
  });

  // more code here
}
```

</CodeGroup>


This code will work fine as long as SUT (System under test) returns correct responses. When the SUT starts to fail, there's a good chance the `r.json().length` will throw an exception similar to 

```bash
ERRO[0001] GoError: cannot parse json due to an error at line 1, character 2 , error: invalid character '<' looking for beginning of value
running at reflect.methodValueCall (native)
default at gotMoreThan5Crocs (file:///home/sniku/workspace/load/scripts/happy-path-check.js:7:68(5))
	at github.com/loadimpact/k6/js/common.Bind.func1 (native)
	at file:///home/sniku/workspace/load/scripts/happy-path-check.js:5:22(17)  executor=per-vu-iterations scenario=default source=stacktrace
```

In this example, system was overloaded and the load balancer returned 503 response that did not have a valid json body. k6 has thrown a JavaScript exception and restarted from the beginning. 
This test code is fragile to failing SUT.


<CodeGroup labels={[]}>

```javascript

import { test } from 'https://jslib.k6.io/functional/0.0.2/index.js';
import http from 'k6/http';

export default function testSuite() {

  test('Fetch a list of public crocodiles', (t) => {
    let response = http.get("https://test-api.k6.io/public/crocodiles")

    t.expect(response.status).as("response status").toEqual(200)
      .and(response).toHaveValidJson()
      .and(response.json().length).as("number of crocs").toBeGreaterThan(5);
  })

} 
```

</CodeGroup>


# TODO
- Describe chaining.

