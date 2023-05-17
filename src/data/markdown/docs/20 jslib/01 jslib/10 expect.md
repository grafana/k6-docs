---
title: "expect"
excerpt: "Functional testing and specifying robust expectations with k6"
hideFromSidebar: true
---

<Blockquote mod="warning">

## expect.js library is no longer maintained

expect.js library has been deprecated in favor of Chaijs. 

Please migrate to [k6Chaijs library](/javascript-api/jslib/k6chaijs). The documentation below is retained for historical reasons.

</Blockquote>

The `expect` module is a JavaScript library that simplifies specifying expectations about the responses from the target system. The design of the `expect` library was inspired by ava, Jest and Jasmine. If you already know one of these frameworks, using this library should be very simple. 

This library is especially useful for:
 - Functional testing, where many asserts are needed
 - [Stress testing](/test-types/stress-testing/), where the System Under Test is failing and the test code needs to stay robust.
 - Load testing, where the failures of the System Under Test need to be robustly collected for analysis

> ⭐️ Source code available on [GitHub](https://github.com/k6io/k6-jslib-expect). 
> Please request features and report bugs through [GitHub issues](https://github.com/k6io/k6-jslib-expect/issues).

## Installation
There's nothing to install. This library is hosted on [jslib](https://jslib.k6.io/) and can be imported in the k6 script directly.

<CodeGroup labels={[]}>

```javascript
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
```

</CodeGroup>

Alternatively, you can use a copy of this file stored locally.

## Simple example

Let's get started by writing a test for a hypothetical HTTP API that should return a JSON array of objects. 

First, create a `mytest.js` k6 script file.


<CodeGroup labels={[]}>

```javascript
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
import http from 'k6/http';

export default function testSuite() {
  describe('Basic API test', (t) => {
    const response = http.get('https://test-api.k6.io/public/crocodiles');

    t.expect(response.status).as('API status code').toEqual(200);
  });
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

When writing integration tests and performance test, it's often necessary to execute conditional checks. For example, you may want to inspect the JSON body only when the http response is 200. If it's 500, the body is not relevant and should not be inspected. 

It's possible to chain checks using the `.and()` function, as shown below.

<CodeGroup labels={[]}>

```javascript
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
import http from 'k6/http';

export default function testSuite() {
  describe('Fetch a list of public crocodiles', (t) => {
    const response = http.get('https://test-api.k6.io/public/crocodiles');

    t.expect(response.status)
      .as('response status')
      .toEqual(200)
      .and(response)
      .toHaveValidJson()
      .and(response.json().length)
      .as('number of crocs')
      .toBeGreaterThan(5);
  });
}
```

</CodeGroup>

When you run this test with `k6 run mytest.js`, the result should look similar to this:

The above script should result in the following being printed after execution:

```
█ Fetch a list of public crocodiles
  ✓ response status is 200.
  ✓ https://test-api.k6.io/public/crocodiles has valid json response
  ✓ number of crocs is greater than 5
```

More advanced examples can be found in the [examples section](/examples/functional-testing)


| Function | Description |
| -------- | ----------- |
| [describe(name, function)](/javascript-api/jslib/expect/describe)  | Entry point for creating tests. |
| [expect(value)](/javascript-api/jslib/expect/expect)  | expect(value) sets the value to be used in comparison by the next function in the chain |
| [and(value)](/javascript-api/jslib/expect/and)  | and(value) is similar to expect(value), but can be used in a chain. |
| [as(alias)](/javascript-api/jslib/expect/as)  | as(alias) sets a textual representation of the value passed to `expect` or `and`. |
| [toEqual(value)](/javascript-api/jslib/expect/toequal)  | The `.toEqual(expectedValue)` is similar to `===`    |
| [toBeGreaterThan(expectedValue)](/javascript-api/jslib/expect/tobegreaterthan)  | Use to verify that `received` > `expected` |
| [toBeGreaterThanOrEqual(expectedValue)](/javascript-api/jslib/expect/tobegreaterthanorequal)  | Use to verify that `received` >= `expected` |
| [toBeLessThan(expectedValue)](/javascript-api/jslib/expect/tobelessthan)  | Use to verify that `received` < `expected` |
| [toBeLessThanOrEqual(expectedValue)](/javascript-api/jslib/expect/tobelessthanorequal)  | Use to verify that `received` <= `expected` |
| [toBeBetween(from, to)](/javascript-api/jslib/expect/tobebetween)  | Use to verify that expected value is within range. |
| [toBeTruthy()](/javascript-api/jslib/expect/tobetruthy)  | Use `.toBeTruthy` when you don't care what a value is and you want to ensure a value is true in a boolean context.  | 
| [toHaveValidJson()](/javascript-api/jslib/expect/tohavevalidjson)  | Use to verify that the http response has a valid JSON body. |


