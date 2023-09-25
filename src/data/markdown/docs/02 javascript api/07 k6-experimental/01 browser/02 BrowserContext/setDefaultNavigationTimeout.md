---
title: 'setDefaultNavigationTimeout(timeout)'
excerpt: 'Sets the default navigation timeout in milliseconds.'
---

Sets the default maximum navigation timeout for [Page.goto()](https://playwright.dev/docs/api/class-page#page-goto).

| Parameter | Type   | Default                  | Description                  |
|-----------|--------|--------------------------|------------------------------|
| timeout   | number | Dependent on the action. | The timeout in milliseconds. |


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
  context.setDefaultNavigationTimeout(1000); // 1s

  try {
    await page.goto('https://httpbin.test.k6.io/delay/5');
  } finally {
    page.close();
  }
}
```

</CodeGroup>
