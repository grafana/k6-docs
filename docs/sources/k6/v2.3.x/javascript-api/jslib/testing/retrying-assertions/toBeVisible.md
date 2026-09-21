---
title: 'toBeVisible()'
description: 'Asserts that an element is visible on the page'
weight: 50
---

# toBeVisible()

The `toBeVisible()` method asserts that an element is visible on the page. This is a retrying assertion that automatically waits for the element to become visible.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
await expect(locator).toBeVisible();
await expect(locator).not.toBeVisible();
await expect(locator).toBeVisible(options);
```

## Parameters

| Parameter | Type                                                                                                                    | Description                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| options   | [RetryConfig](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/retryconfig) | Optional configuration options |

## Returns

| Type          | Description                                       |
| ------------- | ------------------------------------------------- |
| Promise<void> | A promise that resolves when the assertion passes |

## Description

The `toBeVisible()` method checks if an element is visible on the page. An element is considered visible if:

- It exists in the DOM
- It has non-zero dimensions
- It is not hidden by CSS (`display: none`, `visibility: hidden`, etc.)
- It is not outside the viewport bounds

This is a retrying assertion that will automatically re-check the element's visibility until it becomes visible or the timeout is reached.

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
  await page.goto('https://quickpizza.grafana.com/');

  // Wait for element to be visible
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('button[name="pizza-please"]')).toBeVisible();
}
```

