---
title: 'close()'
excerpt: 'Browser module: Browser.close method'
---

Closes the browser and all of its pages (if any were opened).

The [Browser](/javascript-api/k6-experimental/browser/browser-class/) object cannot be used anymore and is considered disposed of.


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default function () {
  const browser = chromium.launch();
  const context = browser.newContext();
  context.newPage();

  context.close();
  browser.close();
}
```

</CodeGroup>