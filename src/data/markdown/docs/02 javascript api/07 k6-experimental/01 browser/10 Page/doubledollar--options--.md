---
title: 'page.$$(selector)'
excerpt: 'Browser module: page.$$(selector) method'
---

<Blockquote mod="warning" title="">

Use locator-based [`page.locator(selector)`](/javascript-api/k6-experimental/browser/page/locator/) instead.

</Blockquote>

The method finds all elements matching the specified selector within the page. If no elements match the selector, the return value resolves to `[]`.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| null \| [ElementHandle](/javascript-api/k6-experimental/browser/elementhandle/)[]              | Returns an array of `ElementHandle` when multiple elements are found. Else, it returns `null`.        |

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
  page.$$('#text1')[0].type('hello world');
}
```

</CodeGroup>