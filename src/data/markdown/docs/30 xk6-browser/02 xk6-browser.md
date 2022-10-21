---
title: 'xk6-browser'
excerpt: 'An overview of the browser-level APIs from xk6-browser.'
---

The `xk6-browser` APIs aim for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright).

Note that because k6 does not run in NodeJS, `xk6-browser` APIs will slightly differ from their Playwright counterparts.

## Modules

The table below lists the importable properties from the top level module (`'k6/x/browser'`).

| Property | Description                                                                                                                                                                          |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| chromium | A [BrowserType](/javascript-api/xk6-browser/browsertype) to launch tests in a Chromium-based browser.                                                                                |
| devices  | Returns predefined emulation settings for many end-user devices that can be used to simulate browser behavior on a mobile device. See the [devices example](#devices-example) below. |
| version  | Returns the version number of xk6-browser.                                                                                                                                           |

### Devices Example

To emulate the browser behaviour on a mobile device and approximately measure the browser performance, you can import `devices` from `k6/x/browser`.

  <CodeGroup labels={["script.js"]} lineNumbers={[true]}>

  ```javascript
  import { chromium, devices } from 'k6/x/browser';

  export default function () {
    const browser = chromium.launch({ headless: false });
    const iphoneX = devices['iPhone X'];
    const context = browser.newContext(iphoneX);
    const page = context.newPage();

    page.goto('https://test.k6.io/', {
      waitUntil: 'networkidle',
    });

    page.close();
    browser.close();
  }
  ```

  </CodeGroup>

## Browser-level APIs

| k6 Class                                                                | Description                                                                                                                                                     |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Browser](/javascript-api/xk6-browser/browser/) <BWIPT />               | The entry point for all tests and used to launch [BrowserContext](/javascript-api/xk6-browser/browsercontext/)s and [Page](/javascript-api/xk6-browser/page/)s. |
| [BrowserContext](/javascript-api/xk6-browser/browsercontext/) <BWIPT /> | Enables independent browser sessions with separate [Page](/javascript-api/xk6-browser/page/)s, cache, and cookies.                                              |
| [BrowserType](/javascript-api/xk6-browser/browsertype/)                 | The `BrowserType` is the entry point into launching a browser process; `chromium` is currently the only supported `BrowserType`.                                |
| [ElementHandle](/javascript-api/xk6-browser/elementhandle/) <BWIPT />   | Represents an in-page DOM element.                                                                                                                              |
| [Frame](/javascript-api/xk6-browser/frame/) <BWIPT />                   | Access and interact with the [`Page`](/javascript-api/xk6-browser/page/).'s `Frame`s.                                                                           |
| [JSHandle](/javascript-api/xk6-browser/jshandle)                        | Represents an in-page JavaScript object.                                                                                                                        |
| [Keyboard](/javascript-api/xk6-browser/keyboard/)                       | Used to simulate the keyboard interactions with the associated [`Page`](/javascript-api/xk6-browser/page/).                                                     |
| [Locator](/javascript-api/xk6-browser/locator/)                         | The Locator API makes it easier to work with dynamically changing elements.                                                                                     |
| [Mouse](/javascript-api/xk6-browser/mouse/)                             | Used to simulate the mouse interactions with the associated [`Page`](/javascript-api/xk6-browser/page/).                                                        |
| [Page](/javascript-api/xk6-browser/page/) <BWIPT />                     | Provides methods to interact with a single tab in a [`Browser`](/javascript-api/xk6-browser/browser/).                                                          |
| [Request](/javascript-api/xk6-browser/request/) <BWIPT />               | Used to keep track of the request the [`Page`](/javascript-api/xk6-browser/page/) makes.                                                                        |
| [Response](/javascript-api/xk6-browser/response/) <BWIPT />             | Represents the response received by the [`Page`](/javascript-api/xk6-browser/page/).                                                                            |
| [Touchscreen](/javascript-api/xk6-browser/touchscreen/)                 | Used to simulate touch interactions with the associated [`Page`](/javascript-api/xk6-browser/page/).                                                            |
