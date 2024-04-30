---
title: 'Rate'
description: 'Rate is an object for representing a custom metric keeping track of the percentage of added values that are non-zero.'
weight: 72
weight: 72
---

# Rate

_Rate_ is an object for representing a custom metric keeping track of the percentage of added values that are non-zero. It is one of the four [custom metrics](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics).

| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| `name`    | string | The name of the custom metric. |

| Method                                                                                                      | Description                     |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [Rate.add(value, [tags])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/rate/rate-add) | Add a value to the rate metric. |

## Rate usage in Thresholds

When `Rate` is used in a threshold expression, the variable must be called `rate` (lower case).
For example:

- `rate < 0.1` // less than 10%
- `rate >= 0.9` // more or equal to 90%

The value of the `rate` variable ranges between `0.00` and `1.00`.

### Examples

{{< code >}}

```javascript
import { Rate } from 'k6/metrics';

const myRate = new Rate('my_rate');

export default function () {
  myRate.add(true);
  myRate.add(false);
  myRate.add(1);
  myRate.add(0, { tag1: 'value', tag2: 'value2' });
}
```

{{< /code >}}

{{< code >}}

```javascript
import { Rate } from 'k6/metrics';
import { sleep } from 'k6';
import http from 'k6/http';

const errorRate = new Rate('errorRate');

export const options = {
  vus: 1,
  duration: '5m',
  thresholds: {
    errorRate: [
      // more than 10% of errors will abort the test
      { threshold: 'rate < 0.1', abortOnFail: true, delayAbortEval: '1m' },
    ],
  },
};

export default function () {
  const resp = http.get('https://test-api.k6.io/public/crocodiles/1/');

  errorRate.add(resp.status >= 400);

  sleep(1);
}
```

{{< /code >}}
