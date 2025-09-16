---
title: 'locator(selector[, options])'
description: 'Browser module: locator.locator(selector[, options]) method'
---

# locator(selector[, options])

The method finds all elements matching the selector and creates a new [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) that matches all of them. This method can be used to further refine the locator by chaining additional selectors.

This allows you to define locators relative to a parent locator, enabling more precise element targeting by creating nested locators.

<TableWithNestedRows>

| Parameter           | Type             | Default | Description                                                                                                                                                                                                                           |
| ------------------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector            | string           | `''`    | A selector to use when resolving a DOM element.                                                                                                                                                                                        |
| options             | object           | `null`  |                                                                                                                                                                                                                                       |
| options.hasText     | string or RegExp | `null`  | Matches only elements that contain the specified text. String or regular expression. Optional.                                                                                                                                       |
| options.hasNotText  | string or RegExp | `null`  | Matches only elements that do not contain the specified text. String or regular expression. Optional.                                                                                                                                |

</TableWithNestedRows>

### Returns

| Type                                                                                   | Description                                               |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A new chained `Locator` that can be used for further actions. |

### Example

{{< code >}}

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import { browser } from 'k6/browser';

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
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.setContent(`
      <div>
        <div data-testid="products">
          <div data-category="fruits">
            <div data-product="apple">
              <h3>Apple</h3>
              <button>Add to Cart</button>
              <button>View Details</button>
            </div>
          </div>
          <div data-category="fruits">
            <h3>Orange</h3>
            <button>Add to Cart</button>
            <button>View Details</button>
          </div>
          <div data-category="vegetables">
            <h3>Carrot</h3>
            <button>Add to Cart</button>
            <button>View Details</button>
          </div>
        </div>
      </div>
    `);

    // Use locator.locator to find specific products within the list
    const appleProduct = page.locator('div[data-product="apple"]');
    const addToCartButton = appleProduct.locator('//button[text()="Add to Cart"]');

    // Use locator.locator with options to find specific items
    const fruitsSection = page.locator('div[data-category="fruits"]');
    const orangeButton = fruitsSection.locator('button', { hasText: 'Add to Cart' });

    // Interact with the nested locators
    await addToCartButton.click();
    await orangeButton.click();
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
