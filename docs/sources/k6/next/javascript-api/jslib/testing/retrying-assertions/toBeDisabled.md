---
title: 'toBeDisabled()'
head_title: 'expect(locator).toBeDisabled()'
description: 'Asserts that an element is disabled'
weight: 20
---

# toBeDisabled()

The `toBeDisabled()` method asserts that an element is disabled. This is a retrying assertion that automatically waits for the element to become disabled.

## Syntax

```javascript
await expect(locator).toBeDisabled()
await expect(locator).not.toBeDisabled()
await expect(locator).toBeDisabled(options)
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

The `toBeDisabled()` method checks if an element is disabled. An element is considered disabled if it has the `disabled` attribute or property set to `true`.

This is a retrying assertion that will automatically re-check the element's disabled state until it becomes disabled or the timeout is reached.

## Usage

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const page = await browser.newPage();
  await page.goto('https://quickpizza.grafana.com/');
  
  // Click the pizza button to see the recommendation
  await page.locator('button[name="pizza-please"]').click();
  
  // Wait for the recommendation to appear
  await expect(page.locator('h2[id="pizza-name"]')).toBeVisible();
  
  // The pizza button should now be disabled (no longer clickable)
  await expect(page.locator('button[name="pizza-please"]')).toBeDisabled();
  
  // Verify that we can check for disabled state
  await expect(page.locator('button[name="pizza-please"]')).not.toBeEnabled();
}
```

## See Also

- [toBeEnabled()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobeenabled) - Assert element is enabled
- [toBeEditable()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobeeditable) - Assert element is editable
- [toBeVisible()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobevisible) - Assert element is visible
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function