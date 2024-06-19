---
title: 'request()'
description: 'Browser module: Response.request method'
---

# request()

Returns the matching [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/request) object.

### Returns

| Type      | Description           |
| --------- | --------------------- |
| `Request` | The `Request` object. |

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
    // ...
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
