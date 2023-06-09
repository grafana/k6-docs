---
title: 'contexts()'
excerpt: 'Browser module: contexts method'
---

Access all open [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/)s.

### Returns

| Type  | Description                                                                    |
| ----- | ------------------------------------------------------------------------------ |
| Array | Array of [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) objects |


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
}

export default function () {
  console.log(browser.contexts().length); // 0

  const context = browser.newContext();
  console.log(browser.contexts().length); // 1

  context.close();
}
```
