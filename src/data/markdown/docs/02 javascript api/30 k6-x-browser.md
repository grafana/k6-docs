---
title: "k6/x/browser"
excerpt: "xk6-browser brings browser automation and end-to-end testing to k6 while supporting core k6 features. You can now interact with the browser and collect frontend metrics as part of your k6 tests."
---

[xk6-browser](https://github.com/grafana/xk6-browser) brings browser automation and end-to-end testing to k6 while supporting core k6 features. You can now interact with the browser and collect frontend metrics as part of your k6 tests.

<CodeGroup labels={[]}>

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium', { headless: false });
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

xk6-browser was initially developed as a [k6 extension](/extensions). You have to run a k6 version built with the browser extension to use the [xk6-browser API](#browser-apis) in your k6 tests.

```bash
# install xk6
go install github.com/grafana/xk6/cmd/xk6@latest

# build the k6 binary
xk6 build --with github.com/grafana/xk6-browser
```

## Browser APIs

`xk6-browser` uses [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) to instrument and interact with the browser. The `xk6-browser` APIs aims for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright). 

Note that because k6 does not run in NodeJS, an `xk6-browser` API will slightly differ from its Playwright counterpart.

<Glossary>

- 🚧  [Browser](/javascript-api/k6-x-browser/browser/)
- 🚧  [BrowserContext](/javascript-api/k6-x-browser/browsercontext/)
- 🚧  [BrowserType](/javascript-api/k6-x-browser/browsertype/)
- 🚧  [ElementHandle](/javascript-api/k6-x-browser/elementhandle/)
- 🚧  [Frame](/javascript-api/k6-x-browser/frame/)
- ✅  [JSHandle](/javascript-api/k6-x-browser/jshandle)
- ✅  [Keyboard](/javascript-api/k6-x-browser/keyboard)
- ✅  [Mouse](/javascript-api/k6-x-browser/mouse/)
- 🚧  [Page](/javascript-api/k6-x-browser/page/)
- 🚧  [Request](/javascript-api/k6-x-browser/request/)
- 🚧  [Response](/javascript-api/k6-x-browser/response/)
- 🚧  [Browser](/javascript-api/k6-x-browser/browser/)
- ✅  [Touchscreen](/javascript-api/k6-x-browser/touchscreen/)

</Glossary>

TODO: choose whether the above or below option, or any variance.

| k6 Class |  Missing Playwright APIs |
| - |  - |
| [Browser](/javascript-api/k6-x-browser/browser/) | [`on()`](https://playwright.dev/docs/api/class-browser#browser-event-disconnected) (dependent on event-loop support in k6), [`startTracing()`](https://playwright.dev/docs/api/class-browser#browser-start-tracing), [`stopTracing()`](https://playwright.dev/docs/api/class-browser#browser-stop-tracing) |
| [BrowserContext](/javascript-api/k6-x-browser/browsercontext/) | [`addCookies()`](https://playwright.dev/docs/api/class-browsercontext#browsercontextaddcookiescookies), [`backgroundPages()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-background-pages), [`cookies()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-cookies), [`exposeBinding()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-binding), [`exposeFunction()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-function), [`newCDPSession()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-new-cdp-session), [`on()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-background-page) (dependent on event-loop support in k6), [`route()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-route) (dependent on event-loop support in k6), [`serviceWorkers()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-service-workers), [`storageState()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state), [`unroute()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-unroute) (dependent on event-loop support in k6), [`waitForEvent()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-wait-for-event) (dependent on event-loop support in k6), [`tracing`](https://playwright.dev/docs/api/class-browsercontext#browser-context-tracing) |
| [BrowserType](/javascript-api/k6-x-browser/browsertype/) | [`connect()`](https://playwright.dev/docs/api/class-browsertype#browser-type-connect), [`connectOverCDP()`](https://playwright.dev/docs/api/class-browsertype#browser-type-connect-over-cdp), [`launchPersistentContext()`](https://playwright.dev/docs/api/class-browsertype#browsertypelaunchpersistentcontextuserdatadir-options), [`launchServer()`](https://playwright.dev/docs/api/class-browsertype#browsertypelaunchserveroptions) |
| [ElementHandle](/javascript-api/k6-x-browser/elementhandle/) | [`$eval()`](https://playwright.dev/docs/api/class-elementhandle#element-handle-eval-on-selector), [`$$eval()`](https://playwright.dev/docs/api/class-elementhandle#element-handle-eval-on-selector-all), [`screenshot()`](https://playwright.dev/docs/api/class-elementhandle#element-handle-screenshot), [`setInputFiles()`](https://playwright.dev/docs/api/class-elementhandle#element-handle-set-input-files) |
| [Frame](/javascript-api/k6-x-browser/frame/) | [`$eval()`](https://playwright.dev/docs/api/class-frame#frame-eval-on-selector), [`$$eval()`](https://playwright.dev/docs/api/class-frame#frame-eval-on-selector-all), [`addScriptTag()`](https://playwright.dev/docs/api/class-frame#frame-add-script-tag), [`addStyleTag()`](https://playwright.dev/docs/api/class-frame#frame-add-style-tag), [`dragAndDrop()`](https://playwright.dev/docs/api/class-frame#frame-drag-and-drop), [`locator()`](https://playwright.dev/docs/api/class-frame#frame-locator), [`setInputFiles()`](https://playwright.dev/docs/api/class-frame#frame-set-input-files) |
| [JSHandle](/javascript-api/k6-x-browser/jshandle) |  |
| [Keyboard](/javascript-api/k6-x-browser/elementhandle/) |  |
| [Mouse](/javascript-api/k6-x-browser/mouse/) | |
| [Page](/javascript-api/k6-x-browser/page/) | [`$eval()`](https://playwright.dev/docs/api/class-page#page-eval-on-selector), [`$$eval()`](https://playwright.dev/docs/api/class-page#page-eval-on-selector-all), [`addInitScript()`](https://playwright.dev/docs/api/class-page#page-add-init-script), [`addScriptTag()`](https://playwright.dev/docs/api/class-page#page-add-script-tag), [`addStyleTag()`](https://playwright.dev/docs/api/class-page#page-add-style-tag), [`dragAndDrop()`](https://playwright.dev/docs/api/class-page#page-drag-and-drop), [`exposeBinding()`](https://playwright.dev/docs/api/class-page#page-expose-binding), [`exposeFunction()`](https://playwright.dev/docs/api/class-page#page-expose-function), [`frame()`](https://playwright.dev/docs/api/class-page#page-frame), [`goBack()`](https://playwright.dev/docs/api/class-page#page-go-back), [`goForward()`](https://playwright.dev/docs/api/class-page#page-go-forward), [`locator()`](https://playwright.dev/docs/api/class-page#page-locator), [`on()`](https://playwright.dev/docs/api/class-page#page-event-close) (dependent on event-loop support in k6), [`pause()`](https://playwright.dev/docs/api/class-page#page-pause), [`pdf()`](https://playwright.dev/docs/api/class-page#page-pdf), [`route()`](https://playwright.dev/docs/api/class-page#page-route) (dependent on event-loop support in k6), [`unroute()`](https://playwright.dev/docs/api/class-page#page-unroute) (dependent on event-loop support in k6), [`video()`](https://playwright.dev/docs/api/class-page#page-video), [`waitForEvent()`](https://playwright.dev/docs/api/class-page#page-wait-for-event) (dependent on event-loop support in k6), [`waitForResponse()`](https://playwright.dev/docs/api/class-page#page-wait-for-response) (dependent on event-loop support in k6), [`waitForURL()`](https://playwright.dev/docs/api/class-page#page-wait-for-url) (dependent on event-loop support in k6), [`workers()`](https://playwright.dev/docs/api/class-page#page-workers) |
| [Request](/javascript-api/k6-x-browser/request/) | [`failure()`](https://playwright.dev/docs/api/class-request#request-failure) (dependent on event-loop support in k6), [`postDataJSON()`](https://playwright.dev/docs/api/class-request#request-post-data-json), [`redirectFrom()`](https://playwright.dev/docs/api/class-request#request-redirected-from), [`redirectTo()`](https://playwright.dev/docs/api/class-request#request-redirected-to) |
| [Response](/javascript-api/k6-x-browser/response/) | [`finished()`](https://playwright.dev/docs/api/class-response#response-finished) (dependent on event-loop support in k6) |
| [Touchscreen](/javascript-api/k6-x-browser/touchscreen/) |  |

The following Playwright APIs are not supported yet:

<Glossary>

- [Accessibility](https://playwright.dev/docs/api/class-accessibility)
- [BrowserServer](https://playwright.dev/docs/api/class-browserserver)
- [CDPSession](https://playwright.dev/docs/api/class-cdpsession)
- [ConsoleMessage](https://playwright.dev/docs/api/class-consolemessage)
- [Coverage](https://playwright.dev/docs/api/class-coverage)
- [Dialog](https://playwright.dev/docs/api/class-dialog)
- [Download](https://playwright.dev/docs/api/class-download)
- [FetchRequest](https://playwright.dev/docs/api/class-fetchrequest)
- [FetchResponse](https://playwright.dev/docs/api/class-fetchresponse)
- [FileChooser](https://playwright.dev/docs/api/class-filechooser)
- [Locator](https://playwright.dev/docs/api/class-locator)
- [Logger](https://playwright.dev/docs/api/class-logger) 
- [Route](https://playwright.dev/docs/api/class-route)
- [Selectors](https://playwright.dev/docs/api/class-selectors)
- [Tracing](https://playwright.dev/docs/api/class-tracing)
- [Video](https://playwright.dev/docs/api/class-video)
- [WebSocket](https://playwright.dev/docs/api/class-websocket)
- [Worker](https://playwright.dev/docs/api/class-worker)

</Glossary>

