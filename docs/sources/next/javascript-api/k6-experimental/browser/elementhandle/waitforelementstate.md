---
title: 'waitForElementState(state[, options])'
description: 'Browser module: elementHandle.waitForElementState(state[, options]) method'
---

# waitForElementState(state[, options])

Waits for the element to reach the specified state.

<TableWithNestedRows>

| Parameter | Type   | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| --------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| state     | string |         | The state to wait for. This can be one of `visible`, `hidden`, `stable`, `enabled`, `disabled`, or `editable`.                                                                                                                                                                                                                                |
| timeout   | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Returns

| Type            | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the element reaches the specified state or the timeout is reached. |

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

  const element = await page.$('#text1');
  await element.waitForElementState('visible');

  page.close();
}
```

{{< /code >}}
