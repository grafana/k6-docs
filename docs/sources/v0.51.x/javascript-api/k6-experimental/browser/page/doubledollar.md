---
title: 'page.$$(selector)'
slug: 'page-doubledollar'
description: 'Browser module: page.$$(selector) method'
---

# page.$$(selector)

{{% admonition type="warning" %}}

Use locator-based [`page.locator(selector)`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/locator/) instead.

{{% /admonition %}}

The method finds all elements matching the specified selector within the page. If no elements match the selector, the return value resolves to `[]`.

### Returns

| Type                                                                                                              | Description                       |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/elementhandle/)[] | Returns an `ElementHandle` array. |

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
  const page = browser.newPage();

  await page.goto('https://test.k6.io/browser.php');
  page.$$('#text1')[0].type('hello world');
}
```

{{< /code >}}
