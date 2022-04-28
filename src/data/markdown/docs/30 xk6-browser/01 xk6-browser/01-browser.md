---
title: "Browser"
excerpt: "xk6-browser: Browser Class"
---

<BrowserCompatibility/>

A Browser is created via [browserType.launch([options])](/javascript-api/xk6-browser/browsertype/#browsertype-launch-options).

| Method                                                                                                 | Description                                |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| [browser.close()](/javascript-api/xk6-browser/browser/browser-close)                                   |                                            |
| [browser.contexts()](/javascript-api/xk6-browser/browser/browser-contexts)                            |                                            |
| [browser.isConnected](/javascript-api/xk6-browser/browser/browser-isconnected)                         |                                            |
| 🚧 [browser.newBrowserCDPSession()](/javascript-api/xk6-browser/browser/browser-newbrowsercdpsession) |                                            |
| [browser.newContext([options])](/javascript-api/xk6-browser/browser/browser-newcontext/)               | Creates and returns a new browser context. |
| [browser.newPage([options])](/javascript-api/xk6-browser/browser/browser-newpage)                      |                                            |
| 🚧 [browser.on('disconnected')](/javascript-api/xk6-browser/browser/browser-on)                       |                                            |
| ❌ [browser.startTracing()](/javascript-api/xk6-browser/browser/browser-starttracing)                  |                                            |
| ❌ [browser.stopTracing()](/javascript-api/xk6-browser/browser/browser-stoptracing)                    |                                            |
| [browser.version()](/javascript-api/xk6-browser/browser/browser-version)                               |                                            |

An example of using a Browser to create a [Page](/javascript-api/xk6-browser/page):

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium');
  const context = browser.newContext();
  const page = context.newPage();
  const res = page.goto('https://test.k6.io/');
  page.close();
  browser.close();
}
```
