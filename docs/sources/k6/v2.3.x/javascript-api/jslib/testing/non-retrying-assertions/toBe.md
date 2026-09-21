---
title: 'toBe()'
description: 'Asserts that two values are exactly equal using Object.is() comparison'
weight: 30
---

# toBe()

The `toBe()` method asserts that the actual value is exactly equal to the expected value using `Object.is()` comparison.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
expect(actual).toBe(expected);
expect(actual).not.toBe(expected);
```

## Parameters

| Parameter | Type | Description        |
| --------- | ---- | ------------------ |
| expected  | any  | The expected value |

## Returns

| Type | Description     |
| ---- | --------------- |
| void | No return value |

## Description

The `toBe()` method performs exact equality comparison using `Object.is()`. This means it checks for strict equality and handles special cases like `NaN` and `-0` correctly.

Use `toBe()` when you want to assert that two values are the same reference or primitive value. For object comparison, use `toEqual()` instead.

## Usage

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  expect(42).toBe(42);
  expect('hello').toBe('hello');
  expect(true).toBe(true);
  expect(null).toBe(null);
  expect(undefined).toBe(undefined);
}
```

