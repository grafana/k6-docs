---
title: 'Error handling in expect.js'
description: 'How to handle errors in expect.js.'
excerpt: 'How to handle errors in expect.js.'
---

<Blockquote mod="warning">

## expect.js library is no longer maintained
expect.js library has been deprecated in favor of Chaijs. 

Please migrate to [k6Chaijs library](/javascript-api/jslib/k6chaijs). The documentation below is retained for historical reasons.

</Blockquote>

When executing a performance or integration test, you should expect that your system under test may crash. If this happens, your test should print useful information rather than stack traces caused by unexpected HTTP responses.

`expect` library is designed to make it easy to write test scripts that are resilient to failing SUT (System Under Test).

It's not uncommon for performance testers to write fragile code that assumes the http response will contain expected data.

Fragile code is most clearly demonstrated with an example.

<CodeGroup labels={["Test code that is fragile to failing SUT"]}>

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
  });
  // more code here
}
```

</CodeGroup>


This code will work fine as long as SUT (System Under Test) returns correct responses. When the SUT starts to fail, there's a good chance the `r.json().length` will throw an exception similar to

```bash
ERRO[0001] cannot parse json due to an error at line 1, character 2 , error: invalid character '<' looking for beginning of value
running at reflect.methodValueCall (native)
default at gotMoreThan5Crocs (file:///home/user/happy-path-check.js:7:68(5))
  at github.com/k6io/k6/js/common.Bind.func1 (native)
  at file:///home/user/happy-path-check.js:5:22(17)  executor=per-vu-iterations scenario=default source=stacktrace
```

In this example, the system was overloaded, and the load balancer returned a 503 response that did not have a valid JSON body. k6 has thrown a JavaScript exception and restarted execution from the beginning.
This test code is fragile to failing SUT because the first `check` does not prevent the second check from executing.
It's possible to rewrite this code to be less fragile, but that will make it longer and less readable.

Error handling of this type happens automatically when using the `expect.js` library.
When the first `expect` fails, the remaining checks in the chain are not executed, and the test is marked as failed — the execution proceeds to the next `describe()` instead of restarting from the top.


<CodeGroup labels={["Resilient code written using expect.js"]}>

```javascript
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
import http from 'k6/http';

export default function () {
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
  // more code here
}
```

</CodeGroup>

# Handling exceptions

Sometimes it's hard to predict the way SUT can fail. For those cases, the `expect` library caught any exceptions thrown inside of `describe()` body, and records it as a failed condition.

<CodeGroup labels={[]}>

```javascript
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
import http from 'k6/http';

export default function testSuite() {
  describe('Executing test against a Shaky SUT', (t) => {
    throw 'Something entirely unexpected happened';
  });
}
```

</CodeGroup>

Execution of this script should print the following output.


![output](./images/exception-handling.png)
