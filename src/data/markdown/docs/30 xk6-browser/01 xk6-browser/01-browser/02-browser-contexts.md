---
title: 'Browser.contexts()'
excerpt: 'xk6-browser: Browser.contexts method'
---

<BrowserCompatibility/>

Allows you to access all open browser contexts.

### Returns

| Type  | Description                                                                    |
| ----- | ------------------------------------------------------------------------------ |
| Array | Array of [BrowserContext](/javascript-api/xk6-browser/browsercontext/) objects |


## Example

In a newly created browser, this method will return zero browser contexts.

<!-- eslint-skip -->

```javascript
const browser = launcher.launch('chromium');
console.log(browser.contexts().length); // prints `0`

const context = browser.newContext();
console.log(browser.contexts().length); // prints `1`
```
