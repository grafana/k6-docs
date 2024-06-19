---
title: 'url()'
description: 'Browser module: worker.url method'
---

# url()

Returns the URL of the web worker.

### Returns

| Type   | Description                |
| ------ | -------------------------- |
| string | The URL of the web worker. |

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

  try {
    await page.goto('https://test.k6.io/browser.php');
    const workers = page.workers();

    for (const worker of workers) {
      console.log('Worker URL:', worker.url());
    }
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
