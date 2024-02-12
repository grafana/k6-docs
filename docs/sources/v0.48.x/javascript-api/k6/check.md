---
title: 'check( val, sets, [tags] )'
description: 'Runs one or more checks on a value and generates a pass/fail result but does not throw errors or otherwise interrupt execution upon failure.'
description: 'Runs one or more checks on a value and generates a pass/fail result but does not throw errors or otherwise interrupt execution upon failure.'
---

# check( val, sets, [tags] )

Run checks on a value. A check is a test condition that can give a truthy or
falsy result. The `sets` parameter contains one or more checks, and the `check()`
function will return `false` if any of them fail.

Note that checks are not _asserts_ in their traditional sense - a failed assertion
will throw an error, while a check will always return with a pass or a failure.
Failure conditions can then instead be controlled by thresholds, for more power and flexibility.

| Parameter       | Type   | Description                              |
| --------------- | ------ | ---------------------------------------- |
| val             | any    | Value to test.                           |
| sets            | object | Tests (checks) to run on the value.      |
| tags (optional) | object | Extra tags to attach to metrics emitted. |

### Returns

| Type    | Description                                             |
| ------- | ------------------------------------------------------- |
| boolean | `true` if all checks have succeeded, `false` otherwise. |

### Examples

Using `check()` to verify that an HTTP response code was 200:

{{< code >}}

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://httpbin.test.k6.io');
  check(res, {
    'response code was 200': (res) => res.status == 200,
  });
}
```

{{< /code >}}

Using `check()` with a custom tag to verify that an HTTP response code was 200 and that body was 1234 bytes. The `checkOutput` can be used for any condition in your script logic:

{{< code >}}

```javascript
import http from 'k6/http';
import { check, fail } from 'k6';

export default function () {
  const res = http.get('https://httpbin.test.k6.io');
  const checkOutput = check(
    res,
    {
      'response code was 200': (res) => res.status == 200,
      'body size was 1234 bytes': (res) => res.body.length == 1234,
    },
    { myTag: "I'm a tag" }
  );

  if (!checkOutput) {
    fail('unexpected response');
  }
}
```

{{< /code >}}
