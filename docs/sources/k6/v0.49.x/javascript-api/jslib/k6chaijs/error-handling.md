---
title: 'Error handling'
description: 'How to handle errors in k6chaijs.'
weight: 35
---

# Error handling

When you execute a load test, your System Under Test (SUT) may often become over saturated and start responding with errors. In this case, you need to consider what the iteration execution should do:

1. to embrace the system error and continue the execution of the scenario
2. or to exit

It's not uncommon for performance testers to forget about these cases. We often write fragile test code that assumes our system's response will always succeed and contain the expected data.

{{< code >}}

```javascript
import { check, group } from 'k6';
import http from 'k6/http';

export default function () {
  group('Fetch a list of public crocodiles', () => {
    const res = http.get('https://test-api.k6.io/public/crocodiles');
    check(res, {
      'is status 200': (r) => r.status === 200,
      'got more than 5 crocs': (r) => r.json().length > 5,
    });
    // ... continue test within the group...
  });

  group('other group', () => {
    //...
  });
}
```

{{< /code >}}

This code will work fine when the SUT returns correct responses. But, when the SUT starts to fail, `r.json().length` will throw an exception:

```bash
ERRO[0001] cannot parse json due to an error at line 1, character 2 , error: invalid character '<' looking for beginning of value
running at reflect.methodValueCall (native)
```

In this case, k6 throws a JavaScript exception and **exits the execution of the current iteration** but continues starting new iterations.

This might not be ideal because:

1. system errors are propagated as exceptions that are not reported on the test results
2. you might want to embrace these errors - as normal - and continue the execution

It's possible to rewrite this test to be less fragile, but it can make our test code longer and less readable.

## Handling exceptions

Sometimes it's hard to predict how a SUT might fail. For those cases, [describe](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6chaijs/describe) catches any internal exceptions and:

1. records them as failed assertions
2. continues the execution (outside of its `describe()` function)

{{< code >}}

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

export default function testSuite() {
  describe('Test case against a Shaky SUT', (t) => {
    throw 'Something entirely unexpected happened';
  });

  // this test case will be executed because
  // the previous `describe` catched the exception
  describe('Another test case', (t) => {
    expect(2).to.equal(2);
  });
}
```

{{< /code >}}

{{< code >}}

```bash
█ Test case against a Shaky SUT

  ✗ Exception raised "Something entirely unexpected happened"
  ↳  0% — ✓ 0 / ✗ 1

█ Another test case

  ✓ expected ${this} to equal 2
```

{{< /code >}}
