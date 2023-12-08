---
title: 'page.$(selector)'
excerpt: 'Browser module: page.$(selector) method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/page/page-dollar/
---

<Blockquote mod="warning" title="">

Use locator-based [`page.locator(selector)`](/javascript-api/k6-experimental/browser/page/locator/) instead.

</Blockquote>

The method finds an element matching the specified selector within the page. If no elements match the selector, the return value resolves to `null`. To wait for an element on the page, use [locator.waitFor([options])](/javascript-api/k6-experimental/browser/locator/waitfor/).

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| null \| [ElementHandle](/javascript-api/k6-experimental/browser/elementhandle/)              | Returns `ElementHandle` when a matching element is found. Else, it returns `null`.        |

### Example

<CodeGroup labels={[]}>

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
}

export default async function () {
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.$('#text1').type('hello world');
}
```

</CodeGroup>