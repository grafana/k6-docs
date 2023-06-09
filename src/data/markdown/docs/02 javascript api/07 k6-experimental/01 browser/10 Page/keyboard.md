---
title: 'keyboard'
excerpt: 'Browser module: page.keyboard method'
---

Returns the [Keyboard](/javascript-api/k6-experimental/browser/keyboard/) instance to interact with a virtual keyboard on the page.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| [Keyboard](/javascript-api/k6-experimental/browser/keyboard/)              | The `Keyboard` instance associated with the page.          |

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
  page.keyboard.press('Tab');
}
```

</CodeGroup>