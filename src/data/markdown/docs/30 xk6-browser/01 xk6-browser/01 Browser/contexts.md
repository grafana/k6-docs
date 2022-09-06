---
title: 'contexts()'
excerpt: 'xk6-browser: Browser.contexts method'
---

Allows you to access all open [BrowserContext](/javascript-api/xk6-browser/browsercontext/)s.

### Returns

| Type  | Description                                                                    |
| ----- | ------------------------------------------------------------------------------ |
| Array | Array of [BrowserContext](/javascript-api/xk6-browser/browsercontext/) objects |


## Example

<!-- eslint-skip -->

```javascript
import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch();
  console.log(browser.contexts()); // []

  const context = browser.newContext();
  console.log(browser.contexts()); /* [
                                        {
                                            "base_event_emitter": {}
                                        }
                                      ] */

  context.close();
  browser.close();
}
```
