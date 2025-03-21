---
title: 'frames()'
description: 'Browser module: page.frames method'
---

# frames()

Returns an array of [Frames](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/) on the page.

### Returns

| Type                                                                                  | Description                                    |
| ------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [Frames](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/)[] | An array of `Frames` associated with the page. |

### Example

{{< code >}}

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

  await page.goto('https://test.k6.io/browser.php');
  console.log(page.frames());
}
```

{{< /code >}}
