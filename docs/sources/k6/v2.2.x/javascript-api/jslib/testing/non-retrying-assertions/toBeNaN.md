---
title: 'toBeNaN()'
description: 'Asserts that a value is NaN (Not a Number)'
weight: 51
---

# toBeNaN()

The `toBeNaN()` method asserts that a value is `NaN` (Not a Number).

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
expect(actual).toBeNaN();
expect(actual).not.toBeNaN();
```

## Returns

| Type | Description     |
| ---- | --------------- |
| void | No return value |

## Description

The `toBeNaN()` method checks if a value is exactly `NaN` using `Number.isNaN()`. It only passes for the `NaN` value and fails for all other values, including numbers, strings, and other falsy values.

## Usage

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  const formData = {
    age: '25',
    invalidNumber: 'not-a-number',
  };

  // Validate numeric conversions
  expect(Number(formData.age)).not.toBeNaN();
  expect(Number(formData.invalidNumber)).toBeNaN();

  // Mathematical operations that result in NaN
  expect(0 / 0).toBeNaN();
  expect(Math.sqrt(-1)).toBeNaN();
  expect(Infinity - Infinity).toBeNaN();

  // Valid numbers are not NaN
  expect(123).not.toBeNaN();
  expect(Infinity).not.toBeNaN();
  expect(1 / 0).not.toBeNaN(); // Infinity
}
```

