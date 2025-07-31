---
title: 'toBeEnabled()'
description: 'Asserts that an element is enabled and interactive'
weight: 53
---

# toBeEnabled()

The `toBeEnabled()` method asserts that an element is enabled and interactive. This is a retrying assertion that automatically waits for the element to become enabled.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
await expect(locator).toBeEnabled();
await expect(locator).not.toBeEnabled();
await expect(locator).toBeEnabled(options);
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

The `toBeEnabled()` method checks if an element is enabled and interactive. An element is considered enabled if:

- It exists in the DOM
- It does not have the `disabled` attribute
- It is not disabled through CSS or JavaScript
- It can receive user interactions

This is a retrying assertion that will automatically re-check the element's enabled state until it becomes enabled or the timeout is reached.

## Usage

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const page = await browser.newPage();
  await page.goto('https://quickpizza.grafana.com/');

  // Check that the pizza button is enabled
  await expect(page.locator('button[name="pizza-please"]')).toBeEnabled();

  // Check that buttons are generally enabled on the page
  await expect(page.locator('button')).toBeEnabled();
}
```

