---
title: "Browser"
excerpt: "xk6-browser: Browser Class"
---

The `Browser` class is the entry point for all your tests, and it is what interacts with the actual web browser via [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (CDP). It manages:
- [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/) which is where you can set a variety of attributes to control the behavior of pages;
- and [Page](/javascript-api/xk6-browser/api/page/) which is where your rendered site is displayed.

A new Browser instance (hence a new browser process) can be created using the `launch()` method of the `chromium` module from `'k6/x/browser'`.

| Method                                                                                    | Description                                                                                                                                           |
|-------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| [browser.close()](/javascript-api/xk6-browser/api/browser/close)                              | Closes the browser and all of its pages (if any were opened).                                                                                         |
| [browser.contexts()](/javascript-api/xk6-browser/api/browser/contexts)                        | Lets you access all open [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/)s.                                                        |
| [browser.isConnected](/javascript-api/xk6-browser/api/browser/isconnected) <BWIPT id="453"/>  | Indicates whether the [CDP](https://chromedevtools.github.io/devtools-protocol/) connection to the browser process is active or not.                  |
| [browser.newContext([options])](/javascript-api/xk6-browser/api/browser/newcontext/) <BWIPT id="455"/> | Creates and returns a new [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/).                                                             |
| [browser.newPage([options])](/javascript-api/xk6-browser/api/browser/newpage)  <BWIPT id="455"/>       | Creates a new [Page](/javascript-api/xk6-browser/api/page/) in a new [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/) and returns the page. |
| [browser.on('disconnected')](/javascript-api/xk6-browser/api/browser/on) | Detects the disconnected event from the browser application. |
| [browser.version()](/javascript-api/xk6-browser/api/browser/version)                          | Returns the browser application's version.                                                                                                            |

### Example

```javascript
import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch();
  const context = browser.newContext();
  const page = context.newPage();

  page
    .goto('https://test.k6.io/', {
      waitUntil: 'networkidle',
    })
    .finally(() => {
      page.close();
      browser.close();
    });
}
```
