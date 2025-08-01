---
title: 'continue(options)'
description: 'Browser module: Route.continue method'
---

# continue(options)

Sends the request to the network with optional overrides.

| Parameter           | Type             | Default | Description                                                          |
| ------------------- | ---------------- | ------- | -------------------------------------------------------------------- |
| options             | object           | null    |                                                                      |
| options.headers     | object           | null    | Request headers.                                                     |
| options.method      | string           | `''`    | Request method (e.g. GET or POST).                                   |
| options.postData    | string or Buffer | `''`    | Post data of the request.                                            |
| options.url         | string           | `''`    | Request URL.                                                         |

### Returns

| Type            | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the request is resumed.                            |

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
    await page.route(/.*\/api\/pizza/, async function (route) {
      await route.continue({
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
