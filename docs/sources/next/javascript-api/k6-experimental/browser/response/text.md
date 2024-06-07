---
title: 'text()'
description: 'Browser module: Response.text method'
---

# text()

Returns the response body as a string.

### Returns

| Type              | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `Promise<string>` | A promise that resolves to the response body as a string. |

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

    const text = await res.text();
    console.log(`text: ${text}`); // text: <!DOCTYPE html>...
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
