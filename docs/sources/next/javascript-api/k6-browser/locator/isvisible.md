---
title: 'isVisible()'
description: 'Browser module: locator.isVisible method'
---

# isVisible()

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
  const text = page.locator('#text1');
  const isVisible = await text.isVisible();
  if (isVisible) {
    console.log('element is visible');
  }
}
```

{{< /code >}}
