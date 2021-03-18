---
title: 'Getting started with functional.js'
description: 'Introduction to functional testing in k6.'
---

The design of the `functional` library was inspired by ava, Jest and Jasmine. If you already know one of these frameworks, using this library should be very simple. 

The `functional` library is built on top of the built-in `check` and `group` k6 APIs.


## Installation
There's nothing to install. This library is hosted on jslib and can be imported in the k6 script directly.

<CodeGroup labels={[]}>

```javascript
import { describe } from 'https://jslib.k6.io/functional/0.0.3/index.js';
```

</CodeGroup>

Alternatively, you can use a copy of this file stored locally.

## Simple example

Let's get started by writing a test for a hypothetical http API that should return a JSON array of objects. 

First, create a `mytest.js` k6 script file.


<CodeGroup labels={[]}>

```javascript
import { describe } from 'https://jslib.k6.io/functional/0.0.3/index.js';
import http from 'k6/http';

export default function testSuite() {
  describe('Basic API test', (t) => {
    let response = http.get("https://test-api.k6.io/public/crocodiles")

    t.expect(response.status).as("API status code").toEqual(200);
  })
}
```

</CodeGroup>

If you are familiar with k6, this is similar to using the built-in `group` and `check` functionality but with different names.

When you run this test with `k6 run mytest.js` the result should look similar to this:

```
█ Basic API test
    ✓ response status is 200.
```

This basic example is not very exciting because the same result can be achieved with `group` and `check`, so let's move on to more interesting examples.

### Chain of checks

When writing integration tests and performance test, it's often necessary to execute conditional checks. For example, you may want to inspect the JSON body only when the http response is 200. If it's 500, there's probably no JSON in the response, so there's no need to check for it.

It's possible to chain checks using the `.and()` function, as shown below.

<CodeGroup labels={[]}>

```javascript
import { describe } from 'https://jslib.k6.io/functional/0.0.3/index.js';
import http from 'k6/http';

export default function testSuite() {

  describe('Fetch a list of public crocodiles', (t) => {
    let response = http.get("https://test-api.k6.io/public/crocodiles")

    t.expect(response.status).as("response status").toEqual(200)
      .and(response).toHaveValidJson()
      .and(response.json().length).as("number of crocs").toBeGreaterThan(5);
  })
} 
```

</CodeGroup>

When you run this test with `k6 run mytest.js`, the result should look similar to this:


The above script should result in the following being printed after execution:

![functional.js sample output](./images/functional.js-sample-output.png)

More advanced examples can be found in the [examples section](/examples/functional-testing)