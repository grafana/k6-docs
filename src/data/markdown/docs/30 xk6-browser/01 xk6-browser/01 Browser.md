---
title: "Browser"
excerpt: "xk6-browser: Browser Class"
---

The `Browser` class is the entry point for all your tests, and it is what interacts with the actual internet browser via [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (CDP). It manages:
- [BrowserContext](/javascript-api/xk6-browser/browsercontext/)s which is where you can set a variety of attributes to control the behavior of pages;
- and [Page](/javascript-api/xk6-browser/page/)s which is where your rendered site is displayed.

It can be created via `launch()` which is an exported function from `'k6/x/browser'`. Launching a new instance of `Browser` will also create a new browser process.

| Method                                                                                                 | Description                                                                                                                                           |
|--------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| <nobr>[browser.close()](/javascript-api/xk6-browser/browser/close)</nobr>                              | Closes the browser and all of its pages (if any were opened).                                                                                         |
| <nobr>[browser.contexts()](/javascript-api/xk6-browser/browser/contexts)</nobr>                        | Allows you to access all open [BrowserContexts](/javascript-api/xk6-browser/browsercontext/)s.                                                        |
| <nobr>[browser.isConnected](/javascript-api/xk6-browser/browser/isconnected)</nobr>                    | Indicates whether the [CDP](https://chromedevtools.github.io/devtools-protocol/) connection to the browser process is active or not.                  |
| <nobr><BWIPT/> [browser.newContext([options])](/javascript-api/xk6-browser/browser/newcontext/)</nobr> | Creates and returns a new [BrowserContexts](/javascript-api/xk6-browser/browsercontext/).                                                             |
| <nobr><BWIPT/> [browser.newPage([options])](/javascript-api/xk6-browser/browser/newpage)</nobr>        | Creates a new [Page](/javascript-api/xk6-browser/page/) in a new [BrowserContexts](/javascript-api/xk6-browser/browsercontext/) and returns the page. |
| <nobr>[browser.on('disconnected')](/javascript-api/xk6-browser/browser/on)</nobr>                      | Detects events from the browser application.                                                                                                          |
| <nobr>[browser.version()](/javascript-api/xk6-browser/browser/version)</nobr>                          | Returns the browser application's version.                                                                                                            |

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
