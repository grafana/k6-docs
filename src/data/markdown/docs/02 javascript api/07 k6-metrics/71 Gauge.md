---
title: 'Gauge'
---

_Gauge_ is an object for representing a custom metric holding only the latest value added. It is one of the four [custom metrics](/javascript-api/k6-metrics).

| Parameter | Type    | Description                                                                                         |
| --------- | ------- | --------------------------------------------------------------------------------------------------- |
| `name`    | string  | The name of the custom metric.                                                                      |
| `isTime`  | boolean | A boolean indicating whether the values added to the metric are time values or just untyped values. |

| Method                                                                                       | Description                                                                |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [Gauge.add(value, [tags])](/javascript-api/k6-metrics/gauge/gauge-add-value-tags) | Add a value to the gauge metric. Only the latest value added will be kept. |

## Gauge usage in Thresholds

When gauge is used in a threshold expression, the variable must be called `value` (lower case).
For example:

- `value < 200`
- `value > 1`

### Examples

<div class="code-group" data-props='{"labels": ["gauge-metric.js"], "lineNumbers": [true]}'>

```js
import { Gauge } from 'k6/metrics';

var myGauge = new Gauge('my_gauge');

export default function () {
  myGauge.add(3);
  myGauge.add(1);
  myGauge.add(2, { tag1: 'value', tag2: 'value2' });
}
```

</div>

<div class="code-group" data-props='{"labels": ["gauge-threshold.js"], "lineNumbers": [true]}'>

```js
import http from 'k6/http';
import { sleep } from 'k6';
import { Gauge } from 'k6/metrics';

let GaugeContentSize = new Gauge('ContentSize');

export let options = {
  thresholds: {
    ContentSize: ['value<4000'],
  },
};

export default function () {
  let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  GaugeContentSize.add(res.body.length);
  sleep(1);
}
```

</div>
