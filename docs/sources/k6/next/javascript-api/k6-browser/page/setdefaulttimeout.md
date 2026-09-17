---
title: 'setDefaultTimeout(timeout)'
description: 'Browser module: page.setDefaultTimeout(timeout) method'
---

# setDefaultTimeout(timeout)

This setting changes the timeout for methods accepting a `timeout` option and for [page.screenshot()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/screenshot/).

| Parameter | Type   | Default | Description              |
| --------- | ------ | ------- | ------------------------ |
| timeout   | number |         | Timeout in milliseconds. |

### Example

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

  page.setDefaultTimeout(60000);
  await page.goto('https://test.k6.io/browser.php');
}
```
