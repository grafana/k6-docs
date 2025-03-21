---
title: 'setDefaultTimeout(timeout)'
description: 'Browser module: page.setDefaultTimeout(timeout) method'
---

# setDefaultTimeout(timeout)

This setting will change the timeout for all the methods accepting a `timeout` option.

| Parameter | Type   | Default | Description              |
| --------- | ------ | ------- | ------------------------ |
| timeout   | number |         | Timeout in milliseconds. |

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

  page.setDefaultTimeout(60000);
  await page.goto('https://test.k6.io/browser.php');
}
```

{{< /code >}}
