---
title: 'Execution context variables'
excerpt: ''
---

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

**\_\_VU** and **\_\_ITER** are both global variables with execution context information that k6 makes
available to the test script.

### \_\_ITER

A numeric counter with the current iteration number for a specific VU. Zero-based.

### \_\_VU

Current VU number. The value is assigned incrementally for each new VU instance. One-based.
However, VU number is 0 while executing the setup and teardown functions.

> ### ⚠️ Additional context information available in the k6 Cloud
>
> If you are running a test in [k6 Cloud](/cloud) you will have additional
> [environment variables](/using-k6/environment-variables) that will tell you on which server, load zone
> and distribution of the test you are currently executing. You can read more about them
> [here](/using-k6/environment-variables)

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
