---
title: 'Constant VUs'
excerpt: 'A fixed number of VUs execute as many iterations as possible for a specified amount of time.'
---

## Description

A fixed number of VUs execute as many iterations as possible for a specified amount
of time. This executor is equivalent to the global [vus](/using-k6/options#vus) and [duration](/using-k6/options#duration) options.

## Options

In addition to the [common configuration options](/using-k6/scenarios#common-options) this executor
also adds the following options:

| Option      | Type    | Description                                         | Default |
| ----------- | ------- | --------------------------------------------------- | ------- |
| duration<sup>(required)</sup> | string  | Total scenario duration (excluding `gracefulStop`). | -       |
| vus       | integer | Number of VUs to run concurrently.                  | `1`     |

## When to use

Use this executor if you need a specific amount of VUs to run for a certain amount of time.

## Example

In this example, we'll run 10 VUs constantly for a duration 30 seconds.

<CodeGroup labels={[ "constant-vus.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
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

## Observations

The following graph depicts the performance of the [example](#example) script:

![Constant VUs](./images/constant-vus.png)

Based upon our test scenario inputs and results:

* The number of VUs is fixed at 10 VUs which are initialized before beginning the test;
* test scenario runs for the specified 30 second duration; 
* maximum throughput of 20 iters/s is reached and maintained for the majority of the test;
* approximately 600 iterations performed in total, `30 seconds * 20 iters/s`.
