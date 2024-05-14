---
title: 'isHidden()'
description: 'Browser module: elementHandle.isHidden() method'
---

# isHidden()

Checks if the element is `hidden`.

### Returns

| Type | Description                                           |
| ---- | ----------------------------------------------------- |
| bool | `true` if the element is `hidden`, `false` otherwise. |

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

  const elementHandle = page.$('#input-text-hidden');
  if (elementHandle.isHidden()) {
    console.log('element is hidden');
  }
}
```

{{< /code >}}
