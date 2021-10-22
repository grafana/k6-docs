---
title: 'Execution context variables'
excerpt: 'k6/execution module provides the capability to get information about the current test execution state inside the test script'
---


In certain use cases information about the current test execution state inside your test scripts can be really useful.

## k6/execution

The [k6/execution](/javascript-api/k6-execution) module exposes various details about the current execution state, such as _the name of the currently executed scenario_ or _how many VUs are currently active_ and many more. The module provides test execution information via three properties:


| Property                                           | Description                                                                  |
| -------------------------------------------------- | ---------------------------------------------------------------------------- |
| [instance](/javascript-api/k6-execution/#instance) | Meta information and execution details on the currently running k6 instance  |
| [scenario](/javascript-api/k6-execution/#scenario) | Meta information and execution details about the current running scenario    |
| [vu](/javascript-api/k6-execution/#vu)             | Meta information and execution details about the current vu and iteration    |

> k6 v0.34.0 introduced **k6/execution** module. 
> If you are using an earlier version of k6, where the module is not available,
> refer to [\_\_VU and \_\_ITER](/using-k6/execution-context-variables/#__vu-and-__iter-discouraged) section.

## Examples and use cases

- [Getting unique data once](/examples/data-parameterization#retrieving-unique-data)
- [Timing operations](/javascript-api/k6-execution/#timing-operations)
- [Executing different code blocks](/javascript-api/k6-execution/#script-naming)

## \_\_VU and \_\_ITER (discouraged)
<Collapsible title="__VU and __ITER">

⚠️  **\_\_VU** and **\_\_ITER** are both global variables with execution context information that k6 makes available to the test script.

### \_\_ITER

A numeric counter with the current iteration number for a specific VU. Zero-based.

### \_\_VU

Current VU number in use. The value is assigned incrementally for each new VU instance, starting from one. The variable will be 0 while executing the setup and teardown functions.

### Running in the k6 Cloud

When you run your tests in the [k6 Cloud](/cloud), the **\_\_VU** value you get will be per server/load generator. You can read the details in the [cloud docs](/cloud/cloud-faq/general-questions/#how-many-vus-can-be-run-from-the-same-dedicated-ip).

### Examples

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';
export default function () {
  http.get('http://test.k6.io');
  console.log(`VU: ${__VU}  -  ITER: ${__ITER}`);
  sleep(1);
}
```

</CodeGroup>

Different test behaviors and parameterizations can be accomplished by making use of the
execution context variables. A typical use case would be a load test simulating different users
performing a login flow.

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';
export default function () {
  const email = `user+${__VU}@mail.com`;
  const payload = JSON.stringify({ email: email, password: 'test' });
  const params = { headers: { 'Content-Type': 'application/json' } };
  http.post('http://test.k6.io/login', payload, params);
  console.log(email);
  // .. continue the user flow
  sleep(1);
}
```
</CodeGroup>

</Collapsible>

## k6 Cloud environment variables

If you're running tests in k6 Cloud you will also have additional environment variables that will tell you on which server, load zone and distribution of the test you are currently executing.
You can find more details and examples [here](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/#cloud-environment-variables).
