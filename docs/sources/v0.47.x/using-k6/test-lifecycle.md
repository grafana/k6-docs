---
title: 'Test lifecycle'
description: 'The four distinct lifecycle stages in a k6 test are "init", "setup", "VU", and "teardown".'
weight: 06
---

# Test lifecycle

In the lifecycle of a k6 test,
a script always runs through these stages in the same order:

1. Code in the `init` context prepares the script, loading files, importing modules, and defining the test _lifecycle functions_. **Required**.
2. The `setup` function runs, setting up the test environment and generating data. _Optional._
3. VU code runs in the `default` or scenario function, running for as long and as many times as the `options` define. **Required**.
4. The `teardown` function runs, postprocessing data and closing the test environment. _Optional._

{{% admonition type="note" %}}

**Lifecycle functions**

Except for init code, each stage occurs in a _lifecycle function_,
a function called in a specific sequence in the k6 runtime.

{{% /admonition %}}

{{< code >}}

```javascript
// 1. init code

export function setup() {
  // 2. setup code
}

export default function (data) {
  // 3. VU code
}

export function teardown(data) {
  // 4. teardown code
}
```

{{< /code >}}

## Overview of the lifecycle stages

For examples and implementation details of each stage, refer to the subsequent sections.

| Test stage      | Purpose                                                       | Example                                                                                 | Called                                                        |
| --------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **1. init**     | Load local files, import modules, declare lifecycle functions | Open JSON file, Import module                                                           | Once per VU\*                                                 |
| **2. Setup**    | Set up data for processing, share data among VUs              | Call API to start test environment                                                      | Once                                                          |
| **3. VU code**  | Run the test function, usually `default`                      | Make https requests, validate responses                                                 | Once per iteration, as many times as the test options require |
| **4. Teardown** | Process result of setup code, stop test environment           | Validate that setup had a certain result, send webhook notifying that test has finished | Once \*\*                                                     |

\* In cloud scripts, init code might be called more often.

\*\* If the `Setup` function ends abnormally (e.g throws an error), the `teardown()` function isn't called. Consider adding logic to the `setup()` function to handle errors and ensure proper cleanup.

## The init stage

**The init stage is required**.
Before the test runs, k6 needs to initialize the test conditions.
To prepare the test, code in the `init` context runs once per VU.

Some operations that might happen in `init` include the following:

- Import modules
- Load files from the local file system
- Configure the test for all `options`
- Define lifecycle functions for the VU, `setup`, and `teardown` stages (and for custom or `handleSummary()` functions, too).

**All code that is outside of a lifecycle function is code in the `init` context**.
Code in the `init` context _always executes first_.

{{< code >}}

```javascript
// init context: importing modules
import http from 'k6/http';
import { Trend } from 'k6/metrics';

// init context: define k6 options
export const options = {
  vus: 10,
  duration: '30s',
};

// init context: global variables
const customTrend = new Trend('oneCustomMetric');

// init context: define custom function
function myCustomFunction() {
  // ...
}
```

{{< /code >}}

Separating the `init` stage from the VU stage removes irrelevant computation from VU code, which improves k6 performance and makes test results more reliable.
One limitation of `init` code is that it **cannot** make HTTP requests.
This limitation ensures that the `init` stage is reproducible across tests (the response from protocol requests is dynamic and unpredictable)

## The VU stage

Scripts must contain, at least, a _scenario function_ that defines the logic of the VUs.
The code inside this function is _VU code_.
Typically, VU code is inside the `default` function, but it can also be inside the function defined by a scenario (see subsequent section for an example).

{{< code >}}

```javascript
export default function () {
  // do things here...
}
```

{{< /code >}}

**VU code runs over and over through the test duration.**
VU code can make HTTP requests, emit metrics, and generally do everything you'd expect a load test to do.
The only exceptions are the jobs that happen in the `init` context.

- VU code _does not_ load files from your local filesystem.
- VU code _does not_ import any other modules.

Again, instead of VU code, init code does these jobs.

### The default function life-cycle

A VU executes the `default()` function from start to end in sequence.
Once the VU reaches the end of the function, it loops back to the start and executes the code all over.

As part of this "restart" process, k6 resets the VU.
Cookies are cleared, and TCP connections might be torn down (depending on your test configuration options).

## Setup and teardown stages

Like `default`, `setup` and `teardown` functions must be exported functions.
But unlike the `default` function, k6 calls `setup` and `teardown` only once per test.

- `setup` is called at the beginning of the test, after the init stage but before the VU stage.
- `teardown` is called at the end of a test, after the VU stage (`default` function).

You can call the full k6 API in the setup and teardown stages, unlike the init stage.
For example, you can make HTTP requests:

{{< code >}}

```javascript
import http from 'k6/http';

export function setup() {
  const res = http.get('https://httpbin.test.k6.io/get');
  return { data: res.json() };
}

export function teardown(data) {
  console.log(JSON.stringify(data));
}

export default function (data) {
  console.log(JSON.stringify(data));
}
```

{{< /code >}}

### Skip setup and teardown execution

You can skip the execution of setup and teardown stages using the options `--no-setup` and
`--no-teardown`.

{{< code >}}

```bash
$ k6 run --no-setup --no-teardown ...
```

{{< /code >}}

### Use data from setup in default and teardown

Again, let's have a look at the basic structure of a k6 test:

{{< code >}}

```javascript
// 1. init code

export function setup() {
  // 2. setup code
}

export default function (data) {
  // 3. VU code
}

export function teardown(data) {
  // 4. teardown code
}
```

{{< /code >}}

You might have noticed the function signatures of the `default()` and `teardown()` functions take an argument, referred to here as `data`.

Here's an example of passing some data from the setup code to the VU and teardown stages:

{{< code >}}

```javascript
export function setup() {
  return { v: 1 };
}

export default function (data) {
  console.log(JSON.stringify(data));
}

export function teardown(data) {
  if (data.v != 1) {
    throw new Error('incorrect data: ' + JSON.stringify(data));
  }
}
```

{{< /code >}}

For example, with the data returned by the `setup()` function, you can:

- Give each VU access to an identical copy of the data
- Postprocess the data in `teardown` code

However, there are some restrictions.

- You can pass only data (i.e. JSON) between `setup` and the other stages.
  You cannot pass functions.
- If the data returned by the `setup()` function is large, it will consume more memory.
- You cannot manipulate data in the `default()` function, then pass it to the `teardown()` function.

It's best to think that each stage and each VU has access to a fresh "copy" of whatever data the `setup()` function returns.

![Diagram showing data getting returned by setup, then used (separately) by default and teardown functions](/media/docs/k6-oss/lifecycle.png)

It would be extremely complicated and computationally intensive to pass mutable data between all VUs and then to teardown, especially in distributed setups.
This would go against a core k6 goal: the same script should be executable in multiple modes.

## Additional lifecycle functions

k6 has a few additional ways to use lifecycle functions:

- **`handleSummary()`**. If you want to make a custom summary, k6 calls one more lifecycle function at the very end of the test.

  For details, refer to [Custom summary](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test/custom-summary).

- **Scenario functions**. Instead of the `default` function, you can also run VU code in scenario functions.

  {{< code >}}

  ```javascript
  import http from 'k6/http';
  import { sleep } from 'k6';

  export const options = {
    scenarios: {
      my_web_test: {
        // the function this scenario will execute
        exec: 'webtest',
        executor: 'constant-vus',
        vus: 50,
        duration: '1m',
      },
    },
  };

  export function webtest() {
    http.get('https://test.k6.io/contacts.php');
    sleep(Math.random() * 2);
  }
  ```

  {{< /code >}}
