---
title: 'scrollIntoViewIfNeeded([options])'
description: 'Browser module: elementHandle.scrollIntoViewIfNeeded method'
---

# scrollIntoViewIfNeeded([options])

Scrolls the element into view if needed.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                                                                                                         |
| --------------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options         | object | `null`  |                                                                                                                                                                                                                                                                                                                     |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type            | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `Promise<void>` | A promise that resolves when the element is scrolled into view. |

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
  await page.goto('https://test.k6.io');

  const element = await page.$('.header');
  await element.scrollIntoViewIfNeeded();

  await page.close();
}
```

{{< /code >}}
