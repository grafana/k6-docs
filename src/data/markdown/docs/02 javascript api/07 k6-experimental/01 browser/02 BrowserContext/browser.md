---
title: 'browser instance'
excerpt: 'Returns the browser instance that this BrowserContext belongs to.'
---

Returns the [browser](/javascript-api/k6-experimental/browser/browser-module/) instance that this `BrowserContext` belongs to.


### Returns

| Type                                            | Description             |
| ----------------------------------------------  | ----------------------- |
| [Browser](/javascript-api/k6-experimental/browser/browser-module/) | The Browser instance.   |


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default function () {
  const browser = chromium.launch();
  const context = browser.newContext();
  const contextBrowser = context.browser();
  contextBrowser.close();
}
```

</CodeGroup>
