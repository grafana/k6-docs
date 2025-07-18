---
title: 'toBeLessThan()'
head_title: 'expect(actual).toBeLessThan(expected)'
description: 'Asserts that a numeric value is less than another value'
weight: 45
---

# toBeLessThan()

The `toBeLessThan()` method asserts that a numeric value is less than another value.

## Syntax

```javascript
expect(actual).toBeLessThan(expected)
expect(actual).not.toBeLessThan(expected)
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| expected | number | The value to compare against |

## Returns

| Type | Description |
| --- | --- |
| void | No return value |

## Description

The `toBeLessThan()` method performs a numeric comparison using the `<` operator. Both values must be numbers, or the assertion will fail.

## Usage

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  expect(3).toBeLessThan(5);
  expect(10).toBeLessThan(10.5);
  expect(-5).toBeLessThan(-1);
  expect(-1).toBeLessThan(0);
  expect(0).toBeLessThan(1);
}
```

## See Also

- [toBeGreaterThan()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobegreaterthan) - Numeric greater than comparison
- [toBeLessThanOrEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobelessthanorequal) - Numeric less than or equal comparison
- [toBeGreaterThanOrEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobegreaterthanorequal) - Numeric greater than or equal comparison
- [toBeCloseTo()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobecloseto) - Floating point comparison
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function