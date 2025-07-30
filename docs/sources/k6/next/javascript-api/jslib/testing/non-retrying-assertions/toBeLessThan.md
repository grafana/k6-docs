---
title: 'toBeLessThan()'
description: 'Asserts that a numeric value is less than another value'
weight: 45
---

# toBeLessThan()

The `toBeLessThan()` method asserts that a numeric value is less than another value.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
expect(actual).toBeLessThan(expected);
expect(actual).not.toBeLessThan(expected);
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

The `toBeLessThan()` method performs a numeric comparison using the `<` operator. Both values must be numbers, or the assertion will fail.

## Usage

<!-- md-k6:skip -->

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

