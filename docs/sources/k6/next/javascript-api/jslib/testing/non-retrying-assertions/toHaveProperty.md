---
title: 'toHaveProperty()'
head_title: 'expect(actual).toHaveProperty(keyPath, value)'
description: 'Asserts that an object has a specific property, optionally with a specific value'
weight: 43
---

# toHaveProperty()

The `toHaveProperty()` method asserts that an object has a specific property, optionally with a specific value. It supports both simple property names and nested property paths.

## Syntax

```javascript
expect(actual).toHaveProperty(keyPath)
expect(actual).toHaveProperty(keyPath, value)
expect(actual).not.toHaveProperty(keyPath)
expect(actual).not.toHaveProperty(keyPath, value)
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| keyPath | string \| Array<string> | The property path to check |
| value | any | Optional expected value for the property |

## Returns

| Type | Description |
| --- | --- |
| void | No return value |

## Description

The `toHaveProperty()` method checks if an object has a specific property. The property path can be:
- A simple property name (e.g., `'name'`)
- A nested property path using dot notation (e.g., `'user.address.city'`)
- An array of property keys (e.g., `['user', 'address', 'city']`)

If a value is provided, it also checks that the property has that exact value.

## Usage

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  const user = {
    id: 123,
    name: 'John Doe',
    email: 'john@example.com',
    active: true
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

## See Also

- [toBeDefined()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobedefined) - Assert value is defined
- [toEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/toequal) - Deep equality comparison
- [toContain()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tocontain) - Array/string containment
- [toBe()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobe) - Exact equality comparison
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function