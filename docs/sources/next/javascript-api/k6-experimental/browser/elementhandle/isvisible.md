---
title: 'isVisible()'
description: 'Browser module: elementHandle.isVisible method'
---

# isVisible()

{{% admonition type="warning" %}}

Use [`locator.isVisible()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/isvisible/) instead.

{{% /admonition %}}

Checks if the element is visible.

### Returns

| Type            | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| `Promise<bool>` | A Promise that fulfills with `true` if the element is visible, else `false`. |

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
  const isVisible = await text.isVisible();
  if (isVisible) {
    console.log('element is visible');
  }

  await page.close();
}
```

{{< /code >}}
