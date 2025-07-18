---
title: 'toBeChecked()'
head_title: 'expect(locator).toBeChecked()'
description: 'Asserts that a checkbox or radio button is checked'
weight: 10
---

# toBeChecked()

The `toBeChecked()` method asserts that a checkbox or radio button is checked. This is a retrying assertion that automatically waits for the element to become checked.

## Syntax

```javascript
await expect(locator).toBeChecked()
await expect(locator).not.toBeChecked()
await expect(locator).toBeChecked(options)
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| options | [RetryConfig](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/retryconfig) | Optional configuration options |

## Returns

| Type | Description |
| --- | --- |
| Promise<void> | A promise that resolves when the assertion passes |

## Description

The `toBeChecked()` method checks if a checkbox or radio button is checked. This assertion is specifically designed for form elements that have a checked state.

This is a retrying assertion that will automatically re-check the element's state until it becomes checked or the timeout is reached.

## Usage

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const page = await browser.newPage();
  
  // Go to a test page that demonstrates checkbox functionality
  await page.goto('https://quickpizza.grafana.com');
  
  // Check a checkbox
  await page.locator('#accept-terms').check();
  await expect(page.locator('#accept-terms')).toBeChecked();
  
  // Check a radio button
  await page.locator('input[name="gender"][value="male"]').check();
  await expect(page.locator('input[name="gender"][value="male"]')).toBeChecked();
  
  // Verify another option is not checked
  await expect(page.locator('input[name="gender"][value="female"]')).not.toBeChecked();
}
```

## See Also

- [toBeEnabled()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobeenabled) - Assert element is enabled
- [toBeVisible()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobevisible) - Assert element is visible
- [toHaveValue()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tohavevalue) - Assert element has specific value
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function