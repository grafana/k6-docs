---
title: 'Shared iterations'
description: 'A fixed number of iterations are "shared" between a number of VUs, and the test ends once all iterations are executed.'
weight: 01
---

# Shared iterations

The `shared-iterations` executor shares iterations between the number of VUs.
The test ends once k6 executes all iterations.

For a shortcut to this executor, use the [`vus`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#vus) and [`iterations`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#iterations) options.

{{% admonition type="note" %}}

Iterations **are not guaranteed to be evenly distributed** with this executor.
VU that executes faster will complete more iterations than slower VUs.

To guarantee that every VU completes a specific, fixed number of iterations, [use the per-VU iterations executor](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/per-vu-iterations).

{{% /admonition %}}

## Options

Besides the [common configuration options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios#options),
this executor has the following options:

| Option      | Type    | Description                                                                        | Default |
| ----------- | ------- | ---------------------------------------------------------------------------------- | ------- |
| vus         | integer | Number of VUs to run concurrently.                                                 | `1`     |
| iterations  | integer | Total number of script iterations to execute across all VUs.                       | `1`     |
| maxDuration | string  | Maximum scenario duration before it's forcibly stopped (excluding `gracefulStop`). | `"10m"` |

## When to use

This executor is suitable when you want a specific number of VUs to complete a fixed
number of total iterations, and the amount of iterations per VU is unimportant.
If the **time to complete** a number of test iterations is your concern, this executor should perform best.

An example use case is for quick performance tests in the developement build cycle.
As developers make changes, they might run the test against the local code to test for performance regressions.
Thus the executor works well with a _shift-left_ policy, where emphasizes testing performance early in the development cycle, when the cost of a fix is lowest.

## Example

The following example schedules 200 total iterations shared by 10 VUs with a maximum test duration of 30 seconds.

{{< code >}}

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 200,
      maxDuration: '30s',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
  // Injecting sleep
  // Sleep time is 500ms. Total iteration time is sleep + time to finish request.
  sleep(0.5);
}
```

{{< /code >}}

## Observations

The following graph depicts the performance of the [example](#example) script:

![Shared Iterations](/media/docs/k6-oss/shared-iterations.png)

Based upon our test scenario inputs and results:

- Test is limited to a fixed number of 200 iterations of the `default` function;
- The number of VUs is fixed to 10, and are initialized before the test begins;
- Each _iteration_ of the `default` function is expected to be roughly 515ms, or ~2/s;
- Maximum throughput (highest efficiency) is therefore expected to be ~20 iters/s, `2 iters/s * 10 VUs`;
- The maximum throughput is maintained for a larger portion of the test;
- The distribution of iterations may be skewed: one VU may have performed 50 iterations, another only 10.
