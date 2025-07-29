---
title: 'toHaveLength()'
description: 'Asserts that an object has a specific length property'
weight: 42
---

# toHaveLength()

The `toHaveLength()` method asserts that an object has a specific length property value. This is commonly used with arrays, strings, and other objects that have a length property.

## Syntax

<!-- eslint-skip -->

```javascript
expect(actual).toHaveLength(expected);
expect(actual).not.toHaveLength(expected);
```

## Parameters

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| expected  | number | The expected length value |

## Returns

| Type | Description     |
| ---- | --------------- |
| void | No return value |

## Description

The `toHaveLength()` method checks if an object has a `length` property that equals the expected value. It works with arrays, strings, and any object that has a numeric `length` property.

## Usage

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  const fruit = 'mango';

  expect(fruit).toHaveLength(5);
  expect(fruit).not.toHaveLength(2);
}
```

## See Also

- [toContain()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tocontain) - Assert array/string contains value
- [toEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/toequal) - Deep equality comparison
- [toBeGreaterThan()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobegreaterthan) - Numeric comparison
- [toBe()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobe) - Exact equality comparison
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function
