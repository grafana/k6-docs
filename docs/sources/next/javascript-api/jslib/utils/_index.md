---
title: 'utils'
description: 'A collection of small utility functions useful during load testing with k6. '
weight: 04
---

# utils

The `utils` module contains number of small utility functions useful in every day load testing.

> ⭐️ Source code available on [GitHub](https://github.com/k6io/k6-jslib-utils).
> Please request features and report bugs through [GitHub issues](https://github.com/k6io/k6-jslib-utils/issues).

| Function                                                                                                                                                            | Description                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [randomIntBetween(min, max)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/utils/randomintbetween)                                                  | Random integer in a given range                                                                                                                                                                                                                                                                                                                                                 |
| [randomItem(array)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/utils/randomitem)                                                                 | Random item from a given array                                                                                                                                                                                                                                                                                                                                                  |
| [randomString(length, [charset])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/utils/randomstring)                                                 | Random string of a given length, optionally selected from a custom character set                                                                                                                                                                                                                                                                                                |
| [uuidv4()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/utils/uuidv4)                                                                              | Random UUID v4 in a string representation                                                                                                                                                                                                                                                                                                                                       |
| [findBetween(content, left, right, [repeat])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/utils/findbetween)                                      | Extract a string between two surrounding strings                                                                                                                                                                                                                                                                                                                                |
| [normalDistributionStages(maxVUs, durationSeconds, [numberOfStages])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/utils/normaldistributionstages) | Creates [stages](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options#stages) which will produce a normal distribution (bell-curve) of VUs for a test                                                                                                                                                                                                                   |
| getCurrentStageIndex                                                                                                                                                | Get the index of the running stage as defined in the `stages` array options. It can be used only with the executors that support the `stages` option as [ramping-vus](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/ramping-vus) or [ramping-arrival-rate](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/ramping-arrival-rate). |
| tagWithCurrentStageIndex                                                                                                                                            | Tag all the generated metrics in the iteration with the index of the current running stage.                                                                                                                                                                                                                                                                                     |
| tagWithCurrentStageProfile                                                                                                                                          | Tag all the generated metrics in the iteration with the computed profile for the current running stage.                                                                                                                                                                                                                                                                         |

## Simple example

{{< code >}}

```javascript
import { sleep } from 'k6';
import http from 'k6/http';

import {
  randomIntBetween,
  randomString,
  randomItem,
  uuidv4,
  findBetween,
} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export default function () {
  const res = http.post(`https://test-api.k6.io/user/register/`, {
    first_name: randomItem(['Joe', 'Jane']), // random name
    last_name: `Jon${randomString(1, 'aeiou')}s`, //random character from given list
    username: `user_${randomString(10)}@example.com`, // random email address,
    password: uuidv4(), // random password in form of uuid
  });

  // find a string between two strings to grab the username:
  const username = findBetween(res.body, '"username":"', '"');
  console.log('username from response: ' + username);

  sleep(randomIntBetween(1, 5)); // sleep between 1 and 5 seconds.
}
```

{{< /code >}}
