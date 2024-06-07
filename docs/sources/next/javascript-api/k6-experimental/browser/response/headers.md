---
title: 'headers()'
description: 'Browser module: Response.headers method'
---

# headers()

An object of key value pairs made up of HTTP headers associated with the response.

### Returns

| Type                     | Description                      |
| ------------------------ | -------------------------------- |
| `Record<string, string>` | Key value pairs for each header. |

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

    const headers = res.headers();
    console.log(`headers: ${JSON.stringify(headers)}`); // headers: {"Content-Type":"text/html;...
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
