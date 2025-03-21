---
title: 'closeContext()'
description: 'Browser module: close context method'
---

Closes the current [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext). If there is no active browser context, because none has been created yet or because it has been previously closed, this method throws an error.

### Example

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
  const page1 = browser.newPage({
    isMobile: true,
  }); // implicitly creates a new context

  await page1.goto('https:/test.k6.io/');
  page1.close();
  browser.closeContext(); // closes the context created on newPage

  const page2 = browser.newPage({
    isMobile: false,
  }); // creates a new context with different settings

  await page2.goto('https://test.k6.io/');
  page2.close();
  browser.closeContext();

  browser.closeContext(); // throws an error as browser has no active context
}
```
