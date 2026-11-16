---
title: 'toEqual()'
description: 'Asserts that two values are deeply equal'
weight: 31
---

# toEqual()

The `toEqual()` method asserts that the actual value is deeply equal to the expected value, performing recursive comparison of objects and arrays.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
expect(actual).toEqual(expected);
expect(actual).not.toEqual(expected);
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

The `toEqual()` method performs deep equality comparison, recursively checking all properties of objects and elements of arrays. Unlike `toBe()`, it compares the content of objects rather than their references.

Use `toEqual()` when you want to assert that two values have the same structure and content, even if they are different objects in memory.

## Usage

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  const user1 = { name: 'John', age: 30 };
  const user2 = { name: 'John', age: 30 };

  expect(user1).toEqual(user2);
  expect(user1).not.toBe(user2); // Different references
}
```

