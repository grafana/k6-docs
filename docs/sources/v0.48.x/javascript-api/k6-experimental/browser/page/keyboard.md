---
title: 'keyboard'
description: 'Browser module: page.keyboard method'
---

# keyboard

Returns the [Keyboard](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/keyboard/) instance to interact with a virtual keyboard on the page.

### Returns

| Type                                                                                                  | Description                                       |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [Keyboard](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/keyboard/) | The `Keyboard` instance associated with the page. |

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
  page.keyboard.press('Tab');
}
```

{{< /code >}}
