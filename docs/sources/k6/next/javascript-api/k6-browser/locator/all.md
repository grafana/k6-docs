---
title: 'all()'
description: 'Browser module: locator.all method'
---

# all()

When multiple elements match the selector, returns an array of [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/), each pointing to their respective element.

### Returns

| Type                                                                                   | Description                                              |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | Array of `Locator`. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
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
  await page.goto('https://quickpizza.grafana.com/browser.php');

  const options = await page.locator('#numbers-options > option').all();
  console.log(`Found ${options.length} options.`);
  
  for (const option of options) {
    console.log('Inner text: ', await option.innerText());
    await option.click();
  }

  await page.close();
}
```

{{< /code >}}
