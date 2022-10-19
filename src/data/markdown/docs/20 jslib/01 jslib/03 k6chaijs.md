---
title: "k6chaijs"
excerpt: "Assertion library for k6"
---

`k6chaijs` is a k6 library to provide BDD / TDD assertions based on [ChaiJS](https://www.chaijs.com/). It is an alternative to using [check](/javascript-api/k6/check/) and [group](/javascript-api/k6/group/).


This library is recommended for any type of testing, but especially for:
 - Functional testing, where many asserts are needed.
 - Stress testing, where the System Under Test is failing and the test code needs to stay robust.
 - Load testing, when the test should abort as soon as the first failure occurs.
 - Unit testing of JavaScript code, which is not necessarily connected with load. 
 - JavaScript Developers, who are already familiar with Chai, Jest or Jasmine.

> ⭐️ Source code available on [GitHub](https://github.com/grafana/k6-jslib-k6chaijs). 


## Installation

There's nothing to install. This library is hosted on [jslib](https://jslib.k6.io/) and can be imported in the k6 script directly.


<CodeGroup labels={[]}>

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
```

</CodeGroup>

Alternatively, you can use a copy of this file stored locally.

## Example

The following example tests a hypothetical HTTP API that returns a JSON array of objects. Copy the following code, paste it into your favorite editor, and save it as `script.js`:

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

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

When you run this test with `k6 run script.js`, the output is:

```bash
█ Fetch a list of public crocodiles
  ✓ expected response status to equal 200
  ✓ has valid json body
  ✓ expected number of crocs to be above 4
```

If you are familiar with k6, the result is the same than using [check](/javascript-api/k6/check/) and [group](/javascript-api/k6/group/) but with different names.

## APIs

All examples documented in [Chai's official API documentation](https://www.chaijs.com/api/bdd/) are runnable in k6. For specific APIs, please refer to the official documentation. 

For more advanced examples, see the [examples section](/examples/functional-testing)

Chai exposes a number of configuration options that can change how the library behaves. See [configuration](/javascript-api/jslib/k6chaijs/configuration).

## Plugins

It's possible to extend the default functionality with [Chai plugins](https://www.chaijs.com/plugins/). Built the project See [plugins](/javascript-api/jslib/k6chaijs/).



