---
title: 'filter(options)'
description: 'Browser module: locator.filter method'
---

# filter(options)

Returns a new [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) that matches only elements containing or excluding specified text.

<TableWithNestedRows>

| Parameter          | Type             | Default | Description                                                                                           |
| ------------------ | ---------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| options            | object           | `null`  | If not provided, the method behaves like a no-op and returns a locator identical to the original one. |
| options.hasText    | string or RegExp | `null`  | Matches only elements that contain the specified text. String or regular expression. Optional.        |
| options.hasNotText | string or RegExp | `null`  | Matches only elements that do not contain the specified text. String or regular expression. Optional. |

</TableWithNestedRows>

### Returns

| Type                                                                                   | Description                                               |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A new filtered `Locator` that can be chained with other methods. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

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

  await page.setContent(`
    <ul>
      <li>
        <h3>Product 1</h3>
        <button>Add to cart 1</button>
      </li>
      <li>
        <h3>Product 2</h3>
        <button>Add to cart 2</button>
      </li>
    </ul>
  `);

  // Filter list items that contain "Product 2" text
  const product2Item = page
    .locator('li')
    .filter({ hasText: 'Product 2' })
    .first();

  const product2Text = await product2Item.textContent();
  console.log(product2Text); // Contains "Product 2" and "Add to cart 2"

  // Filter list items that do NOT contain "Product 2" using regex
  const product1Item = page
    .locator('li')
    .filter({ hasNotText: /Product 2/ })
    .first();

  const product1Text = await product1Item.textContent();
  console.log(product1Text); // Contains "Product 1" and "Add to cart 1"

  await page.close();
}
```

{{< /code >}}