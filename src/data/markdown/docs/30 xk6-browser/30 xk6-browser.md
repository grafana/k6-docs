---
title: "xk6-browser"
excerpt: "xk6-browser brings browser automation and end-to-end testing to k6 while supporting core k6 features. It allows you to interact with real browsers and collect frontend metrics as part of your k6 tests."
---

[xk6-browser](https://github.com/grafana/xk6-browser) brings browser automation and end-to-end web testing to k6 while supporting core k6 features. It adds browser-level scripting APIs to interact with real browsers and collect frontend metrics as part of your k6 tests.

<CodeGroup labels={[]}>

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium', {
    headless: false,
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

## Installation

xk6-browser is currently being developed as a [k6 extension](/extensions). You have to run a k6 version built with the browser extension to use the [browser-level APIs](#browser-level-apis) in your k6 tests.

### Download a release binary

The quickest way to get started is to [download a release binary from GitHub](https://github.com/grafana/xk6-browser/releases).

### Build from source

If you're more adventurous or want to get the latest changes of the xk6-browser extension, you can also build from source. 

<InstallationInstructions extensionUrl="github.com/grafana/xk6-browser"/>

## Launch

The first step is to launch a [Browser](/javascript-api/xk6-browser/browser). After a browser process starts up you will be able to interact with it using the [browser-level APIs](#browser-level-apis) listed below. Currently `chromium` is the only accepted browser type.

| Method                          | Description                                                                                                                                                                                 |
|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| launch(browserType, [options]) | The first argument is required and the only `browserType` that is currently accepted is `chromium`. Below you will find a list of all possible `options`. The `options` param is optional. |

### Options

| Method            | Description                                                                                                                                                                         |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| args[]            | Extra command line arguments to include when launching browser process. A list of chromium flags can be found [here](https://peter.sh/experiments/chromium-command-line-switches/). |
| debug             | All CDP messages and internal fine grained logs will be logged if set to `true`. Default is `false`.                                                                                |
| devtools          | Open up developer tools in the browser by default. Default is `false`.                                                                                                              |
| env               | Environment variables to set before launching browser process.                                                                                                                      |
| executablePath    | Override search for browser executable in favor of specified absolute path.                                                                                                         |
| headless          | Show browser GUI or not. Defaults to `true`.                                                                                                                                        |
| ignoreDefaultArgs | Ignore any of the default arguments included when launching browser process.                                                                                                        |
| proxy             | Specify to set browser's proxy config.                                                                                                                                              |
| slowMo            | Slow down input actions and navigation by specified time. By default this is off.                                                                                                   |
| timeout           | Default timeout to use for various actions and navigation. Default timeout is 30 seconds.                                                                                           |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium', {
    args: [],
    debug: true,
    devtools: true,
    env: {},
    executablePath: null,
    headless: false,
    ignoreDefaultArgs: [],
    proxy: {},
    slowMo: '500ms,
    timeout: '30s,
  });
  // perform tests against your website...
  browser.close();
}
```

</CodeGroup>

## Browser-level APIs

`xk6-browser` uses [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (CDP) to instrument and interact with the browser. The `xk6-browser` APIs aims for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright). 

Note that because k6 does not run in NodeJS, `xk6-browser` APIs will slightly differ from their Playwright counterparts.

| k6 Class |  Description |
| - |  - |
| <BWIPT /> [Browser](/javascript-api/xk6-browser/browser/) | It is the entry point for all tests. It is used to launch `BrowserContext`s and `Page`s. |
| <BWIPT /> [BrowserContext](/javascript-api/xk6-browser/browsercontext/) | It enables independent browser sessions, with separate `page`s, cache and cookies. |
| <BWIPT /> [ElementHandle](/javascript-api/xk6-browser/elementhandle/) | Represents an in-page DOM element. |
| <BWIPT /> [Frame](/javascript-api/xk6-browser/frame/) | Access and interact with the `Page`'s `Frame`s. |
| [JSHandle](/javascript-api/xk6-browser/jshandle) | Represents an in-page JavaScript object. |
| [Keyboard](/javascript-api/xk6-browser/keyboard/) | Used to simulate the keyboard interactions with the associated `Page`. |
| [Mouse](/javascript-api/xk6-browser/mouse/) | Used to simulate the mouse interactions with the associated `Page`. |
| <BWIPT /> [Page](/javascript-api/xk6-browser/page/) | `Page` provides methods to interact with a single tab in a `Browser`. |
| <BWIPT /> [Request](/javascript-api/xk6-browser/request/) | Used to keep track of the request the `Page` makes.  |
| <BWIPT /> [Response](/javascript-api/xk6-browser/response/) | Represents the response received by the `Page`. |
| [Touchscreen](/javascript-api/xk6-browser/touchscreen/) | Used to simulate touch interactions with the associated `Page`. |

