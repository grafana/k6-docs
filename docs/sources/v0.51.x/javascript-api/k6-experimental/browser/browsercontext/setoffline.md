---
title: 'setOffline(offline)'
description: "Toggles the BrowserContext's connectivity on/off."
---

# setOffline(offline)

Toggles the `BrowserContext`'s connectivity on/off.

| Parameter | Type    | Default | Description                                                                                 |
| --------- | ------- | ------- | ------------------------------------------------------------------------------------------- |
| offline   | boolean | `false` | Whether to emulate the `BrowserContext` being disconnected (`true`) or connected (`false`). |

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

export default async function () {
  const context = browser.newContext();

  context.setOffline(true);

  const page = context.newPage();

  try {
    // Will not be able to load the page
    await page.goto('https://test.k6.io/browser.php');
  } finally {
    page.close();
  }
}
```

{{< /code >}}
