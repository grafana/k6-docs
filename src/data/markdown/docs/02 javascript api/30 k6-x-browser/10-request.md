---
title: "Request"
excerpt: "xk6-browser: Request Class"
---

> ️ **️⚠️ Compatibility**
> 
> The [xk6-browser API](/javascript-api/k6-x-browser/) aims for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright). 
> 
> Because k6 does not run in NodeJS, the xk6-browser API will slightly differ from its Playwright counterpart.
> 
> Note that k6 APIs are synchronous.

## Supported APIs

Support for the [`Request` Playwright API](https://playwright.dev/docs/api/class-request) except for the following APIs:

### Missing Playwright APIs

- [finished()](https://playwright.dev/docs/api/class-request#request-failure): dependent on event-loop support in k6.
- [postDataJSON()](https://playwright.dev/docs/api/class-request/#request-post-data-json)
- [redirectedFrom()](https://playwright.dev/docs/api/class-request/#request-redirected-from)
- [redirectedTo()](https://playwright.dev/docs/api/class-request/#request-redirected-to)

🚧 `xk6-browser` is in Beta - we are working to cover more Playwright APIs.

### Browser APIs

<Glossary>

-  [Browser](/javascript-api/k6-x-browser/browser/)
-  [BrowserContext](/javascript-api/k6-x-browser/browsercontext/)
-  [BrowserType](/javascript-api/k6-x-browser/browsertype/)
-  [ElementHandle](/javascript-api/k6-x-browser/elementhandle/)
-  [Frame](/javascript-api/k6-x-browser/frame/)
-  [JSHandle](/javascript-api/k6-x-browser/jshandle)
-  [Keyboard](/javascript-api/k6-x-browser/keyboard)
-  [Mouse](/javascript-api/k6-x-browser/mouse/)
-  [Page](/javascript-api/k6-x-browser/page/)
-  [Request](/javascript-api/k6-x-browser/request/)
-  [Response](/javascript-api/k6-x-browser/response/)
-  [Browser](/javascript-api/k6-x-browser/browser/)
-  [Touchscreen](/javascript-api/k6-x-browser/touchscreen/)

</Glossary>