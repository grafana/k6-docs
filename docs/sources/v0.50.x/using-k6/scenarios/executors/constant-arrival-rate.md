---
title: 'Constant arrival rate'
description: 'A fixed number of iterations are started in a specified period of time.'
weight: 05
---

# Constant arrival rate

With the `constant-arrival-rate` executor, k6 starts a fixed number of iterations over a specified period of time.
It is an open-model executor, meaning iterations start independently of system response (for details, read
[Open and Closed models](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/open-vs-closed)).

This executor continues to start iterations at the given rate as long as VUs are available.
The time to execute an iteration can vary with test logic or the system-under-test response time.
To compensate for this, the executor starts a varied number of VUs to meet the configured iteration rate.
For explanations of how allocation works, read [Arrival-rate VU allocation](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/arrival-rate-vu-allocation).

{{% admonition type="note" %}}

**Iteration starts are spaced fractionally.**
Iterations **do not** start at exactly the same time.
At a `rate` of `10` with a `timeUnit` of `1s`, each iteration starts about every tenth of a second (that is, each 100ms).

{{% /admonition %}}

## Options

Besides the [common configuration options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios#options),
this executor has the following options:

| Option                               | Type    | Description                                                                    | Default                             |
| ------------------------------------ | ------- | ------------------------------------------------------------------------------ | ----------------------------------- |
| duration<sup>(required)</sup>        | string  | Total scenario duration (excluding `gracefulStop`).                            | -                                   |
| rate<sup>(required)</sup>            | integer | Number of iterations to start during each `timeUnit` period.                   | -                                   |
| preAllocatedVUs<sup>(required)</sup> | integer | Number of VUs to pre-allocate before test start to preserve runtime resources. | -                                   |
| timeUnit                             | string  | Period of time to apply the `rate` value.                                      | `"1s"`                              |
| maxVUs                               | integer | Maximum number of VUs to allow during the test run.                            | If unset, same as `preAllocatedVUs` |

## When to use

When you want iterations to remain constant, independent of the performance of the system under test.
This approach is useful for a more accurate representation of RPS, for example.

{{% admonition type="note" %}}

**Don't put sleep at the end of an iteration.**

The arrival-rate executors already pace the iteration rate through the `rate` and `timeUnit` properties.
So it's unnecessary to use a `sleep()` function at the end of the VU code.

{{% /admonition %}}

## Example

This example schedules a constant rate of 30 iterations per second for 30 seconds.
It pre-allocates 2 VUs, and allows k6 to dynamically schedule up to 50 VUs as needed.

{{< code >}}

```javascript
import http from 'k6/http';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',

      // How long the test lasts
      duration: '30s',

      // How many iterations per timeUnit
      rate: 30,

      // Start `rate` iterations per second
      timeUnit: '1s',

      // Pre-allocate 2 VUs before starting the test
      preAllocatedVUs: 2,

      // Spin up a maximum of 50 VUs to sustain the defined
      // constant arrival rate.
      maxVUs: 50,
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

{{< /code >}}

## Observations

The following graph depicts the performance of the [example](#example) script:

![Ramping VUs](/media/docs/k6-oss/constant-arrival-rate.png)

Based upon our test scenario inputs and results:

- The desired rate of 30 iterations started every 1 second is achieved and maintained for the majority of the test.
- The test scenario runs for the specified 30 second duration.
- Having started with 2 VUs (as specified by the `preAllocatedVUs` option), k6 automatically adjusts the number of VUs to achieve the desired rate, up to the `maxVUs`. For this test, this ended up as 17 VUs.
- The number of VUs to achieve the desired rate varies depending on how long each iteration takes to execute. For this test definition, if it would take exactly 1 second, then 30 VUs would be needed. However, as it takes less than 1 second, then less VUs are needed.

> Using too low of a `preAllocatedVUs` setting will reduce the test duration at the desired rate, as resources need to continually be allocated to achieve the rate.
