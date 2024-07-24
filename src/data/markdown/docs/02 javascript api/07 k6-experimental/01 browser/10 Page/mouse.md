---
title: 'mouse'
excerpt: 'Browser module: page.mouse method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/page/mouse/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/page/mouse/
---

Returns the [Mouse](/javascript-api/k6-experimental/browser/mouse/) instance to interact with a virtual mouse on the page.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| [Mouse](/javascript-api/k6-experimental/browser/mouse/)              | The `Mouse` instance associated with the page.          |

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
  page.mouse.down();
}
```

</CodeGroup>ß