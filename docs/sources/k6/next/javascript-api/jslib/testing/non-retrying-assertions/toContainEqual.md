---
title: 'toContainEqual()'
description: 'Asserts that an array or set contains an element that is deeply equal to the expected value'
weight: 48
---

# toContainEqual()

The `toContainEqual()` method asserts that an array or set contains an element that is deeply equal to the expected value, using the same equality logic as `toEqual()`.

## Syntax

<!-- eslint-skip -->

```javascript
expect(actual).toContainEqual(expected);
expect(actual).not.toContainEqual(expected);
```

## Parameters

| Parameter | Type | Description                                 |
| --------- | ---- | ------------------------------------------- |
| expected  | any  | The value to search for using deep equality |

## Returns

| Type | Description     |
| ---- | --------------- |
| void | No return value |

## Description

The `toContainEqual()` method checks if an array or set contains an element that is deeply equal to the expected value. Unlike `toContain()`, which uses strict equality (`===`), `toContainEqual()` performs deep equality comparison, making it suitable for finding objects with matching content even if they are different instances.

## Usage

```javascript
import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  const response = http.get('https://quickpizza.grafana.com/');

  // Create test data to demonstrate toContainEqual
  const pizzaOptions = [
    { name: 'Margherita', toppings: ['tomato', 'mozzarella'] },
    { name: 'Pepperoni', toppings: ['tomato', 'mozzarella', 'pepperoni'] },
    { name: 'Veggie', toppings: ['tomato', 'mozzarella', 'peppers'] },
  ];

  // Check if array contains specific pizza objects
  expect(pizzaOptions).toContainEqual({
    name: 'Margherita',
    toppings: ['tomato', 'mozzarella'],
  });

  // Works with various data types
  const mixedArray = ['string', 123, { key: 'value' }, [1, 2, 3]];
  expect(mixedArray).toContainEqual({ key: 'value' });
  expect(mixedArray).toContainEqual([1, 2, 3]);
  expect(mixedArray).not.toContainEqual({ key: 'different' });
}
```

## See Also

- [toContain()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tocontain) - Array/string contains value with strict equality
- [toEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/toequal) - Deep equality comparison
- [toHaveLength()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tohavelength) - Assert array/string length
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function
