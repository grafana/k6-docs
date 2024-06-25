---
title: 'size()'
description: 'Browser module: Request.size method'
---

# size()

Similar to Playwright's [`request.sizes()`](https://playwright.dev/docs/api/class-request#request-sizes), this method returns the size (in bytes) of body and header sections of the [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request).

### Returns

| Type          | Description            |
| ------------- | ---------------------- |
| Promise<Size> | Returns [Size](#size). |

### Size

| Property | Type   | Description                        |
| -------- | ------ | ---------------------------------- |
| body     | number | Size in bytes of the request body. |
| headers  | number | Size in bytes of the headers body. |

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
    const req = res.request();

    const size = req.size();
    console.log(`size: ${JSON.stringify(size)}`); // size: {"headers":344,"body":0}
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
