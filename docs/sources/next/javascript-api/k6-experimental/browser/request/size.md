---
title: 'size()'
description: 'Browser module: Request.size method'
---

# size()

Similar to Playwright's [`request.sizes()`](https://playwright.dev/docs/api/class-request#request-sizes), this method returns the size (in bytes) of body and header sections of the [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request).

### Returns

| Type   | Description                           |
| ------ | ------------------------------------- |
| object | `{ body: <bytes>, headers: <bytes> }` |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

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

    const size = await req.size();
    console.log(`size: ${JSON.stringify(size)}`); // size: {"headers":344,"body":0}
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
