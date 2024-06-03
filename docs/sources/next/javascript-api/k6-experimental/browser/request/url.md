---
title: 'url()'
description: 'Browser module: Request.url method'
---

# url()

URL of the request.

### Returns

| Type   | Description         |
| ------ | ------------------- |
| string | URL of the request. |

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

    const url = await req.url();
    console.log(`url: ${url}`); // url: https://test.k6.io/
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
