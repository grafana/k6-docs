---
title: 'isChecked([options])'
excerpt: 'Browser module: locator.isChecked method'
---

Checks to see if the `checkbox` `input` type is selected or not.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Returns

| Type | Description                                       |
|------|---------------------------------------------------|
| bool | `true` if the checkbox is selected, else `false`. |

### Example

<CodeGroup labels={[]}>

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
}

export default async function () {
  const page = browser.newPage();
  await page.goto('https://test.k6.io/browser.php');
  const checkbox = page.locator('#checkbox1');
  if (!checkbox.isChecked()) {
    checkbox.check();
  }
}
```

</CodeGroup>
