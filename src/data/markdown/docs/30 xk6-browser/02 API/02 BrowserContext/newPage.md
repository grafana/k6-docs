---
title: 'newPage()'
excerpt: 'Creates a new page inside this BrowserContext.'
---

Uses the `BrowserContext` to create a new [Page](/javascript-api/xk6-browser/api/page/) and returns it.


### Returns

| Type   | Description                                             |
| ------ | ------------------------------------------------------- |
| object | A new [Page](/javascript-api/xk6-browser/api/page/) object. |


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch();
  const context = browser.newContext();
  const page = context.newPage();

  page
    .goto('https://test.k6.io/browser.php', {
      waitUntil: 'networkidle',
    })
    .finally(() => {
      page.close();
      browser.close();
    });
}
```

</CodeGroup>