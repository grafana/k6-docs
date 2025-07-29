---
title: 'toBeDefined()'
description: 'Asserts that a value is defined (not undefined)'
weight: 37
---

# toBeDefined()

The `toBeDefined()` method asserts that a value is defined, meaning it is not `undefined`.

## Syntax

<!-- eslint-skip -->

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

## See Also

- [toBeUndefined()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobeundefined) - Assert value is undefined
- [toBeNull()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobenull) - Assert value is null
- [toBeTruthy()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobetruthy) - Assert value is truthy
- [toBeFalsy()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobefalsy) - Assert value is falsy
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function
