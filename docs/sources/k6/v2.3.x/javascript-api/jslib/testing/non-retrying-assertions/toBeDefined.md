---
title: 'toBeDefined()'
description: 'Asserts that a value is defined (not undefined)'
weight: 37
---

# toBeDefined()

The `toBeDefined()` method asserts that a value is defined, meaning it is not `undefined`.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
expect(actual).toBeDefined();
expect(actual).not.toBeDefined();
```

## Returns

| Type | Description     |
| ---- | --------------- |
| void | No return value |

## Description

The `toBeDefined()` method checks if a value is defined (not `undefined`). It passes for all values except `undefined`, including `null`, `false`, `0`, empty strings, and empty objects/arrays.

## Usage

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  expect(null).toBeDefined();
  expect(false).toBeDefined();
  expect(0).toBeDefined();
  expect('').toBeDefined();
  expect([]).toBeDefined();
  expect({}).toBeDefined();
  expect(NaN).toBeDefined();
}
```

