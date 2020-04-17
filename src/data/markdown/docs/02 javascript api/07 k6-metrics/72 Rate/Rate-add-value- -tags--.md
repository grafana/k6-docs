---
title: "Rate.add(value, [tags])"
---

Set the value of the `Rate` metric.

| Parameter | Type     | Description                                                                                                                                                                                                                                                                |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value     | number   | The value to add to the rate metric.                                                                                                                                                                                                                                       |
| tags      | object   | Set of [tags](/using-k6/tags-and-groups) that will be tagged to the added data point (note that tags are added per data point and not for the entire metric).                                                                                                         |


### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import { Rate } from 'k6/metrics';

var myRate = new Rate('my_rate');

export default function() {
  myRate.add(true);
  myRate.add(false);
  myRate.add(1);
  myRate.add(0, { tag1: 'value', tag2: 'value2' });
}
```

</div>
