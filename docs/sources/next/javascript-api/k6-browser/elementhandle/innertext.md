---
title: 'innerText()'
description: 'Browser module: elementHandle.innerText method'
---

# innerText()

{{% admonition type="warning" %}}

Use [`locator.innerText([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/innertext/) instead.

{{% /admonition %}}

Returns the element's inner text.

### Returns

| Type              | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `Promise<string>` | A Promise that fulfills with the inner text of the element. |

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

  const offScreen = await page.$('#off-screen');
  console.log(await offScreen.innerText()); // Off page div

  await page.close();
}
```

{{< /code >}}
