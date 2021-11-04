---
title: "BrowserContext"
excerpt: "xk6-browser: BrowserContext Class"
---

> ️ **️⚠️ Compatibility**
> 
> The [xk6-browser API](/javascript-api/k6-x-browser/) aims for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright). 
> 
> Because k6 does not run in NodeJS, the xk6-browser API will slightly differ from its Playwright counterpart.
> 
> Note that k6 APIs are synchronous.

### Supported APIs

| Method | Playwright Relevant Distintions |
| - |  - |
| [browserContext.addInitScript(script[, arg])](https://playwright.dev/docs/api/class-browsercontext#browser-context-add-init-script) |   |
| [browserContext.close()](https://playwright.dev/docs/api/class-browsercontext#browser-context-close) |   |
| [browserContext.newPage()](https://playwright.dev/docs/api/class-browsercontext#browser-context-new-page) |   |
| [browserContext.pages()](https://playwright.dev/docs/api/class-browsercontext#browser-context-pages) |   |
| [browserContext.setDefaultNavigationTimeout(timeout)](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-default-navigation-timeout) |   |
| [browserContext.request](https://playwright.dev/docs/api/class-browsercontext#browser-context-request) |   |

🚧 `xk6-browser` is in Beta - we are working to cover more Playwright APIs.

### Example


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