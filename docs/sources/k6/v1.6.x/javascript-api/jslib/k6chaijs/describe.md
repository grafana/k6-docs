---
title: 'describe( name, function )'
description: 'Entry point for creating test cases.'
weight: 33
---

# describe( name, function )

`describe` is a wrapper of [group](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/group) that adds the ability to:

- [Catch exceptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6chaijs/error-handling) to allow continuing the execution outside of the `describe` function.
- Returns a boolean to indicate the success of all its `k6chaijs` assertions.

{{< code >}}

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

export default function testSuite() {
  const success1 = describe('Basic test', () => {
    expect(1, 'number one').to.equal(1);
  });
  console.log(success1); // true

  const success2 = describe('Another test', () => {
    throw 'Something entirely unexpected happened';
  });
  console.log(success2); // false

  const success3 = describe('Yet another test', () => {
    expect(false, 'my vaule').to.be.true();
  });
  console.log(success3); // false
}
```

{{< /code >}}

{{< code >}}

```bash
default ✓ [======================================] 1 VUs  00m00.0s/10m0s  1/1 iters, 1 per VU

     █ Basic test
       ✓ expected number one to equal 1

     █ Another test
       ✗ Exception raised "Something entirely unexpected happened"
        ↳  0% — ✓ 0 / ✗ 1

     █ Yet another test
       ✗ expected my vaule to be true
        ↳  0% — ✓ 0 / ✗ 1
```

{{< /code >}}

## API

| Parameter | Type     | Description                                                                                    |
| --------- | -------- | ---------------------------------------------------------------------------------------------- |
| name      | string   | Test case name. The test case name should be unique. Otherwise, the test case will be grouped. |
| function  | function | The test case function to be executed                                                          |

### Returns

| Type | Description                                                                                                                                       |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| bool | Returns true when all `expect` conditions within the `describe()` body were successful, and no unhandled exceptions were raised, otherwise false. |

## Chaining describe() blocks

If you want to skip the execution of the following `describe` blocks, consider chaining them using `&&` as shown below.

<!-- eslint-skip -->

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

export default function testSuite() {
  describe('Basic test', () => {
    expect(1, 'number one').to.equal(1);
  }) &&
    describe('Another test', () => {
      throw 'Something entirely unexpected happened';
    }) &&
    describe('Yet another test', () => {
      // the will not be executed because the prior block returned `false`
      expect(false, 'my vaule').to.be.true();
    });
}
```
