---
title: 'Ramping arrival rate'
excerpt: 'A variable number of iterations are started in a specified period of time.'
---

## Description

A variable number of iterations are started in specified periods of time. This is
similar to the [ramping VUs executor](/using-k6/scenarios/executors/ramping-vus/), but for iterations instead.
k6 will attempt to dynamically change the number of VUs to achieve the configured iteration rate.

For explanations about how this executor works, refer to [Open and Closed models](/using-k6/scenarios/concepts/open-vs-closed)
and [Arrival-rate VU allocation](/using-k6/scenarios/concepts/arrival-rate-vu-allocation).

<Blockquote mod="Note" title="Iteration starts are spaced fractionally">

Iterations **do not** start at exactly the same time.
At a `rate` of `10` with a `timeUnit` of `1s`, each iteration starts about every tenth of a second (that is, each 100ms).

</Blockquote>

## Options

Besides the [common configuration options](/using-k6/scenarios#options),
this executor has the following options:

| Option             | Type    | Description                                                                             | Default |
| ------------------ | ------- | --------------------------------------------------------------------------------------- | ------- |
| stages<sup>(required)</sup>          | array   | Array of objects that specify the target number of iterations to ramp up or down to.    | `[]`    |
| preAllocatedVUs<sup>(required)</sup> | integer | Number of VUs to pre-allocate before test start to preserve runtime resources. | -       |
| startRate        | integer | Number of iterations to execute each `timeUnit` period at test start.                   | `0`     |
| timeUnit         | string  | Period of time to apply the `startRate` to the `stages`' `target` value. Its value is constant for the whole duration of the scenario, it is not possible to change it for a specific stage.                    | `"1s"`  |
| maxVUs          | integer | Maximum number of VUs to allow during the test run.                                     | If unset, same as `preAllocatedVUs`      |

## When to use

If you need your tests to not be affected by the system-under-test's performance, and
would like to ramp the number of iterations up or down during specific periods of time.

<Blockquote mod="note" title="Don't put sleep at the end of an iteration">

The arrival-rate executors already pace the iteration rate through the `rate` and `timeUnit` properties.
It's unnecessary to use a `sleep()` function at the end of the VU code.

</Blockquote>

## Example

This is an example of a four-stage test.
It initially stays at the defined rate of starting 300 iterations per minute over a one minute period.
After one minute, the iteration rate ramps to 600 iterations started per minute over the next two minutes, and stays at this rate for four more minutes.
In the last two minutes, it ramps down to a target of 60 iterations per minute.

<CodeGroup labels={[ "ramping-arr-rate.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import exec from 'k6/execution';

export const options = {
  discardResponseBodies: true,

  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',

      // Our test with at a rate of 300 iterations started per `timeUnit` (e.g minute).
      startRate: 300,

      // It should start `startRate` iterations per minute
      timeUnit: '1m',

      // It should preallocate 2 VUs before starting the test.
      preAllocatedVUs: 2,

      // It is allowed to spin up to 50 maximum VUs in order to sustain the defined
      // constant arrival rate.
      maxVUs: 50,

      stages: [
        // It should start 300 iterations per `timeUnit` for the first minute.
        { target: 300, duration: '1m' },

        // It should linearly ramp-up to starting 600 iterations per `timeUnit` over the following two minutes.
        { target: 600, duration: '2m' },

        // It should continue starting 600 iterations per `timeUnit` for the following four minutes.
        { target: 600, duration: '4m' },

        // It should linearly ramp-down to starting 60 iterations per `timeUnit` over the last two minute.
        { target: 60, duration: '2m' },
      ],
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</CodeGroup>

## Observations

The following graph depicts the performance of the [example](#example) script:

![Ramping Arrival Rate](./images/ramping-arrival-rate.png)

Based upon our test scenario inputs and results:

* We've defined 4 stages for a total test duration of 9 minutes.
* Stage 1 maintains the `startRate` iteration rate at 300 iterations started per minute for 1 minute.
* Stage 2 ramps _up_ the iteration rate linearly from the *stage 1* of 300 iterations started per minute, to the target of 600 iterations started per minute over a 2-minute duration.
* Stage 3 maintains the *stage 2* iteration rate at 600 iterations started per minute over a 4-minute duration.
* Stage 4 ramps _down_ the iteration rate linearly to the target rate of 60 iterations started per minute over the last two minutes duration.
* Changes to the iteration rate are performed by k6, adjusting the number of VUs as necessary from `preAllocatedVUs` to a maximum of `maxVUs`.
* The script waits for a period of time (defined by the `gracefulStop` option) for iterations to finish. It won't start new iterations during the `gracefulStop` period.
* The script will run the `teardown()` function (if specified) before exiting.
* Our example performed, 4020 iterations over the course of the test.

## Get the stage index

To get the current running stage index, use the `getCurrentStageIndex` helper function from the [k6-jslib-utils](/javascript-api/jslib/utils) library. It returns a zero-based number equal to the position in the shortcut `stages` array or in the executor's `stages` array.

```javascript
import { getCurrentStageIndex } from 'https://jslib.k6.io/k6-utils/1.3.0/index.js';

export const options = {
  stages: [
    { target: 10, duration: '30s' },
    { target: 50, duration: '1m' },
    { target: 10, duration: '30s' },
  ],
};

export default function () {
  if (getCurrentStageIndex() === 1) {
    console.log('Running the second stage where the expected target is 50');
  }
}
```

Using this feature, it is possible to automatically tag using the current running stage. Check the [Tagging stages](/using-k6/tags-and-groups/#tagging-stages) section for more details.
