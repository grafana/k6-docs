---
title: 'close()'
excerpt: 'Browser module: close method'
---

Closes the browser and all of its pages (if any were opened).

The [browser module API](/javascript-api/k6-experimental/browser#browser-module-api) cannot be used anymore and the browser is considered disposed of.


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