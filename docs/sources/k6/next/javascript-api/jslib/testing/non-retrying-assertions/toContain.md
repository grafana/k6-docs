---
title: 'toContain()'
description: 'Asserts that an array contains a specific item or a string contains a substring'
weight: 32
---

# toContain()

The `toContain()` method asserts that an array contains a specific item or a string contains a substring.

## Syntax

<!-- eslint-skip -->

```javascript
expect(actual).toContain(expected);
expect(actual).not.toContain(expected);
```

## Parameters

| Parameter | Type | Description             |
| --------- | ---- | ----------------------- |
| expected  | any  | The value to search for |

## Returns

| Type | Description     |
| ---- | --------------- |
| void | No return value |

## Description

The `toContain()` method checks if:

- An array contains a specific element (using `includes()`)
- A string contains a substring (using `includes()`)

For arrays, it uses strict equality (`===`) to match elements. For more complex object matching in arrays, use `toContainEqual()`.

## Usage

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  const numbers = [1, 2, 3, 4, 5];
  expect(numbers).toContain(3);
  expect(numbers).not.toContain(6);

  const fruits = ['apple', 'banana', 'orange'];
  expect(fruits).toContain('banana');
  expect(fruits).not.toContain('grape');
}
```

