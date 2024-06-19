---
title: 'size()'
description: 'Browser module: Response.size method'
---

# size()

The size of the response body and the headers.

### Returns

| Type          | Description            |
| ------------- | ---------------------- |
| Promise<Size> | Returns [Size](#size). |

### Size

| Property | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| body     | number | Size in bytes of the response body. |
| headers  | number | Size in bytes of the headers body.  |

### Example

{{< code >}}

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
    const res = await page.goto('https://test.k6.io/');

    const size = await res.size();
    console.log(`size: ${JSON.stringify(size)}`); // size: {"headers":174,"body":11279}
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
