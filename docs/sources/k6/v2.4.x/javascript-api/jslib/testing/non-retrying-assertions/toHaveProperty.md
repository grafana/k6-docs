---
title: 'toHaveProperty()'
description: 'Asserts that an object has a specific property, optionally with a specific value'
weight: 43
---

# toHaveProperty()

The `toHaveProperty()` method asserts that an object has a specific property, optionally with a specific value. It supports both simple property names and nested property paths.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
expect(actual).toHaveProperty(keyPath);
expect(actual).toHaveProperty(keyPath, value);
expect(actual).not.toHaveProperty(keyPath);
expect(actual).not.toHaveProperty(keyPath, value);
```

## Parameters

| Parameter | Type                    | Description                              |
| --------- | ----------------------- | ---------------------------------------- |
| keyPath   | string \| Array<string> | The property path to check               |
| value     | any                     | Optional expected value for the property |

## Returns

| Type | Description     |
| ---- | --------------- |
| void | No return value |

## Description

The `toHaveProperty()` method checks if an object has a specific property. The property path can be:

- A simple property name (e.g., `'name'`)
- A nested property path using dot notation (e.g., `'user.address.city'`)
- An array of property keys (e.g., `['user', 'address', 'city']`)

If a value is provided, it also checks that the property has that exact value.

## Usage

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  const user = {
    id: 123,
    name: 'John Doe',
    email: 'john@example.com',
    active: true,
  };

  // Check property existence
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('active');

  // Check missing property
  expect(user).not.toHaveProperty('phone');
  expect(user).not.toHaveProperty('address');
}
```

