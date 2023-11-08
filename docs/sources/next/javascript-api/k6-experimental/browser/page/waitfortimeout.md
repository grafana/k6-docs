---
title: 'waitForTimeout(timeout)'
excerpt: 'Browser module: waitForTimeout(timeout) method'
---

# waitForTimeout(timeout)

{{% admonition type="note" %}}

Never wait for timeout in production, use this only for debugging. Tests that wait for time are inherently flaky. Use [`Locator`](/javascript-api/k6-experimental/browser/locator/) actions and web assertions that wait automatically.

 {{% /admonition %}}

Waits for the given `timeout` in milliseconds.

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

  await page.goto('https://test.k6.io/browser.php');
  page.waitForTimeout(5000);
}
```

{{< /code >}}
