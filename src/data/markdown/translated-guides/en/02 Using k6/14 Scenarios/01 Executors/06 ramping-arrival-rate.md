---
title: 'Ramping arrival rate'
excerpt: 'A variable number of iterations are executed in a specified period of time.'
---

## Description

A variable number of iterations are executed in a specified period of time. This is
similar to the ramping VUs executor, but for iterations instead, and k6 will attempt
to dynamically change the number of VUs to achieve the configured iteration rate.

See the [arrival rate](/using-k6/scenarios/arrival-rate) section for details.

## Options

In addition to the [common configuration options](/using-k6/scenarios#common-options) this executor
also adds the following options:

| Option             | Type    | Description                                                                             | Default |
| ------------------ | ------- | --------------------------------------------------------------------------------------- | ------- |
| stages<sup>(required)</sup>          | array   | Array of objects that specify the target number of iterations to ramp up or down to.    | `[]`    |
| preAllocatedVUs<sup>(required)</sup> | integer | Number of VUs to pre-allocate before test start in order to preserve runtime resources. | -       |
| startRate        | integer | Number of iterations to execute each `timeUnit` period at test start.                   | `0`     |
| timeUnit         | string  | Period of time to apply the `startRate` the `stages` `target` value.                    | `"1s"`  |
| maxVUs          | integer | Maximum number of VUs to allow during the test run.                                     | -       |

## When to use

If you need your tests to not be affected by the system-under-test's performance, and
would like to ramp the number of iterations up or down during specific periods of time.

## Examples

In this example, we'll run a two-stage test, ramping up the iteration rate from 10 to 70 iterations per second over a 20 second period, then down to 30 iterations per second over a 10 second period.

<CodeGroup labels={[ "ramping-arr-rate.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 10,
      timeUnit: '1s',
      preAllocatedVUs: 2,
      maxVUs: 50,
      stages: [
        { target: 70, duration: '20s' },
        { target: 30, duration: '10s' },
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

* We've defined 2 stages for a total test duration of 30 seconds;
* stage 1 ramps _up_ the iteration rate linearly from the `startRate` of 10 iters/s, to the target of 70 iters/s over a 20 second duration;
* from the 70 iters/s at the end of stage 1, stage 2 then ramps _down_ the iteration rate linearly to the target rate of 30 iters/s over a 10 second duration;
* changes to the iteration rate are performed by k6 adjusting the number of VUs as necessary from `preAllocatedVUs` to a maximum of `maxVUs`;
* our example performed ~1,300 iterations over the course of the test.
