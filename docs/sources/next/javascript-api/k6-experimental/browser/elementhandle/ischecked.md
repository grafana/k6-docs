---
title: 'isChecked()'
description: 'Browser module: elementHandle.isChecked method'
---

# isChecked()

{{% admonition type="warning" %}}

Use [`locator.isChecked([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/ischecked/) instead.

{{% /admonition %}}

Checks to see if the `checkbox` `input` type is selected or not.

### Returns

| Type            | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| `Promise<bool>` | A Promise that fulfills with `true` if the element is checked, else `false`. |

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

  const checkbox = await page.$('#checkbox1');
  const isChecked = await checkbox.isChecked();
  if (!isChecked) {
    await checkbox.check();
  }

  await page.close();
}
```

{{< /code >}}
