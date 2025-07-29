---
title: 'toBeCloseTo()'
description: 'Asserts that a number is close to another number within a specified precision'
weight: 41
---

# toBeCloseTo()

The `toBeCloseTo()` method asserts that a number is close to another number within a specified precision. This is useful for comparing floating-point numbers where exact equality might fail due to precision issues.

## Syntax

<!-- eslint-skip -->

```javascript
expect(actual).toBeCloseTo(expected);
expect(actual).toBeCloseTo(expected, precision);
expect(actual).not.toBeCloseTo(expected);
expect(actual).not.toBeCloseTo(expected, precision);
```

## Parameters

| Parameter | Type   | Default | Description                       |
| --------- | ------ | ------- | --------------------------------- |
| expected  | number |         | The expected number               |
| precision | number | `2`     | Number of decimal digits to check |

## Returns

| Type | Description     |
| ---- | --------------- |
| void | No return value |

## Description

The `toBeCloseTo()` method checks if two numbers are approximately equal within a specified precision. It uses the formula `Math.abs(actual - expected) < Math.pow(10, -precision) / 2` to determine if the numbers are close enough.

This is particularly useful when working with floating-point arithmetic where exact equality comparisons might fail due to precision limitations.

## Usage

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  // Floating-point arithmetic precision issues
  expect(0.1 + 0.2).toBeCloseTo(0.3);
  expect(0.1 + 0.2).toBeCloseTo(0.3, 2);

  // These would fail with toBe()
  // expect(0.1 + 0.2).toBe(0.3); // This fails!

  // More examples
  expect(1.005).toBeCloseTo(1, 0);
  expect(1.005).toBeCloseTo(1.01, 1);
  expect(1.005).not.toBeCloseTo(1.01, 2);
}
```

## See Also

- [toBe()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobe) - Exact equality comparison
- [toBeGreaterThan()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobegreaterthan) - Numeric greater than comparison
- [toBeLessThan()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobelessthan) - Numeric less than comparison
- [toEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/toequal) - Deep equality comparison
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function
