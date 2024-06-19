---
title: 'jsonValue()'
description: 'Browser module: JSHandle.jsonValue() method'
---

# jsonValue()

Retrieves the JSON representation of the JavaScript object that the JSHandle refers to, making it easy to work with the data outside the browser context.

### Returns

| Type         | Description                          |
| ------------ | ------------------------------------ |
| Promise<any> | A JSON representation of the object. |

### Example

{{< code >}}

<!-- eslint-skip -->

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    browser: {
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
    await page.goto('https://test.k6.io/browser.php');
    const jsHandle = await page.evaluateHandle(() => {
      return { document };
    });

    const j = await jsHandle.jsonValue();
    console.log(j); // {"document":{"location":{"ancestorOrigins":{}...
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
