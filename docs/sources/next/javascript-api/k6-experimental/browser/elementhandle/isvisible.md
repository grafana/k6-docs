---
title: 'isVisible()'
description: 'Browser module: elementHandle.isVisible() method'
---

# isVisible()

Checks if the element is `visible`.

### Returns

| Type | Description                                            |
| ---- | ------------------------------------------------------ |
| bool | `true` if the element is `visible`, `false` otherwise. |

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
  const page = browser.newPage();

  await page.goto('https://test.k6.io/browser.php');

  const elementHandle = page.$('#text1');
  if (elementHandle.isVisible()) {
    console.log('element is visible');
  }
}
```

{{< /code >}}
