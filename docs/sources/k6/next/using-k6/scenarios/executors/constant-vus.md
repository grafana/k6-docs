---
title: 'Constant VUs'
description: 'A fixed number of VUs execute as many iterations as possible for a specified amount of time.'
weight: 03
---

# Constant VUs

With the `constant-vus` executor, a fixed number of VUs execute as many iterations as possible for a specified amount of time.

For a shortcut to this executor, use the [VUs](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#vus) and [duration](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#duration) options.

## Options

Besides the [common configuration options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios#options),
this executor has the following options:

| Option                        | Type    | Description                                         | Default |
| ----------------------------- | ------- | --------------------------------------------------- | ------- |
| duration<sup>(required)</sup> | string  | Total scenario duration (excluding `gracefulStop`). | -       |
| vus                           | integer | Number of VUs to run concurrently.                  | `1`     |

## When to use

Use this executor if you need a specific number of VUs to run for a certain amount of time.

## Example

This examples schedules 10 VUs to run constantly for a duration 30 seconds.

{{< code >}}

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
  // Injecting sleep
  // Total iteration time is sleep + time to finish request.
  sleep(0.5);
}
```

{{< /code >}}

## Observations

The following graph depicts the performance of the [example](#example) script:

![Constant VUs](/media/docs/k6-oss/constant-vus.png)

Based upon our test scenario inputs and results:

- The number of VUs is fixed at 10, and are initialized before the test begins;
- Overall test duration is fixed at the configured 30 second duration;
- Each _iteration_ of the `default` function is expected to be roughly 515ms, or ~2/s;
- Maximum throughput (highest efficiency) is therefore expected to be ~20 iters/s, `2 iters/s * 10 VUs`;
- We see that the maximum throughput is reached and maintained for the majority of the test;
- Approximately 600 iterations are therefore performed in total, `30 seconds * 20 iters/s`.
