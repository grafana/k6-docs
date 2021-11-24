---
title: "BrowserContext"
excerpt: "xk6-browser: BrowserContext Class"
---

<BrowserCompatibility/>

## Supported APIs

| Method | Playwright Relevant Distinctions |
| - |  - |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-add-init-script" target="_blank">browserContext.addInitScript(script[, arg])</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-clear-cookies" target="_blank">browserContext.clearCookies()</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-clear-permissions" target="_blank">browserContext.clearPermissions()</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions" target="_blank">browserContext.grantPermissions(permissions[, options])</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-close" target="_blank">browserContext.close()</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-new-page" target="_blank">browserContext.newPage()</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-pages" target="_blank">browserContext.pages()</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout" target="_blank">browserContext.setDefaultNavigationTimeout(timeout)</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-timeout" target="_blank">browserContext.setDefaultTimeout(timeout)</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-set-geolocation" target="_blank">browserContext.setGeolocation(geolocation)</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-set-http-credentials" target="_blank">browserContext.setHTTPCredentials(httpCredentials)</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-set-offline" target="_blank">browserContext.setOffline(offline)</a> |   |

### Missing Playwright APIs

<Glossary>

- [addCookies()](https://playwright.dev/docs/api/class-browsercontext/#browsercontextaddcookiescookies)
- [backgroundPages()](https://playwright.dev/docs/api/class-browsercontext#browser-context-background-pages)
- [browser()](https://playwright.dev/docs/api/class-browsercontext#browser-context-browser)
- [cookies()](https://playwright.dev/docs/api/class-browsercontext#browser-context-cookies)
- [exposeBinding()](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-binding)
- [exposeFunction()](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-function)
- [newCDPSession()](https://playwright.dev/docs/api/class-browsercontext#browser-context-new-cdp-session)
- [serviceWorkers()](https://playwright.dev/docs/api/class-browsercontext/#browser-context-service-workers)
- [setExtraHTTPHeaders()](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-extra-http-headers)
- [storageState()](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state)
- [request](https://playwright.dev/docs/api/class-browsercontext#browser-context-request)
- [tracing](https://playwright.dev/docs/api/class-browsercontext#browser-context-tracing)

</Glossary>

The following missing APIs depends on [event-loop support in k6](https://github.com/grafana/k6/issues/882):

<Glossary>

- [on(event)](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-background-page)
- [route()](https://playwright.dev/docs/api/class-browsercontext#browser-context-route)
- [unroute()](https://playwright.dev/docs/api/class-browsercontext#browser-context-unroute)
- [waitForEvent()](https://playwright.dev/docs/api/class-browsercontext#browser-context-wait-for-event)

</Glossary>

<BrowserWIP/>

## Examples

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium', { headless: false });
  const context = browser.newContext();
  const page = context.newPage();
  page.goto('http://whatsmyuseragent.org/');
  page.close();
  browser.close();
}
```

<BrowserClassList/>