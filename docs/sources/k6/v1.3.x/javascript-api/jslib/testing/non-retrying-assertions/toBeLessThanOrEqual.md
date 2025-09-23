---
title: 'toBeLessThanOrEqual()'
description: 'Asserts that a numeric value is less than or equal to another value'
weight: 49
---

# toBeLessThanOrEqual()

The `toBeLessThanOrEqual()` method asserts that a numeric value is less than or equal to another value.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
expect(actual).toBeLessThanOrEqual(expected);
expect(actual).not.toBeLessThanOrEqual(expected);
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

The `toBeLessThanOrEqual()` method performs a numeric comparison using the `<=` operator. Both values must be numbers, or the assertion will fail.

## Usage

<!-- md-k6:skip -->

```javascript
import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  const response = http.get('https://quickpizza.grafana.com/');

  // Check response timing constraints
  expect(response.timings.duration).toBeLessThanOrEqual(2000); // Max 2 seconds
  expect(response.timings.waiting).toBeLessThanOrEqual(1500); // Max 1.5 seconds

  // Basic numeric comparisons
  expect(3).toBeLessThanOrEqual(5);
  expect(5).toBeLessThanOrEqual(5); // Equal values pass
  expect(10).not.toBeLessThanOrEqual(5);
}
```

