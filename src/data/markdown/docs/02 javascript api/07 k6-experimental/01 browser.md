---
title: 'browser'
excerpt: 'An overview of the browser-level APIs from browser module.'
---

<ExperimentalBlockquote />

The browser module APIs aim for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright).

Note that because k6 does not run in NodeJS, the browser module APIs will slightly differ from their Playwright counterparts.

<Blockquote mod="note" title="">

To work with the browser module, make sure you are using the latest [k6 version](https://github.com/grafana/k6/releases).

</Blockquote>

## Importable Properties

The table below lists the importable properties from the top level module (`'k6/experimental/browser'`).

| Property | Description                                                                                                                                                                          |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| browser | The browser module API is the entry point for all your tests. See the [example](#example) and the [API](#browser-module-api) below. |
| devices  | Returns predefined emulation settings for many end-user devices that can be used to simulate browser behavior on a mobile device. See the [devices example](#devices-example) below. |


## Browser Module API

The browser module is the entry point for all your tests, and it is what interacts with the actual web browser via [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (CDP). It manages:
- [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) which is where you can set a variety of attributes to control the behavior of pages;
- and [Page](/javascript-api/k6-experimental/browser/page/) which is where your rendered site is displayed.

A new Chromium browser process is automatically launched when you use the `newContext` method of the `browser` module (`'k6/experimental/browser'`).

| Method                                                                                    | Description                                                                                                                                           |
|-------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| [browser.close()](/javascript-api/k6-experimental/browser/close)                              | Closes the browser and all of its pages (if any were opened).                                                                                         |
| [browser.contexts()](/javascript-api/k6-experimental/browser/contexts)                        | Lets you access all open [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/)s.                                                        |
| [browser.isConnected](/javascript-api/k6-experimental/browser/isconnected) <BWIPT id="453"/>  | Indicates whether the [CDP](https://chromedevtools.github.io/devtools-protocol/) connection to the browser process is active or not.                  |
| [browser.newContext([options])](/javascript-api/k6-experimental/browser/newcontext/) <BWIPT id="455"/> | Creates and returns a new [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/).                                                             |
| [browser.newPage([options])](/javascript-api/k6-experimental/browser/newpage)  <BWIPT id="455"/>       | Creates a new [Page](/javascript-api/k6-experimental/browser/page/) in a new [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) and returns the page. |
| [browser.version()](/javascript-api/k6-experimental/browser/version/)                          | Returns the browser application's version.                                                                                                            |

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
  const context = browser.newContext();
  const page = context.newPage();

  try {
    await page.goto('https://test.k6.io/');
  } finally {
    page.close();
  }
}
```

</CodeGroup>


## Browser-level APIs

| k6 Class                                                                | Description                                                                                                                                                     |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) <BWIPT /> | Enables independent browser sessions with separate [Page](/javascript-api/k6-experimental/browser/page/)s, cache, and cookies.                                              |
| [ElementHandle](/javascript-api/k6-experimental/browser/elementhandle/) <BWIPT />   | Represents an in-page DOM element.                                                                                                                              |
| [Frame](/javascript-api/k6-experimental/browser/frame/) <BWIPT />                   | Access and interact with the [`Page`](/javascript-api/k6-experimental/browser/page/).'s `Frame`s.                                                                           |
| [JSHandle](/javascript-api/k6-experimental/browser/jshandle)                        | Represents an in-page JavaScript object.                                                                                                                        |
| [Keyboard](/javascript-api/k6-experimental/browser/keyboard/)                       | Used to simulate the keyboard interactions with the associated [`Page`](/javascript-api/k6-experimental/browser/page/).                                                     |
| [Locator](/javascript-api/k6-experimental/browser/locator/)                         | The Locator API makes it easier to work with dynamically changing elements.                                                                                     |
| [Mouse](/javascript-api/k6-experimental/browser/mouse/)                             | Used to simulate the mouse interactions with the associated [`Page`](/javascript-api/k6-experimental/browser/page/).                                                        |
| [Page](/javascript-api/k6-experimental/browser/page/) <BWIPT />                     | Provides methods to interact with a single tab in a [`Browser`](/javascript-api/k6-experimental/browser/browser-class/).                                                          |
| [Request](/javascript-api/k6-experimental/browser/request/) <BWIPT />               | Used to keep track of the request the [`Page`](/javascript-api/k6-experimental/browser/page/) makes.                                                                        |
| [Response](/javascript-api/k6-experimental/browser/response/) <BWIPT />             | Represents the response received by the [`Page`](/javascript-api/k6-experimental/browser/page/).                                                                            |
| [Touchscreen](/javascript-api/k6-experimental/browser/touchscreen/)                 | Used to simulate touch interactions with the associated [`Page`](/javascript-api/k6-experimental/browser/page/).                                                            |
| [Worker](/javascript-api/k6-experimental/browser/worker/)                           | Represents a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).                                                            |


### Devices Example

To emulate the browser behaviour on a mobile device and approximately measure the browser performance, you can import `devices` from `k6/experimental/browser`.

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import { browser, devices } from 'k6/experimental/browser';

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
  const iphoneX = devices['iPhone X'];
  const context = browser.newContext();
  const page = context.newPage();

  try {
    await page.goto('https://test.k6.io/');
  } finally {
    page.close();
  }
}
```

</CodeGroup>