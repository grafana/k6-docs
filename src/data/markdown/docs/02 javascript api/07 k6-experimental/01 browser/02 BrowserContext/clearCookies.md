---
title: 'clearCookies()'
excerpt: 'Clears context cookies.'
---

Clears the `BrowserContext`'s cookies.

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
  const page = context.newPage();

  await page.goto('https://test.k6.io/');
  context.clearCookies();
}
```

</CodeGroup>
