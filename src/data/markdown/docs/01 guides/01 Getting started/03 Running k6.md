---
title: 'Running k6'
excerpt: ''
---

## Running k6 the first time

This will run a very simple k6 sample script from github (click on the _Docker_ tab
if you prefer using the k6 [Docker image](https://en.wikipedia.org/wiki/Docker_%28software%29)):

<div class="code-group" data-props='{"labels": ["Mac / prebuilt binary", "Docker image"]}'>

```shell
$ k6 run github.com/loadimpact/k6/samples/http_get.js
```

```shell
$ docker run loadimpact/k6 run github.com/loadimpact/k6/samples/http_get.js
```

</div>

You should see `k6` download the sample script and run it with a single virtual user (VU).

## Executing local scripts

Next, let's try to run a local script. Copy the code below, paste it into your
favourite editor, and save it as "script.js":

<div class="code-group" data-props='{"labels": ["script.js"], "lineNumbers": [true]}'>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function() {
  http.get('http://test.k6.io');
  sleep(1);
}
```

</div>

Then run k6 using this command:

<div class="code-group" data-props='{"labels": ["Mac / prebuilt binary", "Docker", "Docker in Win PowerShell"]}'>

```shell
$ k6 run script.js
```

```shell
$ docker run -i loadimpact/k6 run - <script.js
```

```shell
$ cat script.js | docker run -i loadimpact/k6 run -
```

</div>

### Docker syntax

When using the `k6` docker image, you can't just give the script name since
the script file will not be available to the container as it runs. Instead
you must tell k6 to read `stdin` by passing the file name as `-`. Then you
pipe the actual file into the container with `<` or equivalent. This will
cause the file to be redirected into the container and be read by k6.

> ### ⚠️ Note
>
> If your script imports other files (JS modules), piping like this
> will not work since the extra files will not be visible inside the container.
> To use modules you need to first mount your host/local directory into the
> Docker container, see [Modules with Docker](/using-k6/modules#using-local-modules-with-docker).

## Adding more VUs

Now we'll try running a _real_ load test, with more than 1 virtual user and a slightly longer duration:

<div class="code-group" data-props='{"labels": ["Mac / prebuilt binary", "Docker", "Docker in Win PowerShell"]}'>

```shell
k6 run --vus 10 --duration 30s script.js
```

```shell
docker run -i loadimpact/k6 run --vus 10 --duration 30s - <script.js
```

```shell
cat script.js | docker run -i loadimpact/k6 run --vus 10 --duration 30s -
```

</div>

_Running a 30-second, 10-VU load test_

k6 works with the concept of virtual users (VUs), which run scripts - they're essentially
glorified, parallel `while(true)` loops. Scripts are written using JavaScript, as ES6 modules,
which allows you to break larger tests into smaller pieces, or make reusable pieces as you like.

Scripts must contain, at the very least, a `default` function - this defines the entry point for
your VUs, similar to the `main()` function in many other languages:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```javascript
export default function() {
  // do things here...
}
```

</div>

## The init context and the default function

"Why not just run my script normally, from top to bottom", you might ask - the answer is: we do,
but code inside and outside your default function can do different things.

Code _inside_ `default` is called "VU code", and is run over and over for as long as the test is
running. Code _outside_ of it is called "init code", and is run only once per VU.

VU code can make HTTP requests, emit metrics, and generally do everything you'd expect a load test
to do - with a few important exceptions: you can't load anything from your local filesystem, or
import any other modules. This all has to be done from init-code.

There are two reasons for this. The first is, of course: performance.

If you read a file from disk on every single script iteration, it'd be needlessly slow; even if
you cache the contents of the file and any imported modules, it'd mean the _first run_ of the
script would be much slower than all the others. Worse yet, if you have a script that imports
or loads things based on things that can only be known at runtime, you'd get slow iterations
thrown in every time you load something new.

But there's another, more interesting reason. By forcing all imports and file reads into the
init context, we design for distributed execution. We know which files will be needed, so we
distribute only those files. We know which modules will be imported, so we can bundle them up
from the get-go. And, tying into the performance point above, the other nodes don't even need
writable filesystems - everything can be kept in-memory.

As an added bonus, you can use this to reuse data between iterations (but only for the same VU):

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```javascript
var counter = 0;

export default function() {
  counter++;
}
```

</div>

## Using options

If you want to avoid having to type `--vus 10` and `--duration 30s` all the time, you can include
those settings inside your JavaScript file also:

<div class="code-group" data-props='{"labels": ["script.js"], "lineNumbers": [true]}'>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  vus: 10,
  duration: '30s',
};
export default function() {
  http.get('http://test.k6.io');
  sleep(1);
}
```

</div>

Then you just run the script without those parameters on the command line:

<div class="code-group" data-props='{"labels": ["Mac / prebuilt binary", "Docker", "Docker in Win PowerShell"]}'>

```shell
$ k6 run script.js
```

```shell
$ docker run -i loadimpact/k6 run - <script.js
```

```shell
C:\ cat script.js | docker run -i loadimpact/k6 run -
```

</div>

## Stages: ramping up/down VUs

You can also have the VU level ramp up and down during the test. The `options.stages` property
allows you to configure ramping behaviour.

<div class="code-group" data-props='{"labels": ["stages.js"], "lineNumbers": [true]}'>

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function() {
  let res = http.get('https://httpbin.org/');
  check(res, { 'status was 200': r => r.status == 200 });
  sleep(1);
}
```

</div>

## Using checks

Maybe we want to verify that an HTTP transaction worked and that the transaction time stayed below some acceptable value. We can use the [check()](/javascript-api/k6/check-val-sets-tags) function for this:

<div class="code-group" data-props='{"labels": ["stages.js"], "lineNumbers": [true]}'>

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function() {
  let res = http.get('http://test.k6.io');
  check(res, {
    'status was 200': r => r.status == 200,
    'transaction time OK': r => r.timings.duration < 200,
  });
  sleep(1);
}
```

</div>

_Using check() to verify that transactions work and are fast enough_

The above will generate a couple of extra output lines after the test, telling you if your check conditions succeeded or failed during the test. If the check conditions never failed, you will see this:

<div class="code-group" data-props='{"labels": []}'>

```shell
done [==========================================================] 30s / 30s

✓ status was 200 OK
✓ transaction time OK

```

</div>

And if a check condition fails, it will instead look like this:

<div class="code-group" data-props='{"labels": []}'>

```shell
done [==========================================================] 30s / 30s

✗ status was 200
↳  0% — ✓ 0 / ✗ 150
✓ transaction time OK
```

</div>

If you are using [k6 Cloud Insights](/cloud/analyzing-results/overview) you can also see how a given check has failed or passed during the test run:

![Cloud Insights checks](./images/cloud-insights-checks.png)
