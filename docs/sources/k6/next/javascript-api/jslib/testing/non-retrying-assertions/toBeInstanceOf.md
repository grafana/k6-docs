---
title: 'toBeInstanceOf()'
head_title: 'expect(actual).toBeInstanceOf(expected)'
description: 'Asserts that a value is an instance of a specific class or constructor'
weight: 50
---

# toBeInstanceOf()

The `toBeInstanceOf()` method asserts that a value is an instance of a specific class or constructor function.

## Syntax

```javascript
expect(actual).toBeInstanceOf(expected)
expect(actual).not.toBeInstanceOf(expected)
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| expected | Function | The constructor function or class to check against |

## Returns

| Type | Description |
| --- | --- |
| void | No return value |

## Description

The `toBeInstanceOf()` method uses the `instanceof` operator to check if the actual value is an instance of the expected constructor or class. It checks the prototype chain to determine if the constructor function appears anywhere in the object's prototype chain.

## Usage

```javascript
import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

class User {
  constructor(name) {
    this.name = name;
  }
}

export default function () {
  const response = http.get('https://quickpizza.grafana.com/');
  
  // Check response object types
  expect(response).toBeInstanceOf(Object);
  expect(response.headers).toBeInstanceOf(Object);
  
  // Check built-in types
  expect([1, 2, 3]).toBeInstanceOf(Array);
  expect(new Date()).toBeInstanceOf(Date);
  
  // Check custom classes
  const user = new User('John');
  expect(user).toBeInstanceOf(User);
  expect(user).not.toBeInstanceOf(Array);
}
```

## See Also

- [toBe()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobe) - Exact equality comparison
- [toEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/toequal) - Deep equality comparison
- [toBeNull()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobenull) - Assert value is null
- [toBeUndefined()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobeundefined) - Assert value is undefined
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function