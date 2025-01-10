---
title: 'headers()'
description: 'Browser module: Request.headers method'
---

# headers()

An object of key value pairs made up of HTTP headers associated with the request.

### Returns

| Type                     | Description                      |
| ------------------------ | -------------------------------- |
| `Record<string, string>` | Key value pairs for each header. |

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

    const headers = req.headers();
    console.log(`headers: ${JSON.stringify(headers)}`); // headers: {"user-agent":"Mozilla/5.0...}
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
