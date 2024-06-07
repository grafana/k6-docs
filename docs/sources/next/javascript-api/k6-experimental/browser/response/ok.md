---
title: 'ok()'
description: 'Browser module: Response.ok method'
---

# ok()

Returns a `boolean` stating whether the response was successful (status in the range 200-299) or not.

### Returns

| Type      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `boolean` | Returns a boolean stating whether the response was successful. |

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

    console.log(`ok: ${res.ok()}`); // ok: true
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
