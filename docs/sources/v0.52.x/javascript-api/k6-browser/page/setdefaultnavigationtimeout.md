---
title: 'setDefaultNavigationTimeout(timeout)'
description: 'Browser module: page.setDefaultNavigationTimeout(timeout) method'
---

# setDefaultNavigationTimeout(timeout)

This setting will change the navigation timeout for the following methods:

- [page.goto(url, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/goto/)
- [page.reload([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/reload/)
- [page.setContent(html, [options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/setcontent/)
- [page.waitForNavigation([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitfornavigation/)

| Parameter | Type   | Default | Description              |
| --------- | ------ | ------- | ------------------------ |
| timeout   | number |         | Timeout in milliseconds. |

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

  page.setDefaultNavigationTimeout(60000);
  await page.goto('https://test.k6.io/browser.php');
}
```

{{< /code >}}
