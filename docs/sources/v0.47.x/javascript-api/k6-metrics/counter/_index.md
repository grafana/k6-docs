---
title: 'Counter'
description: 'Counter is an object for representing a custom cumulative counter metric. It is one of the four custom metric types.'
weight: 70
weight: 70
---

# Counter

_Counter_ is an object for representing a custom cumulative counter metric. It is one of the four custom metric types.

| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| `name`    | string | The name of the custom metric. |

| Method                                                                                                               | Description                        |
| -------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [Counter.add(value, [tags])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/counter/counter-add) | Add a value to the counter metric. |

## Counter usage in Thresholds

When `Counter` is used in a threshold expression, the variable must be called `count` or `rate` (lower case).
For example:

- `count >= 200` // value of the counter must be larger or equal to 200
- `count < 10` // less than 10.

### Examples

{{< code >}}

```javascript
import { Counter } from 'k6/metrics';

const myCounter = new Counter('my_counter');

export default function () {
  myCounter.add(1);
  myCounter.add(2, { tag1: 'myValue', tag2: 'myValue2' });
}
```

{{< /code >}}

{{< code >}}

```javascript
import http from 'k6/http';
import { Counter } from 'k6/metrics';

const CounterErrors = new Counter('Errors');

export const options = { thresholds: { Errors: ['count<100'] } };

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  const contentOK = res.json('name') === 'Bert';
  CounterErrors.add(!contentOK);
}
```

{{< /code >}}

{{< code >}}

```javascript
import { Counter } from 'k6/metrics';
import { sleep } from 'k6';
import http from 'k6/http';

const allErrors = new Counter('error_counter');

export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    'error_counter': [
      'count < 10', // 10 or fewer total errors are tolerated
    ],
    'error_counter{errorType:authError}': [
      // Threshold on a sub-metric (tagged values)
      'count <= 2', // max 2 authentication errors are tolerated
    ],
  },
};

export default function () {
  const auth_resp = http.post('https://test-api.k6.io/auth/token/login/', {
    username: 'test-user',
    password: 'supersecure',
  });

  if (auth_resp.status >= 400) {
    allErrors.add(1, { errorType: 'authError' }); // tagged value creates submetric (useful for making thresholds specific)
  }

  const other_resp = http.get('https://test-api.k6.io/public/crocodiles/1/');
  if (other_resp.status >= 400) {
    allErrors.add(1); // untagged value
  }

  sleep(1);
}
```

{{< /code >}}
