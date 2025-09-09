---
title: 'locator(selector)'
description: 'Browser module: locator.locator method'
---

# locator(selector)

The method finds all elements matching the selector and creates a new [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) that matches all of them. This method can be used to further refine the locator by chaining additional selectors.

This allows you to define locators relative to a parent locator, enabling more precise element targeting by creating nested locators.

### Returns

| Type                                                                                   | Description                                              |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | The new `Locator` associated with the selector. |

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
      
    // Interact with the nested locators
    await addToCartButton.click();
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
