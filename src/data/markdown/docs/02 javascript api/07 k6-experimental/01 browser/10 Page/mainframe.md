---
title: 'mainFrame()'
excerpt: 'Browser module: page.mainFrame method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/page/mainframe/
---

The page's main frame. Page is made up of frames in a hierarchical. At the top is `mainFrame`. A page is guaranteed to have a main frame.

### Returns

| Type   | Description                      |
|--------|----------------------------------|
| [Frame](/javascript-api/k6-experimental/browser/frame/) | The page's main frame. |

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
  console.log(page.mainFrame()); 
}
```

</CodeGroup>