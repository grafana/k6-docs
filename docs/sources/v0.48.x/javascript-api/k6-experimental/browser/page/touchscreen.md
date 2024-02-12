---
title: 'touchScreen'
description: 'Browser module: page.touchScreen method'
---

# touchScreen

Returns the [Touchscreen](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/touchscreen/) instance to interact with a virtual touchscreen on the page.

### Returns

| Type                                                                                                        | Description                                          |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [Touchscreen](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/touchscreen/) | The `Touchscreen` instance associated with the page. |

### Example

{{< code >}}

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
};

export default async function () {
  const page = browser.newPage();

  await page.goto('https://test.k6.io/browser.php');
  page.touchScreen.tap(50, 50);
}
```

{{< /code >}}
