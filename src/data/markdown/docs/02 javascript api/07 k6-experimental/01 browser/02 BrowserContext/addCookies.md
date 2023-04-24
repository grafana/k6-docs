---
title: 'addCookies()'
excerpt: 'Clears context cookies.'
---

Adds cookies into the `BrowserContext`. All pages within this context will have these cookies installed.

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const context = browser.newContext();

  context.addCookies([
    {
      name: 'myCookie',
      value: 'hello world',
      url: 'https://test.k6.io/',
    },
  ]);

  const page = context.newPage();
  await page.goto('https://test.k6.io/');
}
```

</CodeGroup>
