---
title: 'workers()'
excerpt: 'Browser module: page.workers method'
---

This method returns an array of the dedicated [WebWorkers](/javascript-api/k6-experimental/browser/worker/) associated with the page.

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  console.log(page.workers());
}
```

</CodeGroup>