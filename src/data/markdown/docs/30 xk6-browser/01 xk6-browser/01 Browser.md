---
title: "Browser"
excerpt: "xk6-browser: Browser Class"
---

The `Browser` class is the entry point for all your tests, and it is what interacts with the actual web browser via [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (CDP). It manages:
- [BrowserContext](/javascript-api/xk6-browser/browsercontext/)s which is where you can set a variety of attributes to control the behavior of pages;
- and [Page](/javascript-api/xk6-browser/page/)s which is where your rendered site is displayed.

A new Browser instance (hence a new browser process) can be created using the `launch()` function of the `'k6/x/browser'` module.

| Method                                                                                    | Description                                                                                                                                           |
|-------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| [browser.close()](/javascript-api/xk6-browser/browser/close)                              | Closes the browser and all of its pages (if any were opened).                                                                                         |
| [browser.contexts()](/javascript-api/xk6-browser/browser/contexts)                        | Allows you to access all open [BrowserContext](/javascript-api/xk6-browser/browsercontext/)s.                                                        |
| <BWIPT id="453"/> [browser.isConnected](/javascript-api/xk6-browser/browser/isconnected)  | Indicates whether the [CDP](https://chromedevtools.github.io/devtools-protocol/) connection to the browser process is active or not.                  |
| <BWIPT id="455"/> [browser.newContext([options])](/javascript-api/xk6-browser/browser/newcontext/) | Creates and returns a new [BrowserContext](/javascript-api/xk6-browser/browsercontext/).                                                             |
| <BWIPT id="455"/> [browser.newPage([options])](/javascript-api/xk6-browser/browser/newpage)        | Creates a new [Page](/javascript-api/xk6-browser/page/) in a new [BrowserContext](/javascript-api/xk6-browser/browsercontext/) and returns the page. |
| [browser.on('disconnected')](/javascript-api/xk6-browser/browser/on) | Detects the disconnected event from the browser application. |
| [browser.version()](/javascript-api/xk6-browser/browser/version)                          | Returns the browser application's version.                                                                                                            |

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
