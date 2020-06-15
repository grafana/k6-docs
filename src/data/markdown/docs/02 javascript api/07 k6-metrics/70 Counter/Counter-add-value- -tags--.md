---
title: "Counter.add(value, [tags])"
---

Add a value to the `Counter` metric.

| Parameter | Type     | Description                                                                                                                                                                                                                                                                |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value     | number   | The value to add to the counter.                                                                                                                                                                                                                                           |
| tags      | object   | Set of [tags](/using-k6/tags-and-groups) that will be tagged to the added data point (note that tags are added per data point and not for the entire metric).                                                                                                         |


### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import { Counter } from 'k6/metrics';

var myCounter = new Counter('my_counter');

export default function() {
  myCounter.add(1);
  myCounter.add(2, { tag1: 'myValue', tag2: 'myValue2' });
}
```

</div>
