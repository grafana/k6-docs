---
title: 'context()'
excerpt: 'Browser module: page.context method'
---

Gets the [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) that the page belongs to.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/)               | The `BrowserContext` that the page belongs to.          |

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
  console.log(page.context()); // prints {"base_event_emitter":{}}
}
```

</CodeGroup>


