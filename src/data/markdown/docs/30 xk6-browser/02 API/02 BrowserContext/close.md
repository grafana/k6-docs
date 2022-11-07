---
title: 'close()'
excerpt: 'Close the BrowserContext and all its pages.'
---

Close the `BrowserContext` and all its [page](/javascript-api/xk6-browser/api/page)s. The `BrowserContext` is unusable after this call and a new one must be created. This is typically called to cleanup before ending the test.


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch();
  const context = browser.newContext();
  context.newPage();

  context.close();
  browser.close();
}
```

</CodeGroup>