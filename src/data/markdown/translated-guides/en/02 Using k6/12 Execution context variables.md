---
title: 'Execution context variables'
excerpt: '__VU and __ITER are both global variables with execution context information that k6 makes available to the test script.'
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

**\_\_VU** and **\_\_ITER** are both global variables with execution context information that k6 makes available to the test script.

### \_\_ITER

A numeric counter with the current iteration number for a specific VU. Zero-based.

### \_\_VU

Current VU number in use. The value is assigned incrementally for each new VU instance, starting from one. The variable will be 0 while executing the setup and teardown functions.

It's important to remember that this value is shown _per server instance running you test_. How many servers we use depends on the size of your test and how you spread it across different load zones. So for a larger test, the value of `__VU` will likely not reflect the actual _total_ number of VUs in your test at a given moment.

- For tests using **1-999** VUs per load zone, we use server instances that handle 300 VU's per machine. So for a 900 VU test using one load zone, there will be three instances and the value of `__VU` will vary from 1-300 per machine.
- For tests using **1000-4001** VUs per load zone, we use server instances that handle 1200 VUs per machine. So for a 1000 VU, 1-load-zone test, your `__VU` value will go all the way to 1000.
- For tests with **>4001** VUs per load zone, we use instances that handle 5000 VUs per machine.

As an example, if you run a 1000 VU test evenly distributed over two load zones, there are 500 VUs per load zone. Since this is in the 1-999 VU bracket, we'll use server instances that handle 300VUs apiece. This means 2 instances per load zone and your individual `__VU` values will thus vary from 1 to 250.


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
