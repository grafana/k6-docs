---
title: 'addCookies()'
excerpt: 'Clears context cookies.'
---

Adds cookies into the `BrowserContext`. All pages within this context will have these cookies installed.

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
  page.close();
}
```

</CodeGroup>
