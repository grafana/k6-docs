---
title: 'toHaveValue()'
description: 'Asserts that an element has a specific value'
weight: 70
---

# toHaveValue()

The `toHaveValue()` method asserts that an element has a specific value. This is a retrying assertion that automatically waits for the element to have the expected value.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
await expect(locator).toHaveValue(value);
await expect(locator).not.toHaveValue(value);
await expect(locator).toHaveValue(value, options);
```

## Parameters

| Parameter | Type                                                                                                                    | Description                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| value     | string                                                                                                                  | The expected value             |
| options   | [RetryConfig](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/retryconfig) | Optional configuration options |

## Returns

| Type            | Description                                       |
| --------------- | ------------------------------------------------- |
| `Promise<void>` | A promise that resolves when the assertion passes |

## Description

The `toHaveValue()` method checks if an element has a specific value. This is primarily used for form elements like input fields, textareas, and select elements. The method compares the element's current value with the expected value.

This is a retrying assertion that will automatically re-check the element's value until it matches the expected value or the timeout is reached.

## Usage

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  }
};

export default async function () {
  const page = await browser.newPage();

  // Go to a test page that demonstrates input functionality
  await page.goto('https://quickpizza.grafana.com/login');

  // Fill input and check value
  await page.locator('#username').fill('testuser');
  await expect(page.locator('#username')).toHaveValue('testuser');

  // Check textarea value
  await page.locator('#message').fill('Hello world!');
  await expect(page.locator('#message')).toHaveValue('Hello world!');

  // Check select option value
  await page.locator('#country').selectOption('us');
  await expect(page.locator('#country')).toHaveValue('us');

  // Check initial empty values
  await expect(page.locator('#empty-field')).toHaveValue('');

  // Check that field doesn't have specific value
  await expect(page.locator('#username')).not.toHaveValue('wronguser');
}
```

