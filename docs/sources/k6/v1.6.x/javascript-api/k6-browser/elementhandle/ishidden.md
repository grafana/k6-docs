---
title: 'isHidden()'
description: 'Browser module: elementHandle.isHidden method'
---

# isHidden()

{{< admonition type="warning" >}}

Use [`locator.isHidden()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/ishidden/) instead.

{{< /admonition >}}

Checks if the element is hidden.

### Returns

| Type            | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `Promise<bool>` | A Promise that fulfills with `true` if the element is hidden, else `false`. |

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

  const text = await page.$('#input-text-hidden');
  const isHidden = await text.isHidden();
  if (isHidden) {  
    console.log('element is hidden');
  }

  await page.close();
}
```

{{< /code >}}
