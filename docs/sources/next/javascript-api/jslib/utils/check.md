---
title: 'check( val, sets, [tags] )'
description: 'The jslib check function runs one or more checks on a value and generates a pass/fail result, but does not throw errors or interrupt test execution upon failure. It supports async values.'
---

# check( val, sets, [tags] )

The `check` function is a drop-in replacement for the built-in [check](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check/), with added support for async values. Any `Promise`s will be awaited, and the result is reported once the operation has been completed.

| Parameter       | Type                   | Description                                                                               |
| --------------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| val             | any                    | Value to test.                                                                            |
| sets            | Record<string, any>    | Tests (checks) to run on the value. Functions will be called. `Promise`s will be awaited. |
| tags (optional) | Record<string, string> | Extra tags to attach to metrics emitted.                                                  |

### Returns

| Type             | Description |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise<boolean> | boolean     | `true` if all checks have succeeded, `false` otherwise. If any of the checked values was a `Promise`, the result is wrapped in a `Promise`. |

### Examples

Using `check()` with async values.

{{< code >}}

```javascript
import http from 'k6/http';
import { fail } from 'k6';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

function waitFor(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, delay);
  });
}

export default async function () {
  const res = http.get('https://httpbin.test.k6.io');

  const success = await check(res, {
    'passing promise as a value': waitFor(1000),
    'async function': async (res) => {
      await waitFor(500);

      return res.status === 200;
    },
  });

  if (!success) {
    fail('check did not succeed');
  }
}
```

{{< /code >}}

For general usage of checks, refer to [check(val, set, [tags])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check/#examples).
