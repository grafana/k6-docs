---
title: 'request()'
description: 'Browser module: Route.request method'
---

# request()

Returns the matching [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request) object.

### Returns

| Type      | Description           |
| --------- | --------------------- |
| `Request` | The `Request` object. |

### Example

{{< code >}}

<!-- md-k6:skip -->

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
    await page.route(/.*\/api\/pizza/, async function (route) {
      await route.continue({
        headers: {
          ...route.request().headers(),
          'Content-Type': 'application/json',
        },
        postData: JSON.stringify({
          customName: 'My Pizza',
        }),
      });
    });

    await page.goto('https://quickpizza.grafana.com/');
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
