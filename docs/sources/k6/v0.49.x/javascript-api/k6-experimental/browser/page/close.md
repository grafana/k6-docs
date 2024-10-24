---
title: 'close()'
description: 'Browser module: page.close method'
---

# close()

This will close the tab that this page is associated with.

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
  page.close();
}
```

{{< /code >}}
