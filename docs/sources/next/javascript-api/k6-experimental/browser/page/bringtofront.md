---
title: 'bringToFront()'
description: 'Browser module: page.bringToFront method'
---

# bringToFront()

Activates the browser tab which brings the page in focus to allow actions to be performed onto it.

### Returns

| Type            | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the page is brought to the front. |

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

  // perform other actions that might open up a different tab, taking focus away from the initial page.

  await page.bringToFront();
}
```

{{< /code >}}
