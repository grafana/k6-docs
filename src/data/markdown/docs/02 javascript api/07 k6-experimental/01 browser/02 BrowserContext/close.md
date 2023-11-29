---
title: 'close()'
excerpt: 'Close the BrowserContext and all its pages.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/browsercontext/close/
---

Close the `BrowserContext` and all its [page](/javascript-api/k6-experimental/browser/page/)s. The `BrowserContext` is unusable after this call and a new one must be created. This is typically called to cleanup before ending the test.


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