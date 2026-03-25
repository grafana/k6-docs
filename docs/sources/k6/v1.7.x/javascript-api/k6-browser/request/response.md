---
title: 'response()'
description: 'Browser module: Request.response method'
---

# response()

Returns the matching [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response) object, or `null` if the response was not received due to error.

### Returns

| Type                        | Description                                                                     |
| --------------------------- | ------------------------------------------------------------------------------- |
| `Promise<Response \| null>` | The `Response` object, or `null` if the response was not received due to error. |

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

    const response = await req.response();
    // ...
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
