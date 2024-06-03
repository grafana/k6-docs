---
title: 'postData()'
description: 'Browser module: Request.postData method'
---

# postData()

Contains the request's post body, if any.

### Returns

| Type           | Description                                         |
| -------------- | --------------------------------------------------- |
| string \| null | Request's post body, otherwise null if none exists. |

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

    const postData = req.postData();
    console.log(`postData: ${postData}`); // postData: null
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
