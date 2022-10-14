---
title: 'close()'
excerpt: 'xk6-browser: Browser.close method'
---

Closes the browser and all of its pages (if any were opened).

The [Browser](/javascript-api/xk6-browser/browser/) object cannot be used anymore and is considered disposed of.


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