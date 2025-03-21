---
title: 'Trend'
description: 'Trend is an object for representing a custom metric that allows for calculating different statistics on the added values (min, max, average or percentiles)'
weight: 73
weight: 73
---

# Trend

_Trend_ is an object for representing a custom metric that allows for calculating different statistics on the added values (min, max, average or percentiles). It is one of the four [custom metrics](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics).

| Parameter | Type    | Description                                                                                         |
| --------- | ------- | --------------------------------------------------------------------------------------------------- |
| `name`    | string  | The name of the custom metric.                                                                      |
| `isTime`  | boolean | A boolean indicating whether the values added to the metric are time values or just untyped values. |

| Method                                                                                                         | Description                      |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [Trend.add(value, [tags])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/trend/trend-add) | Add a value to the trend metric. |

## Trend usage in Thresholds

When `Trend` is used in a [threshold expression](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds), there are a range of variables that can be used.

- `avg` for average
- `min` for minimum
- `max` for maximum
- `med` for median
- `p(N)` for specific percentile. `N` is a number between `0.0` and `100.0` meaning the percentile value to look at, e.g. `p(99.99)` means the 99.99th percentile.

The unit of these variables and functions are all in milliseconds.

### Example threshold expressions:

- `p(95) < 400` // 95% of requests must finish below 400ms
- `p(99) < 1000` // 99% of requests must finish within 1s.
- `p(50) < 200` // half of requests must finish within 200ms.
- `max < 3000` // the slowest request must finish within 3s.

> #### ⚠️ Don't use `min` and `max` in thresholds
>
> We don't recommend using `min` and `max` for specifying thresholds because these
> values represent outliers. Use percentiles instead.

### Examples

{{< code >}}

```javascript
import { Trend } from 'k6/metrics';

const myTrend = new Trend('my_trend');

export default function () {
  myTrend.add(1);
  myTrend.add(2, { tag1: 'value', tag2: 'value2' });
}
```

{{< /code >}}

{{< code >}}

```javascript
import { Trend } from 'k6/metrics';
import { sleep } from 'k6';
import http from 'k6/http';

const serverWaitingTimeOnLogin = new Trend('serverWaitingTimeOnLogin', true);

export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    serverWaitingTimeOnLogin: ['p(95) < 200'],
  },
};

export default function () {
  const resp = http.post('https://test-api.k6.io/auth/token/login/', {
    username: 'test-user',
    password: 'supersecure',
  });

  serverWaitingTimeOnLogin.add(resp.timings.waiting);
  sleep(1);
}
```

{{< /code >}}
