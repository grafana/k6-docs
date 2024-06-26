---
title: 'dispose()'
description: 'Browser module: JSHandle.dispose method'
---

# dispose()

Releases the remote object this references.

### Returns

| Type          | Description                     |
| ------------- | ------------------------------- |
| Promise<null> | Resolves to null if successful. |

### Example

{{< code >}}

<!-- eslint-skip -->

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
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

  try {
    await page.goto('https://test.k6.io/');
    const jsHandle = await page.evaluateHandle(() => document.head);

    await jsHandle.dispose();
    const element = jsHandle.asElement();
    await element.innerHTML(); // Error! JS handle is disposed
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
