---
title: 'Execution context variables'
description: 'k6/execution module provides the capability to get information about the current test execution state inside the test script'
weight: 12
---

# Execution context variables

In some cases, it's really useful to have information about the script's current test-execution state. For example, you might want to

- Have different VUs run different test logic
- Use different data for each VU and iteration
- Figure out the stage that a test is in

To solve these issues, you can use _execution context variables_.

## k6/execution

The [k6/execution](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-execution) module exposes details about the current execution state, such as _the name of the currently executed scenario_, _how many VUs are currently active_, and more.
The module provides test-execution information via three properties:

| Property                                                                                  | Meta-information and execution details about |
| ----------------------------------------------------------------------------------------- | -------------------------------------------- |
| [instance](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-execution#instance) | The current running k6 instance              |
| [scenario](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-execution#scenario) | The current running scenario                 |
| [vu](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-execution#vu)             | The current VU and iteration                 |

> k6 v0.34.0 introduced the **k6/execution** module.
> If you are using a version k6 that does not have this module,
> refer to the [\_\_VU and \_\_ITER](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/execution-context-variables#__vu-and-__iter-discouraged) section.

## Example: log all context variables

If you want to experiment with what each context variable looks like as a test runs,
you can copy this template literal into one of your test scripts.

Note that this omits the `abort` variable, since that function would abort the test.

{{< code >}}

```javascript
import exec from 'k6/execution';

export default function () {
  console.log(`Execution context

Instance info
-------------
Vus active: ${exec.instance.vusActive}
Iterations completed: ${exec.instance.iterationsCompleted}
Iterations interrupted:  ${exec.instance.iterationsInterrupted}
Iterations completed:  ${exec.instance.iterationsCompleted}
Iterations active:  ${exec.instance.vusActive}
Initialized vus:  ${exec.instance.vusInitialized}
Time passed from start of run(ms):  ${exec.instance.currentTestRunDuration}

Scenario info
-------------
Name of the running scenario: ${exec.scenario.name}
Executor type: ${exec.scenario.executor}
Scenario start timestamp: ${exec.scenario.startTime}
Percenatage complete: ${exec.scenario.progress}
Iteration in instance: ${exec.scenario.iterationInInstance}
Iteration in test: ${exec.scenario.iterationInTest}

Test info
---------
All test options: ${exec.test.options}

VU info
-------
Iteration id: ${exec.vu.iterationInInstance}
Iteration in scenario: ${exec.vu.iterationInScenario}
VU ID in instance: ${exec.vu.idInInstance}
VU ID in test: ${exec.vu.idInTest}
VU tags: ${exec.vu.tags}`);
}
```

{{< /code >}}

For detailed reference, refer to the [k6/execution module](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-execution).

## Examples and use cases

- [Getting unique data once](https://grafana.com/docs/k6/<K6_VERSION>/examples/data-parameterization#retrieving-unique-data)
- [Timing operations](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-execution#timing-operations)
- [Executing different code blocks](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-execution#script-naming)

{{< collapse title="_VU and _ITER (discouraged)" >}}

⚠️ **\_\_VU** and **\_\_ITER** are both global variables with execution-context information that k6 makes available to the test script.

### \_\_ITER

A numeric counter with the current iteration number for a specific VU. Zero-based.

### \_\_VU

Current VU number in use. k6 assigns the value incrementally for each new VU instance, starting from one.
The variable is 0 when executing the setup and teardown functions.

### Running in k6 Cloud

When you run tests in [k6 Cloud](https://grafana.com/docs/grafana-cloud/k6/), the **\_\_VU** value is per server/load generator.
Read the details in the [cloud docs](https://grafana.com/docs/grafana-cloud/k6/reference/cloud-ips/).

### Examples

```javascript
import http from 'k6/http';
import { sleep } from 'k6';
export default function () {
  http.get('http://test.k6.io');
  console.log(`VU: ${__VU}  -  ITER: ${__ITER}`);
  sleep(1);
}
```

You can use execution-context variables to configure different test behaviors and parameterizations.
A typical use case is a load test that simulates different users performing a login flow.

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

{{< /collapse >}}

## Grafana Cloud k6 environment variables

If you run tests in k6 Cloud, you have additional environment variables that tell you the server, load zone, and distribution of the currently running test.
[Read about cloud environment variables](https://grafana.com/docs/grafana-cloud/k6/author-run/cloud-scripting-extras/cloud-environment-variables/).
