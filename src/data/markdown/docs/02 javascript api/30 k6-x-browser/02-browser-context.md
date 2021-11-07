---
title: "BrowserContext"
excerpt: "xk6-browser: BrowserContext Class"
---

<BrowserCompatibility/>

## Supported APIs

| Method | Playwright Relevant Distintions |
| - |  - |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-add-init-script" target="_blank">browserContext.addInitScript(script[, arg])</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-close" target="_blank" >browserContext.close()</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-new-page" target="_blank" >browserContext.newPage()</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-pages" target="_blank" >browserContext.pages()</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout" target="_blank" >browserContext.setDefaultNavigationTimeout(timeout)</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsercontext#browser-context-request" target="_blank" >browserContext.request</a> |   |

### Missing Playwright APIs

<Glossary>

- [addCookies()](https://playwright.dev/docs/api/class-browsercontext/#browsercontextaddcookiescookies)
- [backgroundPages()](https://playwright.dev/docs/api/class-browsercontext#browser-context-background-pages)
- [cookies()](https://playwright.dev/docs/api/class-browsercontext#browser-context-cookies)
- [exposeBinding()](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-binding)
- [exposeFunction()](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-function)
- [newCDPSession()](https://playwright.dev/docs/api/class-browsercontext#browser-context-new-cdp-session)
- [serviceWorkers()](https://playwright.dev/docs/api/class-browsercontext/#browser-context-service-workers)
- [storageState()](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state)
- [tracing](https://playwright.dev/docs/api/class-browsercontext#browser-context-tracing)

</Glossary>

The next APIs depends on event-loop support in k6:

<Glossary>

- [on()](https://playwright.dev/docs/api/class-browsercontext/#browser-context-event-background-page)
- [route()](https://playwright.dev/docs/api/class-browsercontext/#browser-context-route)
- [unroute()](https://playwright.dev/docs/api/class-browsercontext#browser-context-unroute)
- [waitForEvent()](https://playwright.dev/docs/api/class-browsercontext#browser-context-wait-for-event)

</Glossary>

🚧 `xk6-browser` is in Beta - we are working to cover more Playwright APIs.

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