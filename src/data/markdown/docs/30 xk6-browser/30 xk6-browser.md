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

## Launch

The first step is to launch a [Browser](/javascript-api/xk6-browser/browser). After the browser starts, you can interact with it using the [browser-level APIs](#browser-level-apis). The only accepted browser type is currently `chromium`.

| Method                         | Description                                                                                                                                                                                                         |
|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| launch(browserName, [options]) | The first parameter is required, and the only accepted `browserName` is currently `chromium`. The `options` parameter is optional. You can see a list of all possible `options` in [the options heading](#options). |

### Options

| Method            | Type     | Default | Description                                                                                                                                                                                                                                                           |
|-------------------|----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| args              | string[] | `null`  | Extra command line arguments to include when launching browser process. See [this link](https://peter.sh/experiments/chromium-command-line-switches/) for a list of Chromium arguments. Note that arguments should not start with `--` (see the [example](#example)). |
| debug             | boolean  | `false` | All CDP messages and internal fine grained logs will be logged if set to `true`.                                                                                                                                                                                      |
| devtools          | boolean  | `false` | Open up developer tools in the browser by default.                                                                                                                                                                                                                    |
| env               | string[] | `null`  | Environment variables to set before launching browser process.                                                                                                                                                                                                        |
| executablePath    | string   | `null`  | Override search for browser executable in favor of specified absolute path.                                                                                                                                                                                           |
| headless          | boolean  | `true`  | Show browser GUI or not.                                                                                                                                                                                                                                              |
| ignoreDefaultArgs | string[] | `null`  | Ignore any of the default arguments included when launching browser process.                                                                                                                                                                                          |
| proxy             | string   | `null`  | Specify to set browser's proxy config.                                                                                                                                                                                                                                |
| slowMo            | string   | `null`  | Slow down input actions and navigation by the specified time e.g. `'500ms'`.                                                                                                                                                                                          |
| timeout           | string   | `'30s'` | Default timeout to use for various actions and navigation.                                                                                                                                                                                                            |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium', {
    args: ['show-property-changed-rects'],
    debug: true,
    devtools: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false,
    slowMo: '500ms',
    timeout: '30s',
  });

  const context = browser.newContext();
  const page = context.newPage();
  page.goto('http://whatsmyuseragent.org/');
  page.screenshot({ path: `example-chromium.png` });

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
| [ElementHandle](/javascript-api/xk6-browser/elementhandle/) <BWIPT />   | Represents an in-page DOM element.                                                                                                                              |
| [Frame](/javascript-api/xk6-browser/frame/) <BWIPT />                   | Access and interact with the [`Page`](/javascript-api/xk6-browser/page/).'s `Frame`s.                                                                           |
| [JSHandle](/javascript-api/xk6-browser/jshandle)                        | Represents an in-page JavaScript object.                                                                                                                        |
| [Keyboard](/javascript-api/xk6-browser/keyboard/)                       | Used to simulate the keyboard interactions with the associated [`Page`](/javascript-api/xk6-browser/page/).                                                     |
| [Mouse](/javascript-api/xk6-browser/mouse/)                             | Used to simulate the mouse interactions with the associated [`Page`](/javascript-api/xk6-browser/page/).                                                        |
| [Page](/javascript-api/xk6-browser/page/) <BWIPT />                     | Provides methods to interact with a single tab in a [`Browser`](/javascript-api/xk6-browser/browser/).                                                          |
| [Request](/javascript-api/xk6-browser/request/) <BWIPT />               | Used to keep track of the request the [`Page`](/javascript-api/xk6-browser/page/) makes.                                                                        |
| [Response](/javascript-api/xk6-browser/response/) <BWIPT />             | Represents the response received by the [`Page`](/javascript-api/xk6-browser/page/).                                                                            |
| [Touchscreen](/javascript-api/xk6-browser/touchscreen/)                 | Used to simulate touch interactions with the associated [`Page`](/javascript-api/xk6-browser/page/).                                                            |

