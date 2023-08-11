---
title: 'close()'
excerpt: 'Browser module: page.close method'
---

This will close the tab that this page is associated with.

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.close();
}
```

</CodeGroup>