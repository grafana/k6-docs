---
title: 'mouse'
excerpt: 'Browser module: page.mouse method'
---

Returns the [Mouse](javascript-api/k6-experimental/browser/mouse/) instance to interact with a virtual mouse on the page.

### Returns

| Type                 | Description                                                                                     |
| ----                 | -----------                                                                                     |
| [Mouse](/javascript-api/k6-experimental/browser/mouse/)              | The `Mouse` instance associated with the page.          |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.mouse.down();
}
```

</CodeGroup>