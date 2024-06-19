---
title: 'isNavigationRequest()'
description: 'Browser module: Request.isNavigationRequest method'
---

# isNavigationRequest()

Returns a boolean stating whether the request is for a navigation.

### Returns

| Type    | Description                                              |
| ------- | -------------------------------------------------------- |
| boolean | Boolean stating whether the request is for a navigation. |

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

    const isNavReq = req.isNavigationRequest();
    console.log(`isNavReq: ${isNavReq}`); // isNavReq: true
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
