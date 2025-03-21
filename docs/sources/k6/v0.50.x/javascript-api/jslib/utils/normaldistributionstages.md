---
title: 'normalDistributionStages(maxVus, durationSeconds, [numberOfStages])'
description: 'normalDistributionStages function'
weight: 46
---

# normalDistributionStages(maxVus, durationSeconds, [numberOfStages])

Function to create [stages](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options#stages) producing a _normal distribution (bell-curve)_ of VUs for a test.

| Parameter                 | Type | Description                                      |
| ------------------------- | ---- | ------------------------------------------------ |
| maxVus                    | int  | Maximum virtual users at the height of the curve |
| durationSeconds           | int  | Overall duration for all stages combined         |
| numberOfStages (optional) | int  | Number of stages to create; default is `10`      |

### Returns

| Type           | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| array\[object] | An array of `{"duration": "XXXs", "target": XXX}` JSON objects representing stages |

### Example

{{< code >}}

```javascript
import { sleep } from 'k6';
import exec from 'k6/execution';
import { normalDistributionStages } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  // Alters the number of VUs from 1 to 10 over a period
  // of 20 seconds comprised of 5 stages.
  stages: normalDistributionStages(10, 20, 5),
};

export default function () {
  console.log(exec.instance.vusActive);
  sleep(1);
}
```

{{< /code >}}
