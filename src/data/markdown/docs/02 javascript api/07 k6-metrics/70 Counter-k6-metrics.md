---
title: 'Counter (k6/metrics)'
---

_Counter_ is an object for representing a custom cumulative counter metric. It is one of the four custom metric types.

| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| `name`    | string | The name of the custom metric. |

| Method                                                                                             | Description                        |
| -------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [Counter.add(value, [tags])](/javascript-api/k6-metrics/counter-k6-metrics/counter-add-value-tags) | Add a value to the counter metric. |

## Counter usage in Thresholds

When `Counter` is used in a threshold expression, the variable must be called `count` or `rate` (lower case).
For example:

- `count >= 200` // value of the counter must be larger or equal to 200
- `count < 10` // less than 10.

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javaScript
import { Counter } from 'k6/metrics';

var myCounter = new Counter('my_counter');

export default function() {
  myCounter.add(1);
  myCounter.add(3);
}
```

</div>

<div class="code-group" data-props='{"labels": ["Simple Threshold usage"], "lineNumbers": [true]}'>

```javaScript
import http from "k6/http";
import { Counter } from "k6/metrics";

let CounterErrors = new Counter("Errors");

export let options = { thresholds: { "Errors": ["count<100"] } };

export default function() {
  let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  let contentOK = res.json("name") === 'Bert';
  CounterErrors.add(!contentOK);
};
```

</div>

<div class="code-group" data-props='{"labels": ["Advanced Thresholds"], "lineNumbers": [true]}'>

```javaScript
import { Counter } from 'k6/metrics';
import { sleep } from 'k6';
import http from 'k6/http';

let allErrors = new Counter('error_counter');

export let options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    'error_counter': [
      'count < 10', // 10 or fewer total errors are tolerated
    ],
    'error_counter{errorType:authError}': [ // Threshold on a sub-metric (tagged values)
      'count <= 2', // max 2 authentication errors are tolerated
    ]
  }
};

export default function () {
  let auth_resp = http.post('https://test-api.k6.io/auth/token/login/',
                            {username: 'test-user', 'password': 'supersecure'});

  if (auth_resp.status >= 400){
    allErrors.add(1, { errorType: 'authError' }); // tagged value creates submetric (useful for making thresholds specific)
  }

  let other_resp = http.get('https://test-api.k6.io/public/crocodiles/1/');
  if (other_resp.status >= 400) {
    allErrors.add(1); // untagged value
  }

  sleep(1);
}
```

</div>
