---
title: Scenarios
excerpt: ''
hideFromSidebar: false
---

> ### 🎉 New in v0.27.0
>
> This feature is new as of version 0.27.0. Usage of this feature is optional and for the vast majority,
> existing scripts and configurations will continue to work as before. For a list of breaking changes,
> see the [k6 v0.27.0 release notes](https://github.com/loadimpact/k6/releases/tag/v0.27.0)).

Scenarios allow us to make in-depth configurations to how VUs and iterations are scheduled, allowing
us to model diverse traffic patterns in our load tests. There are several benefits of using scenarios in your tests:

- Multiple scenarios can be declared in the same script, and each one can
  independently execute a different JavaScript function, which makes organizing tests easier
  and more flexible.
- Every scenario can use a distinct VU and iteration scheduling pattern,
  powered by a purpose-built [executor](#executors). This enables modeling
  of advanced execution patterns which can better simulate real-world traffic.
- They can be configured to run in sequence or parallel, or in any mix of the two.
- Different environment variables and metric tags can be set per scenario.

## Configuration

Execution scenarios are primarily configured via the `scenarios` key of the the exported `options` object
in your test scripts. For example:

<div class="code-group" data-props='{"labels": [], "lineNumbers": "[false]"}'>

```js
export let options = {
  scenarios: {
    my_cool_scenario: {  // arbitrary and unique scenario name, will appear in the result summary, tags, etc.
      executor: 'shared-iterations',  // name of the executor to use
      // common scenario configuration
      startTime: '10s',
      gracefulStop: '5s',
      env: { EXAMPLEVAR: 'testing' },
      tags: { example_tag: 'testing' },
      // executor-specific configuration
      vus: 10,
      iterations: 200,
      maxDuration: '10s',
    },
    another_scenario: { ... }
  }
}
```

</div>

### Common configuration

| Option         | Type   | Description                                                                                                                                    | Default     |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `executor`     | string | Unique executor name. See the list of possible values in the [executors](#executors) section.                                                  | -           |
| `startTime`    | string | Time offset since the start of the test, at which point this scenario should begin execution.                                                  | `"0s"`      |
| `gracefulStop` | string | Time to wait for iterations to finish executing before stopping them forcefully. See the [gracefulStop](#graceful-stop-and-ramp-down) section. | `"30s"`     |
| `exec`         | string | Name of exported JS function to execute.                                                                                                       | `"default"` |
| `env`          | object | Environment variables specific to this scenario.                                                                                               | `{}`        |
| `tags`         | object | [Tags](/using-k6/tags-and-groups) specific to this scenario.                                                                                   | `{}`        |

## Executors

[Executors](/using-k6/scenarios/executors) are the workhorses of the k6 execution engine.
Each one schedules VUs and iterations differently, and you'll choose one depending on the type
of traffic you want to model to test your services.

Possible values for `executor` are the executor name separated by hyphens:

- [`shared-iterations`](/using-k6/scenarios/executors/shared-iterations)
- [`per-vu-iterations`](/using-k6/scenarios/executors/per-vu-iterations)
- [`constant-vus`](/using-k6/scenarios/executors/constant-vus)
- [`ramping-vus`](/using-k6/scenarios/executors/ramping-vus)
- [`constant-arrival-rate`](/using-k6/scenarios/executors/constant-arrival-rate)
- [`ramping-arrival-rate`](/using-k6/scenarios/executors/ramping-arrival-rate)
- [`externally-controlled`](/using-k6/scenarios/executors/externally-controlled)

## Arrival rate

Prior to v0.27.0, k6 only supported a closed model for the simulation of new VU arrivals.
In this closed model, a new VU iteration only starts when a VU's previous iteration has
completed its execution. Thus, in a closed model, the start rate, or arrival rate, of
new VU iterations is tightly coupled with the iteration duration (that is, time from start
to finish of the VU's `exec` function, by default the `export default function`):

<div class="code-group" data-props='{"labels": [ "closed-model.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  scenarios: {
    closed_model: {
      executor: 'constant-vus',
      vus: 1,
      duration: '1m',
    },
  },
};

export default function () {
  // The following request will take roughly 6s to complete,
  // resulting in an iteration duration of 6s.

  // As a result, New VU iterations will start at a rate of 1 per 6s,
  // and we can expect to get 10 iterations completed in total for the
  // full 1m test duration.

  http.get('http://httpbin.test.k6.io/delay/6');
}
```

</div>

Running this script would result in something like:

```bash

running (1m01.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
closed_model ✓ [======================================] 1 VUs  1m0s

```

This tight coupling between the VU iteration duration and start of new VU iterations
in effect means that the target system can influence the throughput of the test, via
its response time. Slower response times means longer iterations and a lower arrival
rate of new iterations, and vice versa for faster response times.

In other words, when the target system is being stressed and starts to respond more
slowly a closed model load test will play "nice" and wait, resulting in increased
iteration durations and a tapering off of the arrival rate of new VU iterations.

This is not ideal when the goal is to simulate a certain arrival rate of new VUs,
or more generally throughput (eg. requests per second).

To fix this problem we use an open model, decoupling the start of new VU iterations
from the iteration duration and the influence of the target system's response time.

![Arrival rate closed/open models](images/Scenarios/arrival-rate-open-closed-model.png)

In k6 we've implemented this open model with our "arrival rate" executors. There are
two arrival rate executors to chose from for your scenario(s),
[constant-arrival-rate](#constant-arrival-rate) and [ramping-arrival-rate](#ramping-arrival-rate):

<div class="code-group" data-props='{"labels": [ "open-model.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  scenarios: {
    open_model: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
  },
};

export default function () {
  // With the open model arrival rate executor config above,
  // new VU iteration will start at a rate of 1 every second,
  // and we can thus expect to get 60 iterations completed
  // for the full 1m test duration.
  http.get('http://httpbin.test.k6.io/delay/10');
}
```

</div>

Running this script would result in something like:

```bash
running (1m09.3s), 000/011 VUs, 60 complete and 0 interrupted iterations
open_model ✓ [======================================] 011/011 VUs  1m0s  1 iters/s
```

Compared with the first example of the closed model, in this open model example we
can see that the VU iteration arrival rate is now decoupled from the iteration duration.
The response times of the target system are no longer influencing the load being
put on the target system.

## Graceful stop and ramp down

In versions before v0.27.0, k6 would interrupt any iterations being executed if the
test is done or when ramping down VUs when using the `stages` option. This behavior
could cause skewed metrics and wasn't user configurable.

In v0.27.0, a new option is introduced for all executors (except externally-controlled):
`gracefulStop`. With a default value of `30s`, it specifies the time k6 should wait
for iterations to complete before forcefully interrupting them.

A similar option exists for the [ramping-vus](#ramping-vus) executor: `gracefulRampDown`. This
specifies the time k6 should wait for any iterations in progress to finish before
VUs are returned to the global pool during a ramp down period defined in `stages`.

### Example

<div class="code-group" data-props='{"labels": [ "graceful-stop.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 100 },
        { duration: '5s', target: 0 },
      ],
      gracefulRampDown: '3s',
      gracefulStop: '3s',
    },
  },
};

export default function () {
  let delay = Math.floor(Math.random() * 5) + 1;
  http.get(`https://httpbin.test.k6.io/delay/${delay}`);
}
```

</div>

Running this script would result in something like:

```bash
running (13.0s), 000/100 VUs, 177 complete and 27 interrupted iterations
contacts ✓ [======================================] 001/100 VUs  10s
```

Notice that even though the total test duration is 10s, the actual run time was 13s
because of `gracefulStop`, and some iterations were interrupted since they exceeded
the configured 3s of both `gracefulStop` and `gracefulRampDown`.
