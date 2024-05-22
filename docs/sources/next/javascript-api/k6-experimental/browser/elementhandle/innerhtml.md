---
title: 'innerHTML()'
description: 'Browser module: elementHandle.innerHTML method'
---

# innerHTML()

{{% admonition type="warning" %}}

Use [`locator.innerHTML([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/innerhtml/) instead.

{{% /admonition %}}

Returns the `element.innerHTML`.

### Returns

| Type              | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `Promise<string>` | A Promise that fulfills with the inner HTML of the element. |

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
  const page = await browser.newPage();
  await page.goto('https://test.k6.io/browser.php');

  const offScreen = await page.$('#off-screen');
  console.log(await offScreen.innerHTML());

  page.close();
}
```

{{< /code >}}
