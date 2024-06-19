---
title: 'page.$(selector)'
slug: 'page-dollar'
description: 'Browser module: page.$(selector) method'
---

# page.$(selector)

{{% admonition type="warning" %}}

Use locator-based [`page.locator(selector)`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/locator/) instead.

{{% /admonition %}}

The method finds an element matching the specified selector within the page. If no elements match the selector, the return value resolves to `null`. To wait for an element on the page, use [locator.waitFor([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/waitfor/).

### Returns

| Type                             | Description                                                                                                                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<ElementHandle \| null>` | A Promise that fulfills with the [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/)  of the selector when a matching element is found or `null`. |

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
  const text = await page
    .$('#text1')
    .then(text => text.type('hello world'));
}
```

{{< /code >}}
