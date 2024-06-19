---
title: 'setOffline(offline)'
description: "Toggles the BrowserContext's connectivity on/off."
---

# setOffline(offline)

Toggles the [browser context](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext)'s connectivity on/off.

| Parameter | Type    | Default | Description                                                                                 |
| --------- | ------- | ------- | ------------------------------------------------------------------------------------------- |
| offline   | boolean | `false` | Whether to emulate the [browser context](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) being disconnected (`true`) or connected (`false`). |

### Returns

| Type            | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the connectivity has been set. |

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

export default async function () {
  const context = await browser.newContext();

  await context.setOffline(true);

  const page = await context.newPage();

  try {
    // Will not be able to load the page
    await page.goto('https://test.k6.io/browser.php');
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
