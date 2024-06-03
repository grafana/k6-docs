---
title: 'headerValue(name)'
description: 'Browser module: Request.headerValue method'
---

# headerValue(name)

Returns the value of the header matching the name. The name is case insensitive.

### Returns

| Type                      | Description                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------- |
| `Promise<string \| null>` | A promise that resolves to the value of the header matching the name, otherwise null. |

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
    const req = res.request();

    const headerValue = await req.headerValue('accept-language');
    console.log(`headerValue: ${headerValue}`); // headerValue: en-US
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
