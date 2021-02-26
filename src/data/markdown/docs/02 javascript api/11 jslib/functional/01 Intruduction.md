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

When writing integration tests and performance test, it's often necessary to execute conditional checks. For example, you may want to inspect JSON body only when the http response is 200. If it's 500, there's probably no JSON in the response.

It's possible to chain checks using the `.and()` function.

