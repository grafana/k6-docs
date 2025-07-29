---
title: 'toBeGreaterThanOrEqual()'
description: 'Asserts that a numeric value is greater than or equal to another value'
weight: 44
---

# toBeGreaterThanOrEqual()

The `toBeGreaterThanOrEqual()` method asserts that a numeric value is greater than or equal to another value.

## Syntax

<!-- eslint-skip -->

```javascript
expect(actual).toBeGreaterThanOrEqual(expected);
expect(actual).not.toBeGreaterThanOrEqual(expected);
```

## Parameters

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| expected  | number | The value to compare against |

## Returns

| Type | Description     |
| ---- | --------------- |
| void | No return value |

## Description

The `toBeGreaterThanOrEqual()` method performs a numeric comparison using the `>=` operator. Both values must be numbers, or the assertion will fail.

## Usage

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  expect(5).toBeGreaterThanOrEqual(3);
  expect(5).toBeGreaterThanOrEqual(5); // Equal values pass
  expect(10.5).toBeGreaterThanOrEqual(10);
  expect(0).toBeGreaterThanOrEqual(-1);
  expect(-1).toBeGreaterThanOrEqual(-5);
}
```

## See Also

- [toBeGreaterThan()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobegreaterthan) - Numeric greater than comparison
- [toBeLessThanOrEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobelessthanorequal) - Numeric less than or equal comparison
- [toBeLessThan()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobelessthan) - Numeric less than comparison
- [toBeCloseTo()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobecloseto) - Floating point comparison
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function
