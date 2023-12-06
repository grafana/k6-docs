---
title: 'setDefaultTimeout(timeout)'
excerpt: 'Browser module: page.setDefaultTimeout(timeout) method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/page/setdefaulttimeout/
---

This setting will change the timeout for all the methods accepting a `timeout` option.

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
  
  page.setDefaultTimeout(60000);
  await page.goto('https://test.k6.io/browser.php');
}
```

</CodeGroup>