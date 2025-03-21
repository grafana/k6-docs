---
title: 'method()'
description: 'Browser module: Request.method method'
---

# method()

Request's method (GET, POST, etc.).

### Returns

| Type   | Description            |
| ------ | ---------------------- |
| string | Request's method name. |

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

    const method = req.method();
    console.log(`method: ${method}`); // method: GET
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
