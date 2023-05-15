---
title: 'touchScreen'
excerpt: 'Browser module: page.touchScreen method'
---

Returns the [Touchscreen](/javascript-api/k6-experimental/browser/touchscreen/) instance to interact with a virtual touchscreen on the page.

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.touchScreen.tap(50, 50);
}
```

</CodeGroup>