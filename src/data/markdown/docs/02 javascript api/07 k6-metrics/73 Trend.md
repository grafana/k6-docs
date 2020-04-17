---
title: 'Trend (k6/metrics)'
---

_Trend_ is an object for representing a custom metric that allows for calculating different statistics on the added values (min, max, average or percentiles). It is one of the four [custom metrics](/javascript-api/k6-metrics).

| Parameter | Type    | Description                                                                                         |
| --------- | ------- | --------------------------------------------------------------------------------------------------- |
| `name`    | string  | The name of the custom metric.                                                                      |
| `isTime`  | boolean | A boolean indicating whether the values added to the metric are time values or just untyped values. |

| Method                                                                            | Description                      |
| --------------------------------------------------------------------------------- | -------------------------------- |
| [Trend.add(value, [tags])](/javascript-api/k6-metrics/trend/trend-add-value-tags) | Add a value to the trend metric. |


## Trend usage in Thresholds

When `Trend` is used in a threshold expression, there are a range of variables that can be used.
 - `avg` for average
 - `min` for minimum 
 - `max` for maximum
 - `med` for median
 - `p(N)` for specific percentile. `N` is a number between `0.0` and `100.0` meaning the percentile value to look at, eg. `p(99.99)` means the 99.99th percentile. 
 
The unit of these variables and functions are all in milliseconds.
 
### Example threshold expressions: 

 - `p(95) < 400` // 95% of requests must finish below 400ms
 - `p(99) < 1000` // 99% of requests must finish within 1s.
 - `p(50) < 200` // half of requests must finish within 200ms.
 - `max < 3000` // the slowest request must finish within 3s. 
 
<div class="doc-blockquote" data-props='{"mod": "warning"}'>

> ### ⚠️ Don't use `min` and `max` in thresholds.
> We don't recommend using `min` and `max` for specifying thresholds because these 
> values represent outliers. Use percentiles instead.

</div>
 

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javaScript
import { Trend } from 'k6/metrics';

var myTrend = new Trend('my_trend');

export default function() {
  myTrend.add(1);
  myTrend.add(2, { tag1: 'value', tag2: 'value2' });
}
```
</div>


<div class="code-group" data-props='{"labels": ["Usage in Thresholds"], "lineNumbers": [true]}'>

```javaScript
import { Trend } from 'k6/metrics';
import { sleep } from 'k6';
import http from 'k6/http';

let serverWaitingTimeOnLogin = new Trend('serverWaitingTimeOnLogin', true);

export let options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    'serverWaitingTimeOnLogin': [
      'p(95) < 200',
    ],
  }
};

export default function () {
  let resp = http.post('https://test-api.k6.io/auth/token/login/', { username: 'test-user', 'password': 'supersecure' });

  serverWaitingTimeOnLogin.add(resp.timings.waiting);
  sleep(1);
}
```