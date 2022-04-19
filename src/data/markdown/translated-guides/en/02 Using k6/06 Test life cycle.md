---
title: 'Test life cycle'
excerpt: 'The four distinct life cycle stages in a k6 test are "init", "setup", "VU", and "teardown".'
---

A k6 test has four distinct stages, which always run in the same order:

1. *Init code* initializes VUs
2. *Setup code* sets up data and the test environment
3. *VU code* runs the test
4. *Teardown code* cleans up data and stops the test environment


<CodeGroup labels={["The four life cycle stages"]} lineNumbers={[true]}>

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

</CodeGroup>

## A quick overview of test stages

This table provides the essential information about each stage.
The rest of this page goes into deeper technical detail.

| Test stage      | Used to                                                    | Example                                                                                 | Called                                                                             | Required? |
|-----------------|------------------------------------------------------------|-----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|-----------|
| **1. init**     | Load local files, import modules, declare global variables | Open JSON file, Import module                                                           | Once per VU\*                                                                      | Optional  |
| **2. Setup**    | Set up data for processing, share data among VUs           | Call API to start test environment                                                      | Once                                                                               | Optional  |
| **3. VU code**  | Run the test function, usually the `default` one                                        | Make https requests, validate responses                                                 | Once per iteration, as many times  as the test options required | Required       |
| **4. Teardown** | Process result of setup code, stop test environment        | Validate that setup had a certain result, send webhook notifying that test has finished | Once per script                                                                    | Optional        |

\* In cloud scripts, init code might be called more often.



## Init and VU stages

Scripts must contain, at the very least, a `default` function.
The `default` function defines the entry point for your VUs, similar to the `main()` function in other languages:

<CodeGroup labels={["Default/Main function"]} lineNumbers={[true]}>

```javascript
export default function () {
  // do things here...
}
```

</CodeGroup>

Why not just run my script normally, from top to bottom?

This is a good question, and the answer is: we do.
But code *inside* and *outside* your `default` function do different things.

Code inside `default` is called *VU code*.
VU code runs over and over through the test duration.
Besides setup and teardown, code outside of `default` is  *init code*.
It runs only once per VU.

VU code can make HTTP requests, emit metrics, and generally do everything you'd expect a load test to do.
There are a few important exceptions. VU code:
* *Does not* load files from your local filesystem,
* *Does not* import any other modules. 

Instead of VU code, init code does these jobs.

## Benefits of separating init and VU code

 There are two chief reasons we separate these code stages:

* Performance is faster and more accurate.
* The design is more flexible and modular.

On the performance side, if you read a file from disk every iteration, the script would be needlessly slow.
Even if you cached the contents of the file and imported modules, the _first iteration_ of the script would be much slower than all subsequent iterations.
Worse, if your script imports or loads data dynamically, you'd get slow iterations each time you loaded something new.

Besides improving performance, these stages let you execute in different modes without modifying your scripts.
You should be able to run a k6 script in local, cloud, and clustered systems.
In the case of cloud and clustered execution, we know which files are needed, so we distribute only those files.
We know which modules to import, so we can bundle them from the get-go.
And, tying into the performance benefits, the other nodes don't even need writable filesystems&mdash;everything can be kept in-memory.

As a bonus, you can reuse data between iterations (but only for the same VU):

<CodeGroup labels={[]}>

```javascript
let counter = 0;

export default function () {
  counter++;
}
```

</CodeGroup>

## The default function life-cycle

A VU executes the default function from start to end in sequence.
Once the VU reaches the end of the default function, it loops back to the start and executes the code all over.

As part of this "restart" process, k6 resets the VU.
Cookies are cleared and TCP connections
might be torn down  (depending on your test configuration options).

> Make sure to use `sleep()` statements to pace your VUs properly, simulating a user reading content on your page.
> If you don't have a `sleep()` statement at the end of the default function, your VU might be more "aggressive" than you've planned.
>
> VU without any `sleep()` is akin to a user who constantly presses F5 to refresh the page.

## Setup and teardown stages

Like `default`, `setup` and `teardown` functions must be exported functions.
But unlike the `default` function, k6 calls `setup` and `teardown` only once per test. 

* `setup` is called at the beginning of the test, after the init stage but before the VU stage.
* `teardown` is called at the end of a test, after the VU stage (`default` function).

The VU number is 0 while the `setup` and `teardown` functions execute.

Again, let's have a look at the basic structure of a k6 test:

<CodeGroup labels={["Setup/Teardown"]} lineNumbers={[true]}>

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

</CodeGroup>

You might have noticed the function signatures of the `default` and `teardown` functions
take an argument, referred to here as `data`.

This `data` is whatever the `setup` function returns.
Having a mechanism for passing data from the setup stage to the subsequent VU and teardown stages is compatible with our goal of supporting local, cloud, and clustered execution modes without requiring script changes when switching between them.
In cloud and clustered modes, the node that runs the setup code might not be the node that runs the teardown code.

To support these modes, you can pass only data (i.e. JSON) between `setup()` and the
other stages.
You cannot pass functions.

Here's an example of passing some data from setup to VU and teardown stages:

<CodeGroup labels={["Setup/Teardown"]} lineNumbers={[true]}>

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

</CodeGroup>

You can call the full k6 API in the setup and teardown stages, unlike the init stage.
For example, you can for make HTTP requests:

<CodeGroup labels={["Setup/Teardown with HTTP request"]} lineNumbers={[true]}>

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

</CodeGroup>

Note that the [the end-of-test summary](/results-visualization/end-of-test-summary/#summary-export-to-a-json-file) includes requests made in the setup and teardown stages.
These requests are tagged appropriately with the `::setup` and `::teardown` values
for the `group` metric tag, so that you can filter them in JSON output or InfluxDB.

## Skip setup and teardown execution

You can skip the execution of setup and teardown stages using the options `--no-setup` and
`--no-teardown`.

<CodeGroup labels={["Skipping setup/teardown execution"]} lineNumbers={[true]}>

```bash
$ k6 run --no-setup --no-teardown ...
```

</CodeGroup>
