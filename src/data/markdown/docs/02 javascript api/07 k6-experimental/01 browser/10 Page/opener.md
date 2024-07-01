---
title: 'opener()'
excerpt: 'Browser module: page.opener method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/page/opener/
---

Returns the page that opened the current page. The first page that is navigated to will have a `null` opener.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| null or [Page](/javascript-api/k6-experimental/browser/page/)              | The `Page` instance. Else, it returns `null`.        |

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
  console.log(page.opener())
}
```

</CodeGroup>