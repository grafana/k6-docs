---
title: 'bringToFront()'
excerpt: 'Browser module: page.bringToFront method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/page/bringtofront/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/page/bringtofront/
---

Activates the browser tab which brings the page in focus to allow actions to be performed onto it.


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
  
  // perform other actions that might open up a different tab, taking focus away from the initial page.

  page.bringToFront();
}
```

</CodeGroup>