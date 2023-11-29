---
title: 'touchScreen'
excerpt: 'Browser module: page.touchScreen method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/page/touchscreen/
---

Returns the [Touchscreen](/javascript-api/k6-experimental/browser/touchscreen/) instance to interact with a virtual touchscreen on the page.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| [Touchscreen](/javascript-api/k6-experimental/browser/touchscreen/)              | The `Touchscreen` instance associated with the page.          |

### Example

<CodeGroup labels={[]}>

```javascript
import { browser } from 'k6/experimental/browser';

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
}

export default async function () {
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.touchScreen.tap(50, 50);
}
```

</CodeGroup>