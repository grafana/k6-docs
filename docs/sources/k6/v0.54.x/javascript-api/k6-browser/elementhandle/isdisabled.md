---
title: 'isDisabled()'
description: 'Browser module: elementHandle.isDisabled method'
---

# isDisabled()

{{< admonition type="warning" >}}

Use [`locator.isDisabled([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/isdisabled/) instead.

{{< /admonition >}}

Checks if the element is disabled.

### Returns

| Type            | Description                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| `Promise<bool>` | A Promise that fulfills with `true` if the element is disabled, else `false`. |

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

  const text = await page.$('#input-text-disabled');
  const isDisabled = await text.isDisabled();
  if (isDisabled) {
    console.log('element is disabled');
  }

  await page.close();
}
```

{{< /code >}}
