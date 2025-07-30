---
title: 'toHaveText()'
description: 'Asserts that an element has specific text content'
weight: 51
---

# toHaveText()

The `toHaveText()` method asserts that an element has specific text content. This is a retrying assertion that automatically waits for the element to have the expected text.

## Syntax

<!-- eslint-skip -->

```javascript
await expect(locator).toHaveText(expected);
await expect(locator).not.toHaveText(expected);
await expect(locator).toHaveText(expected, options);
```

## Parameters

| Parameter | Type                      | Description                    |
| --------- | ------------------------- | ------------------------------ |
| expected  | string \| RegExp \| Array | The expected text content      |
| options   | object                    | Optional configuration options |

### Options

This method accepts all [RetryConfig](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/retryconfig) properties plus:

| Property     | Type    | Default | Description                          |
| ------------ | ------- | ------- | ------------------------------------ |
| useInnerText | boolean | `false` | Use innerText instead of textContent |

## Returns

| Type          | Description                                       |
| ------------- | ------------------------------------------------- |
| Promise<void> | A promise that resolves when the assertion passes |

## Description

The `toHaveText()` method checks if an element has specific text content. By default, it uses `textContent` which includes all text nodes, including hidden ones. When `useInnerText` is true, it uses `innerText` which only includes visible text.

This is a retrying assertion that will automatically re-check the element's text content until it matches the expected value or the timeout is reached.

## Usage

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const page = await browser.newPage();
  await page.goto('https://quickpizza.grafana.com/');

  // Check exact text content
  await expect(page.locator('h1')).toHaveText('Looking to break out of your pizza routine?');

  // Click the pizza button to get a recommendation
  await page.locator('button[name="pizza-please"]').click();

  // Check the recommendation header text
  await expect(page.locator('h2')).toHaveText('QuickPizza has your back!');
}
```

