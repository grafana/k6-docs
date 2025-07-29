---
title: 'toContainText()'
description: 'Asserts that an element contains specific text'
weight: 52
---

# toContainText()

The `toContainText()` method asserts that an element contains specific text as a substring. This is a retrying assertion that automatically waits for the element to contain the expected text.

## Syntax

<!-- eslint-skip -->

```javascript
await expect(locator).toContainText(expected);
await expect(locator).not.toContainText(expected);
await expect(locator).toContainText(expected, options);
```

## Parameters

| Parameter | Type             | Description                    |
| --------- | ---------------- | ------------------------------ |
| expected  | string \| RegExp | The text to search for         |
| options   | object           | Optional configuration options |

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

The `toContainText()` method checks if an element contains specific text as a substring. Unlike `toHaveText()`, which requires exact text matching, `toContainText()` succeeds if the expected text is found anywhere within the element's text content.

By default, it uses `textContent` which includes all text nodes, including hidden ones. When `useInnerText` is true, it uses `innerText` which only includes visible text.

This is a retrying assertion that will automatically re-check the element's text content until it contains the expected text or the timeout is reached.

## Usage

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const page = await browser.newPage();
  await page.goto('https://quickpizza.grafana.com/');

  // Check that elements contain expected text
  await expect(page.locator('h1')).toContainText('pizza');
  await expect(page.locator('h1')).toContainText('routine');

  // Click the pizza button to get a recommendation
  await page.locator('button[name="pizza-please"]').click();

  // Check that the recommendation contains expected text
  await expect(page.locator('h2')).toContainText('QuickPizza');
}
```

## See Also

- [toHaveText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tohavetext) - Assert exact text content
- [toBeVisible()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobevisible) - Assert element visibility

- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function
