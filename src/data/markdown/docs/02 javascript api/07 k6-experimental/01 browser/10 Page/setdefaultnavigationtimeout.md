---
title: 'setDefaultNavigationTimeout(timeout)'
excerpt: 'Browser module: page.setDefaultNavigationTimeout(timeout) method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/page/setdefaultnavigationtimeout/
---

This setting will change the navigation timeout for the following methods:
  - [page.goto(url, [options])](/javascript-api/k6-experimental/browser/page/goto/)
  - [page.reload([options])](/javascript-api/k6-experimental/browser/page/reload/)
  - [page.setContent(html, [options])](/javascript-api/k6-experimental/browser/page/setcontent/)
  - [page.waitForNavigation([options])](/javascript-api/k6-experimental/browser/page/waitfornavigation/)

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| timeout        | number  |     |  Timeout in milliseconds.                              |


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
  
  page.setDefaultNavigationTimeout(60000);
  await page.goto('https://test.k6.io/browser.php');
}
```

</CodeGroup>