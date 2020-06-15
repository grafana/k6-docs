---
title: "Gauge.add(value, [tags])"
---

Set the value of the `Gauge` metric.

| Parameter | Type     | Description                                                                                                                                                                                                                                                                |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value     | number   | The value to set the gauge to.                                                                                                                                                                                                                                             |
| tags      | object   | Set of [tags](/using-k6/tags-and-groups) that will be tagged to the added data point (note that tags are added per data point and not for the entire metric).                                                                                                         |


### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import { Gauge } from 'k6/metrics';

var myGauge = new Gauge('my_gauge');

export default function() {
  myGauge.add(3);
  myGauge.add(1);
  myGauge.add(2, { tag1: 'value', tag2: 'value2' });
}
```

</div>
