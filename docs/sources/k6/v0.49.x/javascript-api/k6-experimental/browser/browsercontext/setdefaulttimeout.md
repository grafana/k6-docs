---
title: 'setDefaultTimeout(timeout)'
description: 'Sets the default timeout in milliseconds.'
---

# setDefaultTimeout(timeout)

Sets the default maximum timeout for all methods accepting a `timeout` option in milliseconds.

| Parameter | Type   | Default                  | Description                  |
| --------- | ------ | ------------------------ | ---------------------------- |
| timeout   | number | Dependent on the action. | The timeout in milliseconds. |

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
  const context = browser.newContext();
  context.setDefaultTimeout(1000); // 1s
  const page = context.newPage();
  await page.click('h2'); // times out
}
```

{{< /code >}}
