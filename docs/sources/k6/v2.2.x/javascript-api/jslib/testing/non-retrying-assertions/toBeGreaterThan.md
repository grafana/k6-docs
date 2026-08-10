---
title: 'toBeGreaterThan()'
description: 'Asserts that a numeric value is greater than another value'
weight: 40
---

# toBeGreaterThan()

The `toBeGreaterThan()` method asserts that a numeric value is greater than another value.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
expect(actual).toBeGreaterThan(expected);
expect(actual).not.toBeGreaterThan(expected);
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

The `toBeGreaterThan()` method performs a numeric comparison using the `>` operator. Both values must be numbers, or the assertion will fail.

## Usage

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  expect(5).toBeGreaterThan(3);
  expect(10.5).toBeGreaterThan(10);
  expect(-1).toBeGreaterThan(-5);
  expect(0).toBeGreaterThan(-1);
}
```

