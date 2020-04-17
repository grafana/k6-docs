---
title: "Trend.add(value, [tags])"
---

Add a value to the `Trend` metric.

| Parameter | Type     | Description                                                                                                                                                                                                                                                                |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value     | number   | The value to add to the trend metric.                                                                                                                                                                                                                                      |
| tags      | object   | Set of [tags](/using-k6/tags-and-groups) that will be tagged to the added data point (note that tags are added per data point and not for the entire metric).                                                                                                         |


### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import { Trend } from 'k6/metrics';

var myTrend = new Trend('my_trend');

export default function() {
  myTrend.add(1);
  myTrend.add(2, { tag1: 'value', tag2: 'value2' });
}
```

</div>
