---
title: 'url()'
description: 'Browser module: Response.url method'
---

# url()

URL of the response.

### Returns

| Type   | Description          |
| ------ | -------------------- |
| string | URL of the response. |

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

    const url = res.url();
    console.log(`url: ${url}`); // url: https://test.k6.io/
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
