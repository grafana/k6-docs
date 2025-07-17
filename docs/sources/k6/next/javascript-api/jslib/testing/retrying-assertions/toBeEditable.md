---
title: 'toBeEditable()'
head_title: 'expect(locator).toBeEditable()'
description: 'Asserts that an element is editable'
weight: 30
---

# toBeEditable()

The `toBeEditable()` method asserts that an element is editable. This is a retrying assertion that automatically waits for the element to become editable.

## Syntax

```javascript
await expect(locator).toBeEditable()
await expect(locator).not.toBeEditable()
await expect(locator).toBeEditable(options)
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

The `toBeEditable()` method checks if an element is editable. An element is considered editable if it can receive user input. This includes:
- Input fields that are not disabled or readonly
- Textareas that are not disabled or readonly
- Elements with `contenteditable="true"`

This is a retrying assertion that will automatically re-check the element's editable state until it becomes editable or the timeout is reached.

## Usage

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const page = await browser.newPage();
  
  // Go to a test page that demonstrates editable functionality
  await page.goto('https://quickpizza.grafana.com/login');
  
  // Check that input fields are editable
  await expect(page.locator('#username')).toBeEditable();
  await expect(page.locator('#password')).toBeEditable();
  await expect(page.locator('#message')).toBeEditable();
  
  // Check readonly field is not editable
  await expect(page.locator('#readonly-field')).not.toBeEditable();
  
  // Check contenteditable elements
  await expect(page.locator('[contenteditable="true"]')).toBeEditable();
  await expect(page.locator('[contenteditable="false"]')).not.toBeEditable();
}
```

## See Also

- [toBeEnabled()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobeenabled) - Assert element is enabled
- [toBeDisabled()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobedisabled) - Assert element is disabled
- [toBeVisible()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobevisible) - Assert element is visible
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function