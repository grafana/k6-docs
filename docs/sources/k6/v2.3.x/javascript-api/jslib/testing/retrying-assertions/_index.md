---
title: 'Retrying Assertions'
description: 'Auto-retrying assertions that wait for conditions to become true'
weight: 50
---

# Retrying Assertions

Retrying assertions are asynchronous assertions that automatically retry until a condition becomes true or a timeout is reached. They are particularly useful for browser testing where elements may not be immediately available or when testing dynamic content that changes over time.

## Overview

Retrying assertions differ from [non-retrying assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/non-retrying-assertions) in that they:

- **Automatically retry** - They continuously check the condition until it passes or times out
- **Are asynchronous** - They return promises and must be `await`-ed
- **Have configurable timeouts** - You can set custom timeout and polling intervals
- **Are ideal for dynamic content** - Perfect for testing UI elements that appear/disappear or change over time

## When to Use Retrying Assertions

Retrying assertions are best suited for:

- **Browser testing** - Checking element visibility, text content, or state changes
- **Dynamic content** - Testing content that loads asynchronously
- **User interactions** - Verifying UI changes after clicks, form submissions, etc.
- **Loading states** - Waiting for spinners to disappear or content to appear
- **API polling** - Waiting for external systems to reach expected states

## Usage

All retrying assertions must be awaited since they return promises:

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

  // Wait for element to become visible
  await expect(page.locator('h1')).toBeVisible();

  // Wait for specific text content
  await expect(page.locator('h1')).toHaveText('Looking to break out of your pizza routine?');

  // Wait for element to be enabled
  await expect(page.locator('button[name="pizza-please"]')).toBeEnabled();
}
```

## Configuration

You can configure timeout and polling behavior by creating a configured expect instance or per assertion:

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

// Create configured expect instance
const slowExpect = expect.configure({
  timeout: 10000, // 10 seconds timeout
  interval: 200, // Check every 200ms
});

export default async function () {
  const page = await browser.newPage();
  await page.goto('https://quickpizza.grafana.com/');

  // Use configured timeout
  await slowExpect(page.locator('h1')).toBeVisible();

  // Override timeout for specific assertion
  await slowExpect(page.locator('button[name="pizza-please"]')).toBeVisible({
    timeout: 30000,
  });

  // Original expect instance still available with defaults
  await expect(page.locator('h1')).toBeVisible();
}
```

## Available Retrying Assertions

| Method                                                                                                                            | Description                          |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [toBeVisible()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/tobevisible)         | Element is visible on the page       |
| [toBeHidden()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/tobehidden)           | Element is hidden or not visible     |
| [toBeEnabled()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/tobeenabled)         | Element is enabled and interactive   |
| [toBeDisabled()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/tobedisabled)       | Element is disabled                  |
| [toBeChecked()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/tobechecked)         | Checkbox or radio button is checked  |
| [toBeEditable()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/tobeeditable)       | Element is editable                  |
| [toBeEmpty()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/tobeempty)             | Element is empty                     |
| [toHaveText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/tohavetext)           | Element has specific text content    |
| [toContainText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/tocontaintext)     | Element contains specific text       |
| [toHaveValue()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/tohavevalue)         | Input element has specific value     |
| [toHaveAttribute()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/tohaveattribute) | Element has specific attribute value |
| [toHaveTitle()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/tohavetitle)         | Page has specific title              |


{{< section >}}
