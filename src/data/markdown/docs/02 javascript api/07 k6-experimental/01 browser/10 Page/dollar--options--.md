---
title: 'page.$(selector)'
excerpt: 'Browser module: page.$(selector) method'
---

<Blockquote mod="note" title="">

Use locator-based [`page.locator(selector)`](/javascript-api/k6-experimental/browser/page/locator/) instead.

</Blockquote>

The method finds an element matching the specified selector within the page. If no elements match the selector, the return value resolves to `null`. To wait for an element on the page, use [locator.waitFor([options])](/javascript-api/k6-experimental/browser/locator/waitfor/).

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.$('#text1').type('hello world');
}
```

</CodeGroup>