---
title: 'toBeNull()'
description: 'Asserts that a value is null'
weight: 46
---

# toBeNull()

The `toBeNull()` method asserts that a value is exactly `null`.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
expect(actual).toBeNull();
expect(actual).not.toBeNull();
```

## Returns

| Type | Description     |
| ---- | --------------- |
| void | No return value |

## Description

The `toBeNull()` method checks if a value is exactly `null`. It only passes for the `null` value and fails for all other values, including `undefined`, `false`, `0`, and empty strings.

## Usage

<!-- md-k6:skip -->

```javascript
import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  const response = http.get('https://quickpizza.grafana.com/');

  // Check for null values in response
  const maybeNull = null;
  if (maybeNull === null) {
    expect(maybeNull).toBeNull();
  }

  // Check that required fields are not null
  expect(response.body).not.toBeNull();
  expect(response.status).not.toBeNull();

  // Basic null checks
  expect(null).toBeNull();
  expect(undefined).not.toBeNull();
  expect(false).not.toBeNull();
  expect(0).not.toBeNull();
}
```

