---
title: 'content()'
excerpt: 'Browser module: page.content method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/page/content/
---

Gets the HTML contents of the page.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| string               | The HTML contents of the page.                                                                  |

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
  console.log(page.content()); // HTML content printed in the console
}
```

</CodeGroup>


