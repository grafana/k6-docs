---
title: 'Execution context variables'
excerpt: '__VU and __ITER are both global variables with execution context information that k6 makes available to the test script.'
---

> ### ✨ Execution API (since v0.34.0)
>
> The [k6/execution](/javascript-api/k6-execution) module exports an idiomatic alternative for getting the same values as \_\_VU and \_\_ITER and some other information about the execution state.

[The "Running k6" tutorial](/getting-started/running-k6) describes how k6 runs a test script for a specified
number of Virtual Users (VUs) and duration of time or a fixed number of iterations
for each VU.

When the `duration` option is specified, k6 will continuously run the test script for each VU
until the `duration` amount of time has elapsed.

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run --vus 10 --duration 30s script.js
```

</CodeGroup>

Alternatively, you could set the `iterations` option to specify the number of complete loops of
the test script k6 will execute for each VU.

<CodeGroup labels={[]} lineNumbers={[true]}>

```bash
$ k6 run --vus 10 --iterations 100 script.js
```

</CodeGroup>

## \_\_VU and \_\_ITER

**\_\_VU** and **\_\_ITER** are both global variables with execution context information that k6 makes available to the test script.

### \_\_ITER

A numeric counter with the current iteration number for a specific VU. Zero-based.

### \_\_VU

Current VU number in use. The value is assigned incrementally for each new VU instance, starting from one. The variable will be 0 while executing the setup and teardown functions.

> ### ⚠️ Running in the k6 Cloud
>
>When you run your tests in the [k6 Cloud](/cloud), the **\_\_VU** value you get will be per server/load generator. You can read the details in the [cloud docs](/cloud/cloud-faq/general-questions/#how-many-vus-can-be-run-from-the-same-dedicated-ip).
>
>In k6 Cloud you will also have additional [environment variables](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/#environment-variables) that will tell you on which server, load zone and distribution of the test you are currently executing.

## k6 Test Coordinator

k6 Virtual Users are concurrent, they will continuously execute through their script until the
test is over or they hit their iteration limit (if you set one as described above). When you ramp
up more Virtual Users, k6 will start new ones at that time. When you ramp down, k6 will stop them
after the completion of the iteration.

## Examples

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
