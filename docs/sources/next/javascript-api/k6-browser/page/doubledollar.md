---
title: 'page.$$(selector)'
slug: 'page-doubledollar'
description: 'Browser module: page.$$(selector) method'
---

# page.$$(selector)

{{% admonition type="warning" %}}

Use locator-based [`page.locator(selector)`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/locator/) instead.

{{< /admonition >}}

The method finds all elements matching the specified selector within the page. If no elements match the selector, the return value resolves to `[]`.

### Returns

| Type                       | Description                                                                                                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<ElementHandle[]>` | A Promise that fulfills with the [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/elementhandle/) array of the selector when matching elements are found. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

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
  const text = await page.$$('#text1')[0];
  await text.type('hello world');
}
```

{{< /code >}}
