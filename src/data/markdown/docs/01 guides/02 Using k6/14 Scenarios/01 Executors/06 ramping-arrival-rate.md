---
title: 'Ramping arrival rate'
excerpt: ''
---

A variable number of iterations are executed in a specified period of time. This is
similar to the ramping VUs executor, but for iterations instead, and k6 will attempt
to dynamically change the number of VUs to achieve the configured iteration rate.

See the [arrival rate](#arrival-rate) section for details.

#### Options

| Option            | Type    | Description                                                                             | Default |
| ----------------- | ------- | --------------------------------------------------------------------------------------- | ------- |
| `startRate`       | integer | Number of iterations to execute each `timeUnit` period at test start.                   | `0`     |
| `timeUnit`        | string  | Period of time to apply the `startRate` the `stages` `target` value.                    | `"1s"`  |
| `stages`          | array   | Array of objects that specify the target number of iterations to ramp up or down to.    | `[]`    |
| `preAllocatedVUs` | integer | Number of VUs to pre-allocate before test start in order to preserve runtime resources. | -       |
| `maxVUs`          | integer | Maximum number of VUs to allow during the test run.                                     | -       |

#### When to use

If you need your tests to not be affected by the system-under-test's performance, and
would like to ramp the number of iterations up or down during specific periods of time.

#### Examples

- Execute a variable RPS test, starting at 50, ramping up to 200 and then back to 0,
  over a 1 minute period:

<div class="code-group" data-props='{"labels": [ "ramping-arr-rate.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 50,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: 200, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</div>
