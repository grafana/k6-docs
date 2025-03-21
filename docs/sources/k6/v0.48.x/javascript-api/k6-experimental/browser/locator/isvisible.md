---
title: 'isVisible([options])'
description: 'Browser module: locator.isVisible method'
---

# isVisible([options])

Checks if the element is `visible`.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options         | object | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Returns

| Type | Description                                       |
| ---- | ------------------------------------------------- |
| bool | `true` if the element is `visible`, else `false`. |

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
  const text = page.locator('#text1');
  if (text.isVisible()) {
    console.log('element is visible');
  }
}
```

{{< /code >}}
