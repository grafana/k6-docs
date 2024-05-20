---
title: 'isHidden()'
description: 'Browser module: locator.isHidden method'
---

# isHidden()

Checks if the element is hidden.

### Returns

| Type            | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `Promise<bool>` | A Promise that fulfills with `true` if the element is hidden, else `false`. |

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
  const page = await browser.newPage();
  await page.goto('https://test.k6.io/browser.php');
  const text = page.locator('#input-text-hidden');
  const isHidden = await text.isHidden();
  if (isHidden) {  
    console.log('element is hidden');
  }
}
```

{{< /code >}}
