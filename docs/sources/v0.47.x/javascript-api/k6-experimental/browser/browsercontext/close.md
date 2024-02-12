---
title: 'close()'
description: 'Close the BrowserContext and all its pages.'
---

# close()

Close the `BrowserContext` and all its [page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/)s. The `BrowserContext` is unusable after this call and a new one must be created. This is typically called to cleanup before ending the test.

### Example

{{< code >}}

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

export default function () {
  const context = browser.newContext();
  context.newPage();

  context.close();
}
```

{{< /code >}}
