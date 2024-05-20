---
title: 'clearPermissions()'
description: 'Clears all permission overrides for the BrowserContext.'
---

# clearPermissions()

Clears all permission overrides for the [browser context](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext).

### Returns

| Type            | Description                                                                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the permissions have been cleared from the [browser context](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext). |

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
  const context = await browser.newContext();
  await context.grantPermissions(['clipboard-read']);
  // do stuff ...
  await context.clearPermissions();
}
```

{{< /code >}}
