---
title: 'bringToFront()'
excerpt: 'Browser module: page.bringToFront method'
---

Activates the browser tab so that it comes into focus and actions can be performed against it.


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  
  // perform other actions that might open up a different tab, taking focus away from the initial page.

  page.bringToFront();
}
```

</CodeGroup>