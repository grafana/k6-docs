---
title: 'k6chaijs'
description: 'Assertion library for k6'
weight: 03
---

# k6chaijs

{{< admonition type="note" >}}

The source code for this library can be found in the [grafana/k6-jslib-k6chaijs](https://github.com/grafana/k6-jslib-k6chaijs) GitHub repository.

{{< /admonition >}}

`k6chaijs` is a library to provide BDD assertions in k6 based on [ChaiJS](https://www.chaijs.com/). You can use `k6chaijs` as an alternative to [check](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check) and [group](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/group).

With this library, you get the following:

- BDD style of assertions for more expressive language
- Chainable assertions
- More powerful assertions functions such as: `deep`, `nested`, `ordered`, etc.
- Automatic assertion messages
- [Exception handling](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6chaijs/error-handling) for better test stability

## Installation

This library is hosted on [jslib](https://jslib.k6.io/) and can be imported directly in your k6 script.

<!-- md-k6:skip -->

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';
```

Alternatively, you can use a copy of this file stored locally. The source code is available on [GitHub](https://github.com/grafana/k6-jslib-k6chaijs).

## Example

The following example tests a hypothetical HTTP API that returns a JSON array of objects. Copy the following code, and save it as `script.js`:

{{< code >}}

```javascript
import http from 'k6/http';
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

export default function testSuite() {
  describe('Fetch a list of pizza names', () => {
    const response = http.get('https://quickpizza.grafana.com/api/names');

    expect(response.status, 'response status').to.equal(200);
    expect(response).to.have.validJsonBody();
    expect(response.json('names').length, 'number of names').to.be.above(1);
  });
}
```

{{< /code >}}

When you run this test with `k6 run script.js`, the output at the end of the test shows:

```bash
█ Fetch a list of public crocodiles
  ✓ expected response status to equal 200
  ✓ has valid json body
  ✓ expected number of crocs to be above 4
```

If you are familiar with k6, the result is the same as using [check](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check) and [group](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/group). Note that [expect](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6chaijs/expect) might add or extend the assertion message.

## API

| API                                                                                         | Description                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [config](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6chaijs/config)     | Options to change `k6chaijs` behaviour.                                                                                                                                                                                               |
| [describe](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6chaijs/describe) | A wrapper of [group](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/group) that catches exceptions to allow continuing the test execution. It returns a boolean to indicate the success of all its `k6chaijs` assertions. |
| [expect](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6chaijs/expect)     | A wrapper of [check](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check) that provides BDD style of assertions.                                                                                                         |

## Plugins

It's possible to extend the default functionality with [Chai plugins](https://www.chaijs.com/plugins/). To use a plugin or build a Chai version with plugins, follow the instructions in this [example](https://community.grafana.com/t/how-to-build-plugins-for-chaijs/97010/3).

## Read more

- [Use chai with k6](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/use-chai-with-k6/)
