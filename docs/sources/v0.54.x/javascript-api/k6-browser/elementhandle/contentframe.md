---
title: 'contentFrame()'
description: 'Browser module: elementHandle.contentFrame method'
---

# contentFrame()

Returns the [Frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/) that this element is contained in.

### Returns

| Type                     | Description                                                                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<Frame \| null>` | A Promise that resolves to the [Frame](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/) that this element is contained in |

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

  const element = await page.$('#text1');
  const frame = await element.contentFrame();
  console.log(frame.url());

  await page.close();
}
```

{{< /code >}}
