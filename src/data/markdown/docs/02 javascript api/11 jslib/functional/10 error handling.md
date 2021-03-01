---
title: 'Error handling'
description: 'How to handle errors.'
---

When executing performance test, you should expect errors. 

`functional` library is designed to make it easy to write test scripts that are resilient to failing SUT (System under test). 

There are several types of errors that can be encountered when running performance tests.

1. JavaScript exception is thrown when the SUT is overloaded.
2. Happy-path test code

This is a very typical scenario in which the test code assumes that the http response will contain expected data. 

## Example 
This is most clearly demonstrated on an example. 


<CodeGroup labels={[]}>

```javascript
import { check } from 'k6';
import http from 'k6/http';
export default function () {
  let res = http.get("https://test-api.k6.io/public/crocodiles");

  check(res, {
    'is status 200': (r) => r.status === 200,
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
default at gotMoreThan5Crocs (file:///home/user/happy-path-check.js:7:68(5))
	at github.com/loadimpact/k6/js/common.Bind.func1 (native)
	at file:///home/user/happy-path-check.js:5:22(17)  executor=per-vu-iterations scenario=default source=stacktrace
```

In this example, system was overloaded and the load balancer returned 503 response that did not have a valid json body. k6 has thrown a JavaScript exception and restarted from the beginning. 
This test code is fragile to failing SUT, because the first `check` does not prevent the second check from executing. 
It's possible to rewrite this code to be less fragile, but that will make it longer and less readbale. 

Error handling of this type happens automatically when using the `functional.js` library.
When the first `expect` fails, the remaining checks in the chain are not executed, and the test is makred as failed.


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

