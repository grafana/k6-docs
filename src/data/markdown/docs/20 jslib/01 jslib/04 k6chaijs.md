---
title: "k6chaijs"
excerpt: "Assertion library for k6"
---

[Chai Assertion Library](https://www.chaijs.com/) is an assertion library that is delightfully paired with k6 to provide more developer friendly BDD / TDD assertion style. It's a more powerful alternative to the k6-native `check()` and `group()`. 

This library is recommended for any type of testing, but especially:
 - Functional testing, where many asserts are needed
 - Stress testing, where the System Under Test is failing and the test code needs to stay robust.
 - Load testing, when the test should be aborted as soon as the first failure occurs.
 - JavaScript Developers that are already familiar with Chai, Jest or Jasmine.

> ⭐️ Source code available on [GitHub](https://github.com/grafana/k6-jslib-k6chaijs). 
> Please request features and report bugs through [GitHub issues](https://github.com/grafana/k6-jslib-k6chaijs/issues).


## Installation

There's nothing to install. This library is hosted on [jslib](https://jslib.k6.io/) and can be imported in the k6 script directly.


<CodeGroup labels={[]}>

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
```

</CodeGroup>

Alternatively, you can use a copy of this file stored locally.

## Hello world

Let's get started by writing a test for a hypothetical HTTP API that should return a JSON array of objects. 

First, create a `mytest.js` k6 script file.


<CodeGroup labels={[]}>

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import http from 'k6/http';

export default function testSuite() {
  describe('Basic API test', () => {
    const response = http.get('https://test-api.k6.io/public/crocodiles');
    expect(response.status, 'API status code').to.equal(200);
  });
}
```

</CodeGroup>

If you are familiar with k6, this is similar to using the built-in `group` and `check` functionality but with different names.

When you run this test with `k6 run mytest.js` the result should look similar to this:

```bash
█ Basic API test
  ✓ expected API status code to equal 200
```

This basic example is not very exciting because the same result can be achieved with `group` and `check`, so let's move on to more interesting examples.

## Chain of assertions

When writing integration tests and performance test, it's often necessary to execute conditional checks. For example, you may want to inspect the JSON body only when the http response is 200. If it's 500, the body is not relevant and should not be inspected. 

Unlike `check()`, when `expect()` fails, it stops the execution of the following assertions in the entire `describe()`group.


<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';

export default function testSuite() {
  describe('Fetch a list of public crocodiles', () => {
    const response = http.get('https://test-api.k6.io/public/crocodiles');

    expect(response.status, 'response status').to.equal(200);
    expect(response).to.have.validJsonBody();
    expect(response.json().length, 'number of crocs').to.be.above(4);
  });
}
```

</CodeGroup>

The above script should result in the following being printed after execution:

```bash
█ Fetch a list of public crocodiles
  ✓ expected response status to equal 200
  ✓ has valid json body
  ✓ expected number of crocs to be above 4
```

When the status code isn't 200, the remaining two calls to `expect()` are omitted and the result looks like this.

```bash
█ Fetch a list of public crocodiles
  ✗ expected response status to equal 200
  ↳  0% — ✓ 0 / ✗ 1
```

All examples documented in official [Chai's API documentation](https://www.chaijs.com/api/bdd/) are runnable in k6. For specific APIs, please refer to the official documentation. 

More advanced examples can be found in the [examples section](/examples/functional-testing)

## Configuration

Chai exposes a number of configuration options that can change how the library behaves. See [configuration](./k6chaijs/configuration).

## Plugins

It's possible to extend the Chaijs default functionality with additional plugins. See [plugins](./k6chaijs/plugins).



