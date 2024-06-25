---
title: Workaround to calculate iteration_duration
description: 'A threshold can calculate the value of a metric excluding the results of the setup and teardown functions'
_build:
  list: false
weight: 20
---

# Workaround to calculate iteration_duration

A common requested case is to track the `iteration_duration` metric without including time spent for `setup` and `teardown` functions.
This feature is not yet available but a threshold on `iteration_duration` or any pre-existing metrics can be used as a workaround.

It's based on the concept of creating thresholds for sub-metrics created by tags for the required scope and setting the criteria that always pass. It works with any enabled tags that already works with threshold, for example:

- `iteration_duration{scenario:default}` generates a sub-metric collecting samples only for the default scenario's iteration. `scenario:default` is used because that's the internal k6 scenario name when we haven't specified `options. `scenarios` explicitly and are just using the execution shortcuts instead.
- `iteration_duration{group:::setup}` or `iteration_duration{group:::teardown}` create sub-metrics collecting the duration only for `setup` and `teardown`. `k6` implicitly creates [groups](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#groups) for `setup` and `teardown`, and `::` is the group separator.
- `http_req_duration{scenario:default}` can be useful as well for isolating executed long-running requests.

{{< code >}}

```javascript
import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    'iteration_duration{scenario:default}': [`max>=0`],
    'iteration_duration{group:::setup}': [`max>=0`],
    'iteration_duration{group:::teardown}': [`max>=0`],
    'http_req_duration{scenario:default}': [`max>=0`],
  },
};

export function setup() {
  http.get('https://httpbin.test.k6.io/delay/5');
}

export default function () {
  http.get('http://test.k6.io/?where=default');
  sleep(0.5);
}

export function teardown() {
  http.get('https://httpbin.test.k6.io/delay/3');
  sleep(5);
}
```

{{< /code >}}

Dedicated sub-metrics have been generated collecting samples only for the scope defined by thresholds:

{{< code >}}

```bash
http_req_duration..............: avg=1.48s    min=101.95ms med=148.4ms  max=5.22s    p(90)=4.21s    p(95)=4.71s
  { expected_response:true }...: avg=1.48s    min=101.95ms med=148.4ms  max=5.22s    p(90)=4.21s    p(95)=4.71s
✓ { scenario:default }.........: avg=148.4ms  min=103.1ms  med=148.4ms  max=193.7ms  p(90)=184.64ms p(95)=189.17ms

iteration_duration.............: avg=5.51s    min=1.61s    med=6.13s    max=8.81s    p(90)=8.27s    p(95)=8.54s
✓ { group:::setup }............: avg=6.13s    min=6.13s    med=6.13s    max=6.13s    p(90)=6.13s    p(95)=6.13s
✓ { group:::teardown }.........: avg=8.81s    min=8.81s    med=8.81s    max=8.81s    p(90)=8.81s    p(95)=8.81s
✓ { scenario:default }.........: avg=1.61s    min=1.61s    med=1.61s    max=1.61s    p(90)=1.61s    p(95)=1.61s
```

{{< /code >}}
