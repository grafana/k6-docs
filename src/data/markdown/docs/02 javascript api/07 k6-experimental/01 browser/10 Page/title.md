---
title: 'title()'
excerpt: 'Browser module: page.title method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/page/title/
---

Returns the page's title.

### Returns

| Type | Description                                       |
|------|---------------------------------------------------|
| string | The page's title. |

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
  console.log(page.title());
}
```

</CodeGroup>