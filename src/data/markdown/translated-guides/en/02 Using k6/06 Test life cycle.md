---
title: 'Test life cycle'
excerpt: ''
---

The four distinct life cycle stages in a k6 test are "init", "setup", "VU" and "teardown"
Throughout the documentation, you will also see us referring to it as "init code", "VU code" etc.

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

## Init and VU stages

Scripts must contain, at the very least, a `default` function - this defines the entry point
for your VUs, similar to the `main()` function in many other languages:

<CodeGroup labels={["Default/Main function"]} lineNumbers={[true]}>

```javascript
export default function () {
  // do things here...
}
```

</CodeGroup>

_"Why not just run my script normally, from top to bottom"_, you might ask - the answer is: we
do, but code **inside** and **outside** your `default` function can do different things.

Code inside `default` is called "VU code", and is run over and over for as long as the test is
running. Code outside of it is called "init code", and is run only once per VU.

VU code can make HTTP requests, emit metrics, and generally do everything you'd expect a load
test to do - with a few important exceptions: you can't load anything from your local filesystem,
or import any other modules. This all has to be done from the init code.

We have two reasons for this. The first is, of course: performance.

If you read a file from disk on every single script iteration, it'd be needlessly slow; even
if you cache the contents of the file and any imported modules, it'd mean the _first run_ of the
script would be much slower than all the others. Worse yet, if you have a script that imports
or loads things based on things that can only be known at runtime, you'd get slow iterations
thrown in every time you load something new.

But there's another, more interesting reason. By forcing all imports and file reads into the
init context, we make an important design goal possible; we want to support three different
execution modes without the need for you to modify your scripts; local, cloud and clustered
execution. In the case of cloud and clustered execution we know which files will be needed, so
we distribute only those files. We know which modules will be imported, so we can bundle them
up from the get-go. And, tying into the performance point above, the other nodes don't even
need writable filesystems - everything can be kept in-memory.

As an added bonus, you can use this to reuse data between iterations (but only for the same VU):

<CodeGroup labels={[]}>

```javascript
var counter = 0;

export default function () {
  counter++;
}
```

</CodeGroup>

## The default function life-cycle

A VU will execute the default function from start to end in sequence. Nothing out of the ordinary
so far, but here's the important part; once the VU reaches the end of the default function it will
loop back to the start and execute the code all over.

As part of this "restart" process, the VU is reset. Cookies are cleared and TCP connections
might be torn down, depending on your test configuration options.

> Make sure to use `sleep()` statements to pace your VUs properly. An appropriate amount of
> sleep/think time at the end of the default function is often needed to properly simulate a
> user reading content on a page. If you don't have a `sleep()` statement at the end of
> the default function your VU might be more "aggressive" than you've planned.
>
> VU without any `sleep()` is akin to a user who constantly presses F5 to refresh the page.

## Setup and teardown stages

Beyond the required init and VU stages, which is code run for each VU, k6 also supports test-wide
setup and teardown stages, like many other testing frameworks and tools. The `setup` and
`teardown` functions, like the `default` function, needs to be exported functions. But unlike
the `default` function `setup` and `teardown` are only called once for a test. `setup` is called
at the beginning of the test, after the init stage but before the VU stage (`default` function),
and `teardown` is called at the end of a test, after the VU stage (`default` function). Therefore,
VU number is 0 while executing the `setup` and `teardown` functions.

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

You might have noticed the function signature of the `default` function and `teardown` function
takes an argument, which we here refer to as `data`.

This `data` will be whatever is returned in the `setup` function, so a mechanism for passing data
from the setup stage to the subsequent VU and teardown stages in a way that, again, is compatible
with our goal of supporting local, cloud and clustered execution modes without requiring script
changes when switching between them. (it might or might not be the same node that runs the setup
and teardown stages in the cloud or clustered execution mode).

To support all of those modes, only data (i.e. JSON) can be passed between `setup()` and the
other stages, any passed functions will be stripped.

Here's an example of doing just that, passing some data from setup to VU and teardown stages:

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

A big difference between the init stage and setup/teardown stages is that you have the full k6
API available in the latter, you can for example make HTTP requests in the setup and teardown
stages:

<CodeGroup labels={["Setup/Teardown with HTTP request"]} lineNumbers={[true]}>

```javascript
export function setup() {
  let res = http.get('https://httpbin.org/get');
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

Note that any requests made in the setup and teardown stages will be counted in the end-of-test
summary. Those requests will be tagged appropriately with the `::setup` and `::teardown` values
for the `group` metric tag, so that you can filter them in JSON output or InfluxDB.

## Skip setup and teardown execution

It is possible to skip the execution of setup and teardown stages using the two options `--no-setup` and
`--no-teardown` respectively.

<CodeGroup labels={["Skipping setup/teardown execution"]} lineNumbers={[true]}>

```bash
$ k6 run --no-setup --no-teardown ...
```

</CodeGroup>
