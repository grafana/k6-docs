---
title: 'frame()'
description: 'Browser module: Response.frame method'
---

# frame()

The [Frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/) that initiated the request which this response is associated to.

### Returns

| Type                                                                                            | Description                                                                  |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [Frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/) | The `Frame` that initiated the request which this response is associated to. |

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

    const frame = res.frame();
    // ...
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
