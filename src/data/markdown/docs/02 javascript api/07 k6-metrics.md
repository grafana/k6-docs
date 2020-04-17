---
title: 'k6/metrics'
excerpt: 'k6 Custom Metrics API'
---

The metrics module provides functionality to create [custom metrics](/using-k6/metrics) of various types. All metrics (both the built-in ones and the custom ones) have a type. There are four different metrics types, and they are: `Counter`, `Gauge`, `Rate` and `Trend`.

All values added to a custom metric can optionally be [tagged](/using-k6/tags-and-groups) which can be very useful when analysing the results after a test run.

| Metric type                                                  | Description                                                                                              |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| [Counter](/javascript-api/k6-metrics/counter-k6-metrics) | A metric that cumulatively sums added values.                                                            |
| [Gauge](/javascript-api/k6-metrics/gauge-k6-metrics)     | A metric that stores the min, max and last values added to it.                                           |
| [Rate](/javascript-api/k6-metrics/rate-k6-metrics)       | A metric that tracks the percentage of added values that are non-zero.                                   |
| [Trend](/javascript-api/k6-metrics/trend-k6-metrics)     | A metric that allows for calculating statistics on the added values (min, max, average and percentiles). |

### Example

<div class="code-group" data-props='{"labels": ["custom-metrics.js"], "lineNumbers": [true]}'>

```js
import { Counter, Gauge, Rate, Trend } from 'k6/metrics';
import { check } from 'k6';

var myCounter = new Counter('my_counter');
var myGauge = new Gauge('my_gauge');
var myRate = new Rate('my_rate');
var myTrend = new Trend('my_trend');

export default function() {
  myCounter.add(1);
  myCounter.add(2, { tag1: 'myValue', tag2: 'myValue2' });

  myGauge.add(123);
  myGauge.add(456, { tag1: 'myValue', tag2: 'myValue2' });

  myRate.add(true);
  myRate.add(false, { tag1: 'value', tag2: 'value2' });

  myTrend.add(1);
  myTrend.add(2, { tag1: 'value', tag2: 'value2' });
}
```

</div>
