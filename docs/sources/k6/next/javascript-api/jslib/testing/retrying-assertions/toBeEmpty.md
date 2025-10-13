---
title: 'toBeEmpty()'
description: 'Asserts that an element is empty'
weight: 35
---

# toBeEmpty()

The `toBeEmpty()` method asserts that an element is empty. It automatically retries the assertion until the element becomes empty or the timeout is reached.

## Syntax

<!-- eslint-skip -->
<!-- md-k6:skip -->

```javascript
await expect(locator).toBeEmpty();
await expect(locator).not.toBeEmpty();
await expect(locator).toBeEmpty(options);
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

The `toBeEmpty()` method checks if an element is empty. An element is considered empty if:

- For input elements: the value is an empty string (`""`)
- For other elements: the text content is empty (no visible text)

This is a retrying assertion that will automatically re-check the element's content until it becomes empty or the timeout is reached.

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

  // Click on the advanced checkbox
  await page.locator('label div').click();

  // Check that an input field is empty
  await expect(page.locator('#pizza-name')).toBeEmpty();

  // Fill input and then verify it's not empty
  await page.locator('#pizza-name').fill('my pizza');
  await expect(page.locator('#pizza-name')).not.toBeEmpty();
}
```

