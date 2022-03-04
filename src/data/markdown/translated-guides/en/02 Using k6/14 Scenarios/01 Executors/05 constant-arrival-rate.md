---
title: 'Constant arrival rate'
excerpt: 'A fixed number of iterations are executed in a specified period of time.'
---

## Description

A fixed number of iterations are executed in a specified period of time.
Since iteration execution time can vary because of test logic or the
system-under-test responding more slowly, this executor will try to compensate
by running a variable number of VUs&mdash;including potentially initializing more in the middle
of the test&mdash;in order to meet the configured iteration rate. This approach is
useful for a more accurate representation of RPS, for example.

See the [arrival rate](/using-k6/scenarios/arrival-rate) section for details.

## Options

In addition to the [common configuration options](/using-k6/scenarios#common-options) this executor
also adds the following options:

| Option             | Type    | Description                                                                             | Default |
| ------------------ | ------- | --------------------------------------------------------------------------------------- | ------- |
| duration<sup>(required)</sup>        | string  | Total scenario duration (excluding `gracefulStop`).                                     | -       |
| rate<sup>(required)</sup>            | integer | Number of iterations to execute each `timeUnit` period.                                 | -       |
| preAllocatedVUs<sup>(required)</sup> | integer | Number of VUs to pre-allocate before test start in order to preserve runtime resources. | -       |
| timeUnit         | string  | Period of time to apply the `rate` value.                                               | `"1s"`  |
| maxVUs           | integer | Maximum number of VUs to allow during the test run.                                     | -       |

## When to use

When you want to maintain a constant number of iterations without being affected by the
performance of the system under test.

## Examples

In this example, we'll execute a constant rate of 30 iterations per second for 30 seconds, allowing k6 to dynamically schedule up to 50 VUs.

<CodeGroup labels={[ "constant-arr-rate.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 30,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 2,
      maxVUs: 50,
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
  // We're injecting a processing pause for illustrative purposes only!
  // Each iteration will be ~515ms, therefore ~2 iterations/second per VU maximum throughput.
  sleep(0.5);
}
```

</CodeGroup>

> Note that in order to reliably achieve a fixed request rate, it's recommended to keep
> the function being executed very simple, with preferably only a single request call,
> and no additional processing or `sleep()` calls.

## Observations

The following graph depicts the performance of the [example](#example) script:

![Ramping VUs](./images/constant-arrival-rate.png)

Based upon our test scenario inputs and results:

* The desired rate of 30 iterations every 1 second is achieved and maintained for the majority of the test;
* test scenario runs for the specified 30 second duration;
* starting with 2 VUs (as specified with `preAllocatedVUs`), k6 automatically adjusts the number of VUs to achieve the desired rate up to the `maxVUs`; for our test, this ended up as 17 VUs;
* approximately 900 iterations are performed in total, `30s * 30 iters/s`.

> As in our example, using too low of a `preAllocatedVUs` setting will reduce the test duration at the desired rate as resources need to continually be allocated to achieve the rate.
