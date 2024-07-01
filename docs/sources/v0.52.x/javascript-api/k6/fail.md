---
title: 'fail( [err] )'
description: 'Throws an error, failing and aborting the current VU script iteration immediately.'
description: 'Throws an error, failing and aborting the current VU script iteration immediately.'
---

# fail( [err] )

Immediately throw an error, aborting the current iteration.

`fail()` does not abort the test, nor does it make the test exit with non-0 status.
If you are looking to fail the test by halting the execution, use [test.abort()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-execution/#test) instead

`fail()` is a simple convenience wrapper on top of JavaScript's `throw()`,
because the latter cannot be used as `[expr] || throw`, which is a convenient way to write k6 test code.

| Parameter      | Type   | Description                                |
| -------------- | ------ | ------------------------------------------ |
| err (optional) | string | Error message that gets printed to stderr. |

### Example

Aborting the current script iteration if a check fails:

{{< code >}}

```javascript
import http from 'k6/http';
import { check, fail } from 'k6';

export default function () {
  const res = http.get('https://k6.io');
  if (
    !check(res, {
      'status code MUST be 200': (res) => res.status == 200,
    })
  ) {
    fail('status code was *not* 200');
  }
}
```

{{< /code >}}
