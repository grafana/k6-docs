---
title: 'Browser.contexts()'
excerpt: 'xk6-browser: Browser.contexts method'
---

<BrowserCompatibility/>

Returns an array of all open browser contexts. In a newly created browser, this will return zero browser contexts.

### Returns

| Type  | Description                                                                    |
| ----- | ------------------------------------------------------------------------------ |
| Array | Array of [BrowserContext](/javascript-api/xk6-browser/browsercontext/) objects |

<!-- eslint-skip -->

```javascript
const browser = launcher.launch('chromium');
console.log(browser.contexts().length); // prints `0`

const context = browser.newContext();
console.log(browser.contexts().length); // prints `1`
```
