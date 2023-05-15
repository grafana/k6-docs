---
title: 'mainFrame()'
excerpt: 'Browser module: page.mainFrame method'
---

The page's main frame. Page is made up of frames in a hierarchical. At the top is `mainFrame`. A page is guaranteed to have a main frame.

### Returns

| Type   | Description                      |
|--------|----------------------------------|
| [Frame](/javascript-api/k6-experimental/browser/frame/) | The page's main frame. |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  console.log(page.mainFrame()); 
}
```

</CodeGroup>