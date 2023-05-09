---
title: 'isClosed()'
excerpt: 'Browser module: page.isClosed() method'
---

Checks if the page has been closed.

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.close();

  console.log(page.isClosed())
}
```

</CodeGroup>
