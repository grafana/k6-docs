---
title: 'toBeUndefined()'
description: 'Asserts that a value is undefined'
weight: 47
---

# toBeUndefined()

The `toBeUndefined()` method asserts that a value is exactly `undefined`.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
expect(actual).toBeUndefined();
expect(actual).not.toBeUndefined();
```

## Returns

| Type | Description     |
| ---- | --------------- |
| void | No return value |

## Description

The `toBeUndefined()` method checks if a value is exactly `undefined`. It only passes for the `undefined` value and fails for all other values, including `null`, `false`, `0`, and empty strings.

## Usage

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  const user = {
    id: 123,
    name: 'John Doe',
    email: 'john@example.com',
  };

  // Check existing properties
  expect(user.id).not.toBeUndefined();
  expect(user.name).not.toBeUndefined();
  expect(user.email).not.toBeUndefined();

  // Check missing properties
  expect(user.phone).toBeUndefined();
  expect(user.address).toBeUndefined();

  // Basic undefined checks
  expect(undefined).toBeUndefined();
  expect(null).not.toBeUndefined();
  expect(false).not.toBeUndefined();
  expect(0).not.toBeUndefined();
}
```

