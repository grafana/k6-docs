---
title: 'Gauge'
excerpt: 'Gauge is an object for representing a custom metric holding only the latest value added.'
---

_Gauge_ is an object for representing a custom metric holding only the latest value added. It is one of the four [custom metrics](/javascript-api/k6-metrics).

| Parameter | Type    | Description                                                                                         |
| --------- | ------- | --------------------------------------------------------------------------------------------------- |
| `name`    | string  | The name of the custom metric.                                                                      |
| `isTime`  | boolean | A boolean indicating whether the values added to the metric are time values or just untyped values. |

| Method                                                                            | Description                                                                |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [Gauge.add(value, [tags])](/javascript-api/k6-metrics/gauge/gauge-add) | Add a value to the gauge metric. Only the latest value added will be kept. |

## Gauge usage in Thresholds

When gauge is used in a threshold expression, the variable must be called `value` (lower case).
For example:

- `value < 200`
- `value > 1`

### Examples

<CodeGroup labels={["gauge-metric.js"]} lineNumbers={[true]}>

```javascript
import { Gauge } from 'k6/metrics';

const myGauge = new Gauge('my_gauge');

export default function () {
  myGauge.add(3);
  myGauge.add(1);
  myGauge.add(2, { tag1: 'value', tag2: 'value2' });
}
```

</CodeGroup>

<CodeGroup labels={["gauge-threshold.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';
import { Gauge } from 'k6/metrics';

const GaugeContentSize = new Gauge('ContentSize');

export const options = {
  thresholds: {
    ContentSize: ['value<4000'],
  },
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  GaugeContentSize.add(res.body.length);
  sleep(1);
}
```

</CodeGroup>
