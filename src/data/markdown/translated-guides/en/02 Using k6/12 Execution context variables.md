---
title: 'Execution context variables'
excerpt: 'k6/execution module provides the capability to get information about the current test execution state inside the test script'
---

> ### ✨ Execution API (since v0.34.0)
>
> k6 v0.34.0 introduced [k6/execution](/javascript-api/k6-execution) module. 
> If you are using an earlier version of k6, where the module is not available,
> refer to [\_\_VU and \_\_ITER](/using-k6/execution-context-variables/#__vu-and-__iter-discouraged) section.

In certain use cases information about the current test execution state inside your test scripts can be really useful.
The [k6/execution](/javascript-api/k6-execution) module exposes various details about the current execution state, such as _the name of the currently executed scenario_ or _how many VUs are currently active_ and many more.

The [k6/execution](/javascript-api/k6-execution) module provides test execution information via three properties:

#### instance

Meta information and execution details for the currently running k6 instance. You can think of it as the current running k6 process, which will likely be a single process if you are running k6 on your local machine.
When running really large tests, either in [k6 cloud](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli) or using [distributed execution](/testing-guides/running-large-tests/#distributed-execution) it is possible that more than one k6 instance is responsible for generating load for the test. 

See all available [properties for instance](/javascript-api/k6-execution/#instance).

#### scenario

Meta information and execution details about the current running [scenario](/using-k6/scenarios).  
See all available [properties for scenario](/javascript-api/k6-execution/#scenario).

#### vu

Meta information and execution details about the current vu and iteration.  
See all available [properties for vu](/javascript-api/k6-execution/#vu).

## Examples and use cases

#### Timing operations

You can measure how much time was spent for specific functions or parts of your test.

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import { scenario } from 'k6/execution';

// Long running function
const runSomeHeavyOperation = () => {/*...*/};

export default function() {
  runSomeHeavyOperation();
  console.log(`${new Date() - new Date(scenario.startTime)} ms to run`);
}
```

</CodeGroup>

#### Getting unique data once

A common use case is getting a unique and incremental index for accessing a datasets item only once per test.

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import { scenario } from 'k6/execution';
import { SharedArray } from 'k6/data';

const data = new SharedArray('data', function() {
  const items = [];
  for (let i = 0; i < 100; i++) {
    items.push({ id: i });
  }
  return items;
});

export const options = {
  scenarios: {
    'use-all-the-data': {
      executor: 'shared-iterations',
      vus: 3,
      iterations: data.length, // can multiply so we iterate multiple times
      maxDuration: '1h' // has to be big enough so that all iterations go through if needed
    }
  }
}

export default function() {
  console.log('my item:', JSON.stringify(data[scenario.iterationInTest]));
}
```

</CodeGroup>

#### Executing different code blocks

You can use scenario names to execute different code blocks.

<CodeGroup labels={[]} lineNumbers={[true]}>

```javascript
import { scenario } from 'k6/execution';

export let options = {
  scenarios: {
    'the-first': {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 10
    },
    'the-second': {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 10
    },
  }
};

export default function() {
  if (scenario.name == "the-first") {
    // do some logic during this scenario
    console.log('the first scenario');
  } else {
    // do some other logic in other scenarios
    console.log('rest scenarios');
  }
}
```

</CodeGroup>

## \_\_VU and \_\_ITER (discouraged)

> ### ⚠️ Usage of __\_\_VU__ and __\_\_ITER__ is discouraged
> k6 v0.34.0 [k6/execution](/javascript-api/k6-execution) provides an idiomatic alternative for getting the same values as __\_\_VU__, __\_\_ITER__ and some additional information about the execution state. 


**\_\_VU** and **\_\_ITER** are both global variables with execution context information that k6 makes available to the test script.

### \_\_ITER

A numeric counter with the current iteration number for a specific VU. Zero-based.

### \_\_VU

Current VU number in use. The value is assigned incrementally for each new VU instance, starting from one. The variable will be 0 while executing the setup and teardown functions.

### Running in the k6 Cloud

When you run your tests in the [k6 Cloud](/cloud), the **\_\_VU** value you get will be per server/load generator. You can read the details in the [cloud docs](/cloud/cloud-faq/general-questions/#how-many-vus-can-be-run-from-the-same-dedicated-ip).

In k6 Cloud you will also have additional [environment variables](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli/#cloud-environment-variables) that will tell you on which server, load zone and distribution of the test you are currently executing.
