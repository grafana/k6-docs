---
title: 'Arrival rate'
excerpt: 'In k6, we have implemented this open model with our two arrival rate executors: constant-arrival-rate and ramping-arrival-rate.'
---

## Closed Model

> In a closed model, the execution time of each iteration dictates the actual
> number of iterations executed in your test, as the next iteration won't be started
> until the previous one is completed.

Prior to v0.27.0, k6 only supported a closed model for the simulation of new VU arrivals.
In this closed model, a new VU iteration only starts when a VU's previous iteration has
completed its execution. Thus, in a closed model, the start rate, or arrival rate, of
new VU iterations is tightly coupled with the iteration duration (that is, time from start
to finish of the VU's `exec` function, by default the `export default function`):

<CodeGroup labels={[ "closed-model.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
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

</CodeGroup>

Running this script would result in something like:

```bash

running (1m01.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
closed_model ✓ [======================================] 1 VUs  1m0s

```

## Drawbacks of using the closed model

The closed model can suffer from a problem of _coordinated omission_, in which the system under test inadvertently coordinates with the load generator.

In short, the closed model couples iteration duration with iteration start, which means that the response time of the target system can influence the throughput of the test.
If a VU iteration starts only when a previous iteration ends,
then the iteration duration affects when the next iteration starts.
Slower response times mean longer iterations and a lower arrival
rate of new iterations, and vice versa for faster response times.

In other words, when the target system is stressed and starts to respond more
slowly, a closed-model load test will "wait" for the duration to end, resulting in increased
iteration durations and a tapering of the arrival rate of new VU iterations.

This is not ideal when the goal is to simulate a certain arrival rate of new VUs,
or more generally throughput (e.g. requests per second).

## Open model

> Compared to the closed model, the open model decouples VU iterations from
> the actual iteration duration. The response times of the target system are no longer
> influencing the load being put on the target system.

To fix this problem we use an open model, decoupling the start of new VU iterations
from the iteration duration and the influence of the target system's response time.

![Arrival rate closed/open models](../images/Scenarios/arrival-rate-open-closed-model.png)

In k6, we've implemented this open model with our two "arrival rate" executors:
[constant-arrival-rate](/using-k6/scenarios/executors/constant-arrival-rate) and [ramping-arrival-rate](/using-k6/scenarios/executors/ramping-arrival-rate):

<CodeGroup labels={[ "open-model.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  scenarios: {
    open_model: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 20,
    },
  },
};

export default function () {
  // With the open model arrival rate executor config above,
  // new VU iterations will start at a rate of 1 every second,
  // and we can thus expect to get 60 iterations completed
  // for the full 1m test duration.
  http.get('http://httpbin.test.k6.io/delay/6');
}
```

</CodeGroup>

Running this script would result in something like:

```bash
running (1m09.3s), 000/011 VUs, 60 complete and 0 interrupted iterations
open_model ✓ [======================================] 011/011 VUs  1m0s  1 iters/s
```

## Read more

<!-- vale off -->

- [Open Versus Closed: A Cautionary Tale](https://www.usenix.org/legacy/event/nsdi06/tech/full_papers/schroeder/schroeder.pdf). A research paper by Bianca Schroeder et. al (2006).
- [How NOT to measure latency](https://www.youtube.com/watch?v=6Rs0p3mPNr0). A talk by Gil Tene, who coined the phrase "coordinated omission" (2014).

<-- vale on -->

