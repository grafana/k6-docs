---
title: 'nth(number)'
description: 'Browser module: locator.nth method'
---

# nth(number)

Returns a [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) to the n-th matching element. The method is zero-based; for example, `nth(0)` selects the first element.

### Returns

| Type                                                                                   | Description                                              |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | The n-th element `Locator` associated with the selector. |

### Example

{{< code >}}

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/0.4.0/index.js';
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
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
  const page = await browser.newPage();
  await page.goto('https://quickpizza.grafana.com');

  await expect(await page.locator('p').nth(4)).toContainText('QuickPizza Labs.');

  await page.close();
}
```

{{< /code >}}
