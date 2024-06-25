---
title: 'isEnabled()'
description: 'Browser module: elementHandle.isEnabled method'
---

# isEnabled()

{{% admonition type="warning" %}}

Use [`locator.isEnabled([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/isenabled/) instead.

{{% /admonition %}}

Checks if the element is enabled.

### Returns

| Type            | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| `Promise<bool>` | A Promise that fulfills with `true` if the element is enabled, else `false`. |

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
  const page = await browser.newPage();
  await page.goto('https://test.k6.io/browser.php');

  const text = await page.$('#text1');
  const isEnabled = await text.isEnabled();
  if (isEnabled) {
    console.log('element is enabled');
  }

  await page.close();
}
```

{{< /code >}}
