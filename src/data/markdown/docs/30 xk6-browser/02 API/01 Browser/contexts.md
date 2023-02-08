---
title: 'contexts()'
excerpt: 'xk6-browser: Browser.contexts method'
---

Access all open [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/)s.

### Returns

| Type  | Description                                                                    |
| ----- | ------------------------------------------------------------------------------ |
| Array | Array of [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/) objects |


### Example

```javascript
import { chromium } from 'k6/experimental/browser';

export default function () {
  const browser = chromium.launch();
  console.log(browser.contexts().length); // 0

  const context = browser.newContext();
  console.log(browser.contexts().length); // 1

  context.close();
  browser.close();
}
```
