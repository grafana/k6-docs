---
title: "Browser"
excerpt: "xk6-browser: Browser Class"
---

A Browser is created via [browserType.launch([options])](/javascript-api/xk6-browser/browsertype/#browsertype-launch-options).

| Method                                                                                         | Description                                                                                                     |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| <nobr>[browser.close()](/javascript-api/xk6-browser/browser/close)</nobr>                                   | Closes the browser and all of its pages (if any were opened).                                                   |
| <nobr>[browser.contexts()](/javascript-api/xk6-browser/browser/contexts)</nobr>                             | Allows you to access all open browser contexts.                                                                 |
| <nobr>[browser.isConnected](/javascript-api/xk6-browser/browser/isconnected)</nobr>                         | Indicates whether the WebSocket connection to the browser application is active or not.                         |
| <nobr><span title="Not implemented">❌</span> [browser.newBrowserCDPSession()](/javascript-api/xk6-browser/browser/newbrowsercdpsession)</nobr> | Allows you to access Browser's CDP session and talk directly to the browser application using the CDP protocol. |
| <nobr><span title="Work in progress">🚧</span> [browser.newContext([options])](/javascript-api/xk6-browser/browser/newcontext/)</nobr>               | Creates and returns a new browser context.                                                                      |
| <nobr><span title="Work in progress">🚧</span> [browser.newPage([options])](/javascript-api/xk6-browser/browser/newpage)</nobr>                      | Creates a new Page in a new BrowserContext and returns the page.                                                |
| <nobr><span title="Work in progress">[🚧](https://github.com/grafana/xk6-browser/issues/96)</span> [browser.on('disconnected')](/javascript-api/xk6-browser/browser/on)</nobr>                       | Detects events from the browser application. |
| <nobr><span title="Not implemented">❌</span> [browser.startTracing()](/javascript-api/xk6-browser/browser/starttracing)</nobr>                  | Starts Chromium Tracing for debugging a Page.                                                                   |
| <nobr><span title="Not implemented">❌</span> [browser.stopTracing()](/javascript-api/xk6-browser/browser/stoptracing)</nobr>                    | Stops the tracing created by the browser.startTracing() method.                                                 |
| <nobr>[browser.version()](/javascript-api/xk6-browser/browser/version)</nobr>                               | Returns the browser application's version.                                                                      |

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
