---
title: 'Constant arrival rate'
excerpt: ''
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
| `duration*`        | string  | Total scenario duration (excluding `gracefulStop`).                                     | -       |
| `rate*`            | integer | Number of iterations to execute each `timeUnit` period.                                 | -       |
| `preAllocatedVUs*` | integer | Number of VUs to pre-allocate before test start in order to preserve runtime resources. | -       |
| `timeUnit`         | string  | Period of time to apply the `rate` value.                                               | `"1s"`  |
| `maxVUs`           | integer | Maximum number of VUs to allow during the test run.                                     | -       |

## When to use

When you want to maintain a constant number of requests without being affected by the
performance of the system under test.

## Examples

In this example, we'll execute a constant rate of 200 RPS for 1 minute, allowing k6 to dynamically schedule up to 100 VUs.

<CodeGroup labels={[ "constant-arr-rate.js" ]} lineNumbers={[true]}>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 200, // 200 RPS, since timeUnit is the default 1s
      duration: '1m',
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</CodeGroup>

Note that in order to reliably achieve a fixed request rate, it's recommended to keep
the function being executed very simple, with preferably only a single request call,
and no additional processing or `sleep()` calls.
