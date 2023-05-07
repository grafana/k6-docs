---
title: 'Constant arrival rate'
excerpt: 'A fixed number of iterations are started in a specified period of time.'
---

## Description

A fixed number of iterations are started in a specified period of time.
This executor will continue to start iterations at the given rate as long as there are VUs
available to run them. Since iteration execution time can vary because of test logic or the
system-under-test responding more slowly, this executor will try to compensate
by running a variable number of VUs&mdash;including potentially initializing more in the middle
of the test&mdash;to meet the configured iteration rate. This approach is
useful for a more accurate representation of RPS, for example.

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
| duration<sup>(required)</sup>        | string  | Total scenario duration (excluding `gracefulStop`).                                     | -       |
| rate<sup>(required)</sup>            | integer | Number of iterations to start during each `timeUnit` period.                                 | -       |
| preAllocatedVUs<sup>(required)</sup> | integer | Number of VUs to pre-allocate before test start to preserve runtime resources. | -       |
| timeUnit         | string  | Period of time to apply the `rate` value.                                               | `"1s"`  |
| maxVUs           | integer | Maximum number of VUs to allow during the test run.                                     | If unset, same as `preAllocatedVUs`       |

## When to use

When you want to maintain a constant number of iterations without being affected by the
performance of the system under test.

<Blockquote mod="note" title="Don't put sleep at the end of an iteration">

The arrival-rate executors already pace the iteration rate through the `rate` and `timeUnit` properties.
So it's unnecessary to use a `sleep()` function at the end of the VU code.

</Blockquote>

## Example

In this example, we'll start a constant rate of 30 iterations per second for 30 seconds, allowing k6 to dynamically schedule up to 50 VUs.

<CodeGroup labels={[ "constant-arr-rate.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',

      // Our test should last 30 seconds in total
      duration: '30s',

      // It should start 30 iterations per `timeUnit`. Note that iterations starting points
      // will be evenly spread across the `timeUnit` period.
      rate: 30,

      // It should start `rate` iterations per second
      timeUnit: '1s',

      // It should preallocate 2 VUs before starting the test
      preAllocatedVUs: 2,

      // It is allowed to spin up to 50 maximum VUs to sustain the defined
      // constant arrival rate.
      maxVUs: 50,
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
  // We're injecting a processing pause for illustrative purposes only!
  // Sleep time is 500ms. Total iteration time is sleep + time to finish request.
  sleep(0.5);
}
```

</CodeGroup>


## Observations

The following graph depicts the performance of the [example](#example) script:

![Ramping VUs](./images/constant-arrival-rate.png)

Based upon our test scenario inputs and results:

* The desired rate of 30 iterations started every 1 second is achieved and maintained for the majority of the test.
* The test scenario runs for the specified 30 second duration.
* Having started with 2 VUs (as specified by the `preAllocatedVUs` option), k6 automatically adjusts the number of VUs to achieve the desired rate, up to the `maxVUs`; for our test, this ended up as 17 VUs.
* Exactly 900 iterations are started in total, `30s * 30 iters/s`.

> As in our example, using too low of a `preAllocatedVUs` setting will reduce the test duration at the desired rate, as resources need to continually be allocated to achieve the rate.
