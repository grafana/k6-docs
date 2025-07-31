---
title: 'toBeHidden()'
description: 'Asserts that an element is hidden on the page'
weight: 40
---

# toBeHidden()

The `toBeHidden()` method asserts that an element is hidden on the page. This is a retrying assertion that automatically waits for the element to become hidden.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
await expect(locator).toBeHidden();
await expect(locator).not.toBeHidden();
await expect(locator).toBeHidden(options);
```

## Parameters

| Parameter | Type                                                                                                                    | Description                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| options   | [RetryConfig](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/retryconfig) | Optional configuration options |

## Returns

| Type          | Description                                       |
| ------------- | ------------------------------------------------- |
| Promise<void> | A promise that resolves when the assertion passes |

## Description

The `toBeHidden()` method checks if an element is hidden on the page. An element is considered hidden if:

- It does not exist in the DOM
- It has zero dimensions
- It is hidden by CSS (`display: none`, `visibility: hidden`, etc.)
- It is outside the viewport bounds

This is a retrying assertion that will automatically re-check the element's visibility until it becomes hidden or the timeout is reached.

## Usage

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const page = await browser.newPage();
  await page.goto('https://quickpizza.grafana.com/');

  // Check that non-existent elements are hidden
  await expect(page.locator('.error-message')).toBeHidden();
  await expect(page.locator('.loading-spinner')).toBeHidden();

  // Click the pizza button to show the recommendation
  await page.locator('button[name="pizza-please"]').click();

  // Wait for the recommendation to appear
  await expect(page.locator('h2[id="pizza-name"]')).not.toBeHidden();

  // Verify the button is no longer visible after clicking
  await expect(page.locator('button[name="pizza-please"]')).toBeHidden();
}
```

