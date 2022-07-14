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
| launch(browser_type, [options]) | The first argument is required and the only `browser_type` that is currently accepted is `chromium`. Below you will find a list of all possible `options`. The `options` param is optional. |

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

`xk6-browser` uses [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) to instrument and interact with the browser. The `xk6-browser` APIs aims for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright). 

Note that because k6 does not run in NodeJS, `xk6-browser` APIs will slightly differ from their Playwright counterparts.

| k6 Class |  Missing Playwright APIs |
| - |  - |
| <BWIPT /> [Browser](/javascript-api/xk6-browser/browser/) | [`on()`](https://playwright.dev/docs/api/class-browser#browser-event-disconnected) (dependent on event-loop support in k6), [`startTracing()`](https://playwright.dev/docs/api/class-browser#browser-start-tracing), [`stopTracing()`](https://playwright.dev/docs/api/class-browser#browser-stop-tracing) |
| <BWIPT /> [BrowserContext](/javascript-api/xk6-browser/browsercontext/) | [`addCookies()`](https://playwright.dev/docs/api/class-browsercontext#browsercontextaddcookiescookies), [`backgroundPages()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-background-pages), [`cookies()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-cookies), [`exposeBinding()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-binding), [`exposeFunction()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-function), [`newCDPSession()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-new-cdp-session), [`on()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-background-page) (dependent on event-loop support in k6), [`route()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-route) (dependent on event-loop support in k6), [`serviceWorkers()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-service-workers), [`storageState()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state), [`unroute()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-unroute) (dependent on event-loop support in k6), [`waitForEvent()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-wait-for-event) (dependent on event-loop support in k6), [`tracing`](https://playwright.dev/docs/api/class-browsercontext#browser-context-tracing) |
| <BWIPT /> [BrowserType](/javascript-api/xk6-browser/browsertype/) | [`connect()`](https://playwright.dev/docs/api/class-browsertype#browser-type-connect), [`connectOverCDP()`](https://playwright.dev/docs/api/class-browsertype#browser-type-connect-over-cdp), [`launchPersistentContext()`](https://playwright.dev/docs/api/class-browsertype#browsertypelaunchpersistentcontextuserdatadir-options), [`launchServer()`](https://playwright.dev/docs/api/class-browsertype#browsertypelaunchserveroptions) |
| <BWIPT /> [ElementHandle](/javascript-api/xk6-browser/elementhandle/) | [`$eval()`](https://playwright.dev/docs/api/class-elementhandle#element-handle-eval-on-selector), [`$$eval()`](https://playwright.dev/docs/api/class-elementhandle#element-handle-eval-on-selector-all), [`setInputFiles()`](https://playwright.dev/docs/api/class-elementhandle#element-handle-set-input-files) |
| <BWIPT /> [Frame](/javascript-api/xk6-browser/frame/) | [`$eval()`](https://playwright.dev/docs/api/class-frame#frame-eval-on-selector), [`$$eval()`](https://playwright.dev/docs/api/class-frame#frame-eval-on-selector-all), [`addScriptTag()`](https://playwright.dev/docs/api/class-frame#frame-add-script-tag), [`addStyleTag()`](https://playwright.dev/docs/api/class-frame#frame-add-style-tag), [`dragAndDrop()`](https://playwright.dev/docs/api/class-frame#frame-drag-and-drop), [`locator()`](https://playwright.dev/docs/api/class-frame#frame-locator), [`setInputFiles()`](https://playwright.dev/docs/api/class-frame#frame-set-input-files) |
| [JSHandle](/javascript-api/xk6-browser/jshandle) |  |
| [Keyboard](/javascript-api/xk6-browser/keyboard/) |  |
| [Mouse](/javascript-api/xk6-browser/mouse/) | |
| <BWIPT /> [Page](/javascript-api/xk6-browser/page/) | [`$eval()`](https://playwright.dev/docs/api/class-page#page-eval-on-selector), [`$$eval()`](https://playwright.dev/docs/api/class-page#page-eval-on-selector-all), [`addInitScript()`](https://playwright.dev/docs/api/class-page#page-add-init-script), [`addScriptTag()`](https://playwright.dev/docs/api/class-page#page-add-script-tag), [`addStyleTag()`](https://playwright.dev/docs/api/class-page#page-add-style-tag), [`dragAndDrop()`](https://playwright.dev/docs/api/class-page#page-drag-and-drop), [`exposeBinding()`](https://playwright.dev/docs/api/class-page#page-expose-binding), [`exposeFunction()`](https://playwright.dev/docs/api/class-page#page-expose-function), [`frame()`](https://playwright.dev/docs/api/class-page#page-frame), [`goBack()`](https://playwright.dev/docs/api/class-page#page-go-back), [`goForward()`](https://playwright.dev/docs/api/class-page#page-go-forward), [`locator()`](https://playwright.dev/docs/api/class-page#page-locator), [`on()`](https://playwright.dev/docs/api/class-page#page-event-close) (dependent on event-loop support in k6), [`pause()`](https://playwright.dev/docs/api/class-page#page-pause), [`pdf()`](https://playwright.dev/docs/api/class-page#page-pdf), [`route()`](https://playwright.dev/docs/api/class-page#page-route) (dependent on event-loop support in k6), [`unroute()`](https://playwright.dev/docs/api/class-page#page-unroute) (dependent on event-loop support in k6), [`video()`](https://playwright.dev/docs/api/class-page#page-video), [`waitForEvent()`](https://playwright.dev/docs/api/class-page#page-wait-for-event) (dependent on event-loop support in k6), [`waitForResponse()`](https://playwright.dev/docs/api/class-page#page-wait-for-response) (dependent on event-loop support in k6), [`waitForURL()`](https://playwright.dev/docs/api/class-page#page-wait-for-url) (dependent on event-loop support in k6), [`workers()`](https://playwright.dev/docs/api/class-page#page-workers) |
| <BWIPT /> [Request](/javascript-api/xk6-browser/request/) | [`failure()`](https://playwright.dev/docs/api/class-request#request-failure) (dependent on event-loop support in k6), [`postDataJSON()`](https://playwright.dev/docs/api/class-request#request-post-data-json), [`redirectFrom()`](https://playwright.dev/docs/api/class-request#request-redirected-from), [`redirectTo()`](https://playwright.dev/docs/api/class-request#request-redirected-to) |
| <BWIPT /> [Response](/javascript-api/xk6-browser/response/) | [`finished()`](https://playwright.dev/docs/api/class-response#response-finished) (dependent on event-loop support in k6) |
| [Touchscreen](/javascript-api/xk6-browser/touchscreen/) |  |

