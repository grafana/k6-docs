---
title: 'expect()'
description: 'expect() is the main function for creating assertions in k6 tests'
weight: 10
---

# expect()

The `expect()` function is the main entry point for creating assertions in the k6 testing library. It provides an intuitive API for both retrying and non-retrying assertions.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
expect(actual);
expect(actual, message);
```

## Parameters

| Parameter | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| actual    | any    | The value to test against     |
| message   | string | Optional custom error message |

## Returns

| Type        | Description                                  |
| ----------- | -------------------------------------------- |
| Expectation | An expectation object with assertion methods |

## Description

The `expect()` function wraps a value and returns an expectation object that provides assertion methods. The expectation object supports both retrying (that are asynchronous, and automatically retry until they pass or timeout) and non-retrying assertions (that are synchronous and evaluate immediately).

### Non-retrying assertions

Standard assertions evaluate immediately and do not retry:

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

expect(42).toBe(42);
expect([1, 2, 3]).toContain(2);
```

### Retrying Assertions

Retrying assertions automatically retry until they pass or timeout. These are particularly useful for browser testing where elements may not be immediately available:

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/experimental/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const page = browser.newPage();
  await page.goto('https://test.k6.io');

  // Auto-retrying assertions
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Welcome to the k6 test site');
}
```

### Negation

All assertions can be negated using the `.not` property:

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

expect(42).not.toBe(43);
expect('hello').not.toContain('world');
```

### Soft Assertions

By default, failed assertions will terminate the test execution. Soft assertions, on the other hand, don't terminate the test execution when they fail, but mark the test as failed, leading k6 to eventually exit with code `110`.

<!-- md-k6:skip -->

```javascript
import exec from 'k6/execution';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export const options = {
  vus: 2,
  iterations: 10,
};

export default function () {
  // Iteration 3 will mark the test as failed, but the test execution
  // will keep going until its end condition, and eventually exit with
  // code 110.
  if (exec.scenario.iterationInInstance === 3) {
    expect.soft(false).toBeTruthy();
  }
}
```

Note that soft assertions can be [configured](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/configure) to throw an exception (and effectively failing the iteration where it happens) instead.

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

// Configure soft mode globally
expect.configure({ softMode: 'continue' });

export default function () {
  // These assertions will not stop test execution on failure
  expect.soft(response.status).toBe(200);
  expect.soft(response.json()).toHaveProperty('data');
}
```

## Examples

### API Testing

<!-- md-k6:skip -->

```javascript
import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  const response = http.get('https://test-api.k6.io/public/crocodiles/1/');
  const data = response.json();

  // Basic assertions
  expect(response.status).toBe(200);
  expect(response.headers['Content-Type']).toContain('application/json');

  // Object assertions
  expect(data).toHaveProperty('id');
  expect(data.name).toBeDefined();
  expect(data.age).toBeGreaterThan(0);

  // With custom error message
  expect(data.status, 'Crocodile should be alive').toBe('alive');
}
```

### Browser Testing

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/experimental/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const page = browser.newPage();

  await page.goto('https://test.k6.io/my_messages.php');

  // Form interaction with assertions
  await expect(page.locator('#username')).toBeVisible();
  await page.locator('#username').fill('admin');
  await expect(page.locator('#username')).toHaveValue('admin');

  await page.locator('#password').fill('123');
  await page.locator('input[type="submit"]').click();

  // Verify navigation
  await expect(page.locator('h2')).toContainText('Welcome, admin!');
}
```

## Assertion methods

### Non-Retrying Assertions

| Method                                                                                                                                                      | Description                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [toBe(expected)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobe)                                     | Exact equality using Object.is()                                                                  |
| [toBeCloseTo(expected, precision?)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobecloseto)           | Floating point comparison                                                                         |
| [toBeDefined()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobedefined)                               | Value is not undefined                                                                            |
| [toBeFalsy()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobefalsy)                                   | Value is falsy                                                                                    |
| [toBeGreaterThan(expected)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobegreaterthan)               | Greater than comparison                                                                           |
| [toBeGreaterThanOrEqual(expected)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobegreaterthanorequal) | Greater than or equal comparison                                                                  |
| [toBeInstanceOf(expected)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobeinstanceof)                 | Value is an instance of a class                                                                   |
| [toBeLessThan(expected)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobelessthan)                     | Less than comparison                                                                              |
| [toBeLessThanOrEqual(expected)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobelessthanorequal)       | Less than or equal comparison                                                                     |
| [toBeNaN()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobenan)                                       | Value is NaN                                                                                      |
| [toBeNull()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobenull)                                     | Value is null                                                                                     |
| [toBeTruthy()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobetruthy)                                 | Value is truthy                                                                                   |
| [toBeUndefined()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobeundefined)                           | Value is undefined                                                                                |
| [toContain(expected)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tocontain)                           | Array/string contains value                                                                       |
| [toContainEqual(expected)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tocontainorequal)               | Array or Set contains a similar element                                                           |
| [toEqual(expected)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/toequal)                               | Deep equality comparison                                                                          |
| [toHaveLength(expected)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tohavelength)                     | Value has a expected length                                                                       |
| [toHaveProperty(path, expected?)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tohaveproperty)          | Property at provided path exists in the object and optionally checks that it is equal to expected |

### Retrying Assertions

| Method                                                                                                                                             | Description             |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| [toBeChecked(options?)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobechecked)                  | Checkbox is checked     |
| [toBeDisabled(options?)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobedisabled)                | Element is disabled     |
| [toBeEditable(options?)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobeeditable)                | Element is editable     |
| [toBeEnabled(options?)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobeenabled)                  | Element is enabled      |
| [toBeHidden(options?)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobehidden)                    | Element is hidden       |
| [toBeVisible(options?)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobevisible)                  | Element is visible      |
| [toContainText(text, options?)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tocontaintext)        | Element contains text   |
| [toHaveAttribute(attribute, value?)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tohaveattribute) | Element attribute value |
| [toHaveText(text, options?)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tohavetext)              | Element text content    |
| [toHaveValue(value)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tohavevalue)                     | Input element value     |

