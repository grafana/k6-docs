---
title: 'close()'
excerpt: 'Browser module: close method'
---

Closes the browser and all of its pages (if any were opened).

Once closed, the [browser module API](/javascript-api/k6-experimental/browser#browser-module-api) cannot be used anymore, and the browser is considered disposed of.


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

export default function () {
  const context = browser.newContext();
  context.newPage();
  context.close();
}
```

</CodeGroup>