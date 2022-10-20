---
title: "k6chaijs"
excerpt: "Assertion library for k6"
---

`k6chaijs` is a library to provide BDD / TDD assertions in k6 based on [ChaiJS](https://www.chaijs.com/). You can use `k6chaijs` as an alternative to [check](/javascript-api/k6/check/) and [group](/javascript-api/k6/group/).


This library is recommended for any type of testing, but especially for:
 - Functional testing, where many asserts are needed.
 - Stress testing, where the System Under Test is failing and the test code needs to stay robust.
 - Load testing, when the test should abort as soon as the first failure occurs.
 - Unit testing of JavaScript code, which is not necessarily connected with load. 
 - JavaScript Developers, who are already familiar with Chai, Jest or Jasmine.


## Installation

There's nothing to install. This library is hosted on [jslib](https://jslib.k6.io/) and can be imported in the k6 script directly.


<CodeGroup labels={[]}>

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js';
```

</CodeGroup>

Alternatively, you can use a copy of this file stored locally. The source code is available on [GitHub](https://github.com/grafana/k6-jslib-k6chaijs).

## Example

The following example tests a hypothetical HTTP API that returns a JSON array of objects. Copy the following code, and save it as `script.js`:

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.2/index.js';

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

When you run this test with `k6 run script.js`, the output at the end of the test shows:

```bash
█ Fetch a list of public crocodiles
  ✓ expected response status to equal 200
  ✓ has valid json body
  ✓ expected number of crocs to be above 4
```

If you are familiar with k6, the result is the same than using [check](/javascript-api/k6/check/) and [group](/javascript-api/k6/group/) but with different names.

## APIs

| Function | Description |
| -------- | ----------- |
| [config](/javascript-api/jslib/k6chaijs/config/)  | Options to change `k6chaijs` behaviour  |
| [describe](/javascript-api/jslib/k6chaijs/describe/)  |  |
| [expect](/javascript-api/jslib/k6chaijs/expect/)  |  |


## Plugins

It's possible to extend the default functionality with [Chai plugins](https://www.chaijs.com/plugins/).  Follow the build instructions on the [project repository](https://github.com/grafana/k6-jslib-k6chaijs).




