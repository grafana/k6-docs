---
title: 'status()'
description: 'Browser module: Response.status method'
---

# status()

Contains the status code of the response (e.g., 200 for a success).

### Returns

| Type   | Description                      |
| ------ | -------------------------------- |
| number | The status code of the response. |

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

    console.log(`status: ${res.status()}`); // status: 200
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
