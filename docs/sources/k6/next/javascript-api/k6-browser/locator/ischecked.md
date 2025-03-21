---
title: 'isChecked([options])'
description: 'Browser module: locator.isChecked method'
---

# isChecked([options])

Checks to see if the `checkbox` `input` type is selected or not.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options         | object | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type            | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| `Promise<bool>` | A Promise that fulfills with `true` if the element is checked, else `false`. |

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
  const checkbox = page.locator('#checkbox1');
  const isChecked = await checkbox.isChecked();
  if (!isChecked) {
    await checkbox.check();
  }
}
```

{{< /code >}}
