---
title: 'postDataBuffer()'
description: 'Browser module: Request.postDataBuffer method'
---

# postDataBuffer()

Request's post body in a binary form, if any.

### Returns

| Type                | Description                                                                  |
| ------------------- | ---------------------------------------------------------------------------- |
| ArrayBuffer \| null | Returns an `ArrayBuffer` with request's post data or `null` if no post data. |

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

    const postDataBuffer = req.postDataBuffer();
    console.log(`postDataBuffer: ${postDataBuffer}`); // postDataBuffer: null
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
