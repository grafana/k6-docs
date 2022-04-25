---
title: 'Running k6'
excerpt: 'Follow along to learn how to run a test, add virtual users, increase the test duration, and ramp the number of requests up and down as the test runs.'
---

Follow along to learn how to:
1. Run a test.
2. Add virtual users.
3. Increase the test duration. 
4. Ramp the number of requests up and down as the test runs.

With these example snippets, you'll run the test with your machine's resources.
But, if you have a cloud account, you can also use the `k6 cloud` command to outsource the test to our cloud servers. 

## Running local tests

Let's start by running a simple local script.
Copy the code below, paste it into your favorite editor, and save it as `script.js`:

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

Then, run k6 with this command:

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

Now let's run a load test with more than one virtual user and a longer duration:

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

k6 works with the concept of _virtual users_ (VUs), which run your test scripts.
VUs are essentially parallel `while(true)` loops.
Scripts are written in JavaScript, as ES6 modules,
which allows you to break larger tests into smaller pieces or make reusable pieces as you like.


### The init context and the default function

For a test to run, you need to have *init code*, which prepares the test, and *VU code,* which makes requests.

Code in the init context defines functions and configures the test options (like `duration`).

Every test also has a `default` function.
This function defines the entry point for your VUs.

<CodeGroup labels={[]}>

```javascript
export default function () {
  // vu code: do things here...
}
```

</CodeGroup>

Init code runs first and is called only once per VU.
On the other hand, default code executes as many times as the test options set.

Read more about the different [life cycle stages of a k6 test](/using-k6/test-life-cycle).

## Using options

Instead of typing `--vus 10` and `--duration 30s` each time you run the script,
you can include the options in your JavaScript file:

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

Then, run the script without those options on the command line:

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

You can ramp the number of VUs up and down during the test.
To configure ramping, use the `options.stages` property.


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
  const res = http.get('https://httpbin.test.k6.io/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
```

</CodeGroup>

For advanced ramping, you can use [scenarios](/using-k6/scenarios) and the `ramping-vus` executor.

## Running cloud tests

k6 supports three test-execution modes:

- [Local](#running-local-tests): on your local machine or a CI server.
- [Cloud](/cloud): on cloud infrastructure managed by k6 Cloud.
- Clustered: on more than one machine managed by you. [Not supported yet](https://github.com/grafana/k6/issues/140).

k6 has a goal of letting you run a test in all three execution modes without modifying the script.

To run cloud tests from the CLI:
1. Register a k6 Cloud account.
2. Log in to your account via the CLI.
3. Use the `k6 cloud` command to run the script you already have.

<CodeGroup labels={["Running a cloud test"]}>

```bash
$ k6 cloud script.js
```

</CodeGroup>

