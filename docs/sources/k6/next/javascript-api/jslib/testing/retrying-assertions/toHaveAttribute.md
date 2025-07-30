---
title: 'toHaveAttribute()'
description: 'Asserts that an element has a specific attribute and optionally a specific value'
weight: 60
---

# toHaveAttribute()

The `toHaveAttribute()` method asserts that an element has a specific attribute and optionally a specific value. This is a retrying assertion that automatically waits for the element to have the expected attribute.

## Syntax

<!-- eslint-skip -->

```javascript
await expect(locator).toHaveAttribute(attribute);
await expect(locator).toHaveAttribute(attribute, value);
await expect(locator).toHaveAttribute(attribute, value, options);
await expect(locator).not.toHaveAttribute(attribute);
```

## Parameters

| Parameter | Type                                                                                                                    | Description                            |
| --------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| attribute | string                                                                                                                  | The attribute name to check for        |
| value     | string                                                                                                                  | Optional. The expected attribute value |
| options   | [RetryConfig](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/retryconfig) | Optional configuration options         |

## Returns

| Type          | Description                                       |
| ------------- | ------------------------------------------------- |
| Promise<void> | A promise that resolves when the assertion passes |

## Description

The `toHaveAttribute()` method checks if an element has a specific attribute. When called with just an attribute name, it verifies the attribute exists regardless of its value. When called with both attribute name and value, it verifies the attribute exists and has the exact specified value.

This is a retrying assertion that will automatically re-check the element's attributes until the condition is met or the timeout is reached.

## Usage

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const page = await browser.newPage();
  await page.goto('https://quickpizza.grafana.com/');

  // Check that the pizza button has specific attributes
  await expect(page.locator('button[name="pizza-please"]')).toHaveAttribute('name', 'pizza-please');
  await expect(page.locator('button[name="pizza-please"]')).toHaveAttribute('type', 'button');

  // Check that the main heading has expected attributes
  await expect(page.locator('h1')).toHaveAttribute('class');

  // Click the pizza button to get a recommendation
  await page.locator('button[name="pizza-please"]').click();

  // Check that the recommendation heading has an id attribute
  await expect(page.locator('h2[id="pizza-name"]')).toHaveAttribute('id', 'pizza-name');

  // Check absence of attribute on non-existent elements
  await expect(page.locator('h1')).not.toHaveAttribute('disabled');
}
```

