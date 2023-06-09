---
title: "Browser class"
excerpt: "Browser module: Browser Class"
---

The `Browser` class is the entry point for all your tests, and it is what interacts with the actual web browser via [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (CDP). It manages:
- [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) which is where you can set a variety of attributes to control the behavior of pages;
- and [Page](/javascript-api/k6-experimental/browser/page/) which is where your rendered site is displayed.

A new Browser instance (hence a new browser process) can be created using the `launch()` method of the `chromium` module from `'k6/experimental/browser'`.

| Method                                                                                    | Description                                                                                                                                           |
|-------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| [browser.close()](/javascript-api/k6-experimental/browser/browser-class/close)                              | Closes the browser and all of its pages (if any were opened).                                                                                         |
| [browser.contexts()](/javascript-api/k6-experimental/browser/browser-class/contexts)                        | Lets you access all open [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/)s.                                                        |
| [browser.isConnected](/javascript-api/k6-experimental/browser/browser-class/isconnected) <BWIPT id="453"/>  | Indicates whether the [CDP](https://chromedevtools.github.io/devtools-protocol/) connection to the browser process is active or not.                  |
| [browser.newContext([options])](/javascript-api/k6-experimental/browser/browser-class/newcontext/) <BWIPT id="455"/> | Creates and returns a new [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/).                                                             |
| [browser.newPage([options])](/javascript-api/k6-experimental/browser/browser-class/newpage)  <BWIPT id="455"/>       | Creates a new [Page](/javascript-api/k6-experimental/browser/page/) in a new [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) and returns the page. |
| [browser.version()](/javascript-api/k6-experimental/browser/browser-class/version/)                          | Returns the browser application's version.                                                                                                            |

### Example

<CodeGroup labels={[]}>

```javascript
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
            type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ["rate==1.0"]
  }
}

export default async function () {
  const page = browser.newPage();
  try {
    await page.goto('https://test.k6.io/');
  } finally {
    page.close();
  }
}
```

</CodeGroup>
