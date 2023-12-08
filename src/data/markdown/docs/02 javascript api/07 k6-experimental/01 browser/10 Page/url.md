---
title: 'url()'
excerpt: 'Browser module: page.url method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/page/url/
---

Returns the page's URL.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| string               | The page's URL.                                              |

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
  console.log(page.url());
}
```

</CodeGroup>