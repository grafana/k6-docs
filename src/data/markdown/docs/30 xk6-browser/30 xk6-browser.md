---
title: "xk6-browser"
excerpt: "xk6-browser brings browser automation and end-to-end testing to k6 while supporting core k6 features. It allows you to interact with real browsers and collect frontend metrics as part of your k6 tests."
---

[xk6-browser](https://github.com/grafana/xk6-browser) brings browser automation and end-to-end web testing to k6 while supporting core k6 features. It adds browser-level scripting APIs to interact with real browsers and collect frontend metrics as part of your k6 tests.

## Installation

xk6-browser is currently being developed as a [k6 extension](/extensions). You have to run a k6 version built with the browser extension to use the [browser-level APIs](#browser-level-apis) in your k6 tests.

### Download a release binary

The quickest way to get started is to [download a release binary from GitHub](https://github.com/grafana/xk6-browser/releases).

### Build from source

If you're more adventurous or want to get the latest changes of the xk6-browser extension, you can also build from source. 

<InstallationInstructions extensionUrl="github.com/grafana/xk6-browser"/>

## Your First Test

The first step is to import the `chromium` [BrowserType](/javascript-api/xk6-browser/browsertype), and use its `launch` method to start up a Chromium [Browser](/javascript-api/xk6-browser/browser) process (which is currently the only available `BrowserType`). After it starts, you can interact with it using the [browser-level APIs](#browser-level-apis).

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch({
    headless: false,
    slowMo: '500ms',
  });

  const context = browser.newContext();
  const page = context.newPage();
  page.goto('https://test.k6.io/browser.php/');
  page.screenshot({ path: `example-chromium.png` });

  page.close();
  browser.close();
}
```

</CodeGroup>


## Module Properties

Listed in the table are the importable properties from the top level module (`'k6/x/browser'`).

| Property | Description                                                                                                                                                                                                                         |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| chromium   | A [BrowserType](/javascript-api/xk6-browser/browsertype) to launch tests in a Chromium-based browser.                                                                                                                                     |
| devices    | Returns predefined emulation settings for many end-user devices; see the list of [supported devices](#supported-devices). It can be used to simulate browser behavior on a mobile device. See the [example here](#devices-example). |
| version    | Returns the version number of xk6-browser.                                                                                                                                                                                          |

### Supported Devices

These are the supported devices for simulating browser behavior on mobile devices. Use the names exactly as listed. To test in landscape mode, add `" landscape"` to the end of the name e.g. `"iPad landscape"`.

|                     |                 |                |                     |
|---------------------|-----------------|----------------|---------------------|
| Blackberry PlayBook | BlackBerry Z30  | Galaxy Note 3  | Galaxy Note II      |
| Galaxy S III        | Galaxy S5       | iPad           | iPad Mini           |
| iPad Pro            | iPhone 4        | iPhone 5       | iPhone 6            |
| iPhone 6 Plus       | iPhone 7        | iPhone 7 Plus  | iPhone 8            |
| iPhone 8 Plus       | iPhone SE       | iPhone X       | iPhone XR           |
| JioPhone 2          | Kindle Fire HDX | LG Optimus L70 | Microsoft Lumia 550 |
| Microsoft Lumia 950 | Nexus 10        | Nexus 4        | Nexus 5             |
| Nexus 5X            | Nexus 6         | Nexus 6P       | Nexus 7             |
| Nokia Lumia 520     | Nokia N9        | Pixel 2        | Pixel 2 XL          |

### Devices Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
import { chromium, devices } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch({ headless: false });
  const iphoneX = devices['iPhone X'];
  const context = browser.newContext(iphoneX);
  const page = context.newPage();

  page.goto('https://test.k6.io/browser.php/', {
    waitUntil: 'networkidle',
  });
  
  page.close();
  browser.close();
}
```

</CodeGroup>


## Browser-level APIs

`xk6-browser` uses [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (CDP) to instrument and interact with the browser. The `xk6-browser` APIs aims for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright). 

Note that because k6 does not run in NodeJS, `xk6-browser` APIs will slightly differ from their Playwright counterparts.

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

