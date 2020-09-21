---
title: 'Arrival rate'
---

> ### 🎉 New in v0.27.0
>
> This feature is new as of version 0.27.0. Usage of this feature is optional and for the vast majority,
> existing scripts and configurations will continue to work as before. For a list of breaking changes,
> see the [k6 v0.27.0 release notes](https://github.com/loadimpact/k6/releases/tag/v0.27.0)).

## Closed Model

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

## Drawbacks of using the closed model

This tight coupling between the VU iteration duration and start of new VU iterations
in effect means that the target system can influence the throughput of the test, via
its response time. Slower response times means longer iterations and a lower arrival
rate of new iterations, and vice versa for faster response times.

In other words, when the target system is being stressed and starts to respond more
slowly a closed model load test will play "nice" and wait, resulting in increased
iteration durations and a tapering off of the arrival rate of new VU iterations.

This is not ideal when the goal is to simulate a certain arrival rate of new VUs,
or more generally throughput (eg. requests per second).

## Open model

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
