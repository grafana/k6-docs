---
title: 'toBeFalsy()'
description: 'Asserts that a value is falsy'
weight: 36
---

# toBeFalsy()

The `toBeFalsy()` method asserts that a value is falsy in JavaScript. A value is falsy if it converts to `false` when evaluated in a boolean context.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
expect(actual).toBeFalsy();
expect(actual).not.toBeFalsy();
```

## Returns

| Type | Description     |
| ---- | --------------- |
| void | No return value |

## Description

The `toBeFalsy()` method checks if a value is falsy. In JavaScript, the following values are falsy:

- `false`
- `0`
- `-0`
- `0n` (BigInt)
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

All other values are truthy.

## Usage

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  expect(false).toBeFalsy();
  expect(0).toBeFalsy();
  expect(-0).toBeFalsy();
  expect(0n).toBeFalsy();
  expect('').toBeFalsy();
  expect(null).toBeFalsy();
  expect(undefined).toBeFalsy();
  expect(NaN).toBeFalsy();
}
```

