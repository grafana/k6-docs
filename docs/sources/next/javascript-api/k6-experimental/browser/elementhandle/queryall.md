---
title: '$$(selector)'
description: 'Browser module: elementHandle.$$ method'
---

# $$(selector)

Queries the elements for the given selector in the [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle)'s subtree.

<TableWithNestedRows>

| Parameter | Type     | Default | Description                           |
| --------- | -------- | ------- | ------------------------------------- |
| selector  | `string` |         | A selector to query the elements for. |

</TableWithNestedRows>

### Returns

| Type                               | Description                                                                                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Promise<null \| ElementHandle[]>` | A Promise that fulfills with an [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle) array for the elements found. If no element is found, the Promise resolves to `null`. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    browser: {
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

  await page.goto('https://test.k6.io/browser.php');
  const elements = await page.$$('#text1');
  for (const element of elements) {
    // ...
  }

  page.close();
}
```

{{< /code >}}