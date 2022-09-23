---
title: "xk6-browser"
excerpt: "xk6-browser brings browser automation and end-to-end testing to k6 while supporting core k6 features. It allows you to interact with real browsers and collect frontend metrics as part of your k6 tests."
---

[xk6-browser](https://github.com/grafana/xk6-browser) brings browser automation and end-to-end web testing to k6 while supporting core k6 features. It adds browser-level scripting APIs to interact with real browsers and collect frontend metrics as part of your k6 tests.

## Installation

xk6-browser is currently being developed as a [k6 extension](/extensions). You have to run a k6 version built with the browser extension to use the [browser-level APIs](#browser-level-apis) in your k6 tests.

### Download a release binary

The quickest way to get started is to [download a release binary from GitHub](https://github.com/grafana/xk6-browser/releases).

We suggest this option if you don't want to build your own binary with [xk6](https://github.com/grafana/xk6), which can be challenging in some cases.

### Build from source

If you're more adventurous or want to get the latest changes of the xk6-browser extension, you can also build a binary from source.

To build a binary with the extension, first, ensure you have installed [Go](https://golang.org/doc/install) and [Git](https://git-scm.com/). Then run the following commands in a terminal:

```bash
# Install xk6
go install go.k6.io/xk6/cmd/xk6@latest

# Build the xk6-browser binary
xk6 build --output xk6-browser --with github.com/grafana/xk6-browser

... [INFO] Build environment ready
... [INFO] Building k6
... [INFO] Build complete: xk6-browser
```

xk6 will create the `xk6-browser` binary in the current working directory.


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

### Running the Example Test

If you have downloaded the pre-built binary you will find the binary named `xk6-browser`. Using the [example](#example), create a new file (such as `browser_test.js`) in the same directory as the pre-built binary, and paste the example in that file. Now run:

```
./xk6-browser run browser_test.js
```

> Note the `./` prefix, which tells your shell to run the binary located in the current working directory. This is required on macOS and Linux, but not on Windows if you're using the `cmd.exe` shell. If you're using PowerShell, you should specify `.\xk6-browser` instead.
>
> If you installed xk6-browser via a system package, or you've placed the binary in a directory that's part of your `$PATH` environment variable, then you can omit the `./` or `.\` prefix.

## Module Properties

Listed in the table are the importable properties from the top level module (`'k6/x/browser'`).

| Property | Description                                                                                                                                                                          |
|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| chromium | A [BrowserType](/javascript-api/xk6-browser/browsertype) to launch tests in a Chromium-based browser.                                                                                |
| devices  | Returns predefined emulation settings for many end-user devices that can be used to simulate browser behavior on a mobile device. See the [devices example](#devices-example) below. |
| version  | Returns the version number of xk6-browser.                                                                                                                                           |

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
