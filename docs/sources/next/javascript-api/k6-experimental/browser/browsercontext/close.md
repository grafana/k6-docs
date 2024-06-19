---
title: 'close()'
description: 'Close the BrowserContext and all its pages.'
---

# close()

Close the [browser context](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) and all its [pages](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). The [browser context](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) is unusable after this call and a new one must be created. This is typically called to cleanup before ending the test.

### Returns

| Type            | Description                                                                                                                                                                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the [browser context](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) and all its [page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/)s have been closed. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

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
  const context = await browser.newContext();
  await context.newPage();

  await context.close();
}
```

{{< /code >}}
