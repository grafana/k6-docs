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
const browser = launcher.launch('chromium');
console.log(browser.contexts().length); // prints `0`

const context = browser.newContext();
console.log(browser.contexts().length); // prints `1`
```
