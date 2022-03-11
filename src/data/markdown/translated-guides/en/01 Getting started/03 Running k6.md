---
title: 'Running k6'
excerpt: 'Start running a simple local test. Check out the basic load options or execution modes.'
---

## Running local tests

Let's start by running a simple local script. Copy the code below, paste it into your
favourite editor, and save it as "script.js":

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
```

</CodeGroup>

Then run k6 using this command:

<CodeGroup labels={["CLI", "Docker", "Docker in Win PowerShell"]}>

```bash
$ k6 run script.js
```

```bash
# When using the `k6` docker image, you can't just give the script name since
# the script file will not be available to the container as it runs. Instead
# you must tell k6 to read `stdin` by passing the file name as `-`. Then you
# pipe the actual file into the container with `<` or equivalent. This will
# cause the file to be redirected into the container and be read by k6.

$ docker run --rm -i grafana/k6 run - <script.js
```

```bash
PS C:\> cat script.js | docker run --rm -i grafana/k6 run -
```

</CodeGroup>

## Adding more VUs

Now we'll try running a load test with more than 1 virtual user and a slightly longer duration:

<CodeGroup labels={["CLI", "Docker", "Docker in Win PowerShell"]}>

```bash
$ k6 run --vus 10 --duration 30s script.js
```

```bash
$ docker run --rm -i grafana/k6 run --vus 10 --duration 30s - <script.js
```

```bash
PS C:\> cat script.js | docker run --rm -i grafana/k6 run --vus 10 --duration 30s -
```

</CodeGroup>

_Running a 30-second, 10-VU load test_

k6 works with the concept of virtual users (VUs), which run scripts - they're essentially
glorified, parallel `while(true)` loops. Scripts are written using JavaScript, as ES6 modules,
which allows you to break larger tests into smaller pieces, or make reusable pieces as you like.

Scripts must contain, at the very least, a `default` function - this defines the entry point for
your VUs, similar to the `main()` function in many other languages:

<CodeGroup labels={[]}>

```javascript
export default function () {
  // vu code: do things here...
}
```

</CodeGroup>

### The init context and the default function

"Why not just run my script normally, from top to bottom", you might ask - the answer is: we do,
but code inside and outside your default function can do different things.

Code _inside_ `default` is called "VU code", and is run over and over for as long as the test is
running. Code _outside_ of it is called "init code", and is run only once per VU.

<CodeGroup labels={[""]}>

```javascript
// init code

export default function () {
  // vu code
}
```

</CodeGroup>

VU code can make HTTP requests, emit metrics, and generally do everything you'd expect a load test
to do - with a few important exceptions: you can't load anything from your local filesystem, or
import any other modules. This all has to be done from init-code.

Read more about the different [life cycle stages of a k6 test](/using-k6/test-life-cycle).

## Using options

If you want to avoid having to type `--vus 10` and `--duration 30s` all the time, you can include
those settings inside your JavaScript file also:

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 10,
  duration: '30s',
};
export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}
```

</CodeGroup>

Then you just run the script without those parameters on the command line:

<CodeGroup labels={["CLI", "Docker", "Docker in Win PowerShell"]}>

```bash
$ k6 run script.js
```

```bash
$ docker run --rm -i grafana/k6 run - <script.js
```

```bash
PS C:\> cat script.js | docker run --rm -i grafana/k6 run -
```

</CodeGroup>

## Stages: ramping up/down VUs

You can also have the VU level ramp up and down during the test. The `options.stages` property
allows you to configure ramping behaviour.

<CodeGroup labels={["stages.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const res = http.get('https://httpbin.org/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```

</CodeGroup>

This can also be accomplished with more advanced configuration using
[scenarios](/using-k6/scenarios) and the `ramping-vus` executor.

## Running cloud tests

k6 supports three execution modes to run your k6 tests:

- [Local](#running-local-tests): on your local machine or a CI server.
- [Cloud](/cloud): on cloud infrastructure managed by k6 Cloud.
- Clustered: on more than one machine managed by you. [Not supported yet](https://github.com/grafana/k6/issues/140).

One of the goals with k6 is to support running a test in the three execution modes without making modifications to the script.

For running cloud tests from the CLI, you must first register a k6 Cloud account and then log into your account via the CLI. Then, you only have to pass your existing script to the `k6 cloud` command.

<CodeGroup labels={["Running a cloud test"]}>

```bash
$ k6 cloud script.js
```

</CodeGroup>

For detailed instructions and the different options, read more on [running cloud tests from the CLI](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli).
