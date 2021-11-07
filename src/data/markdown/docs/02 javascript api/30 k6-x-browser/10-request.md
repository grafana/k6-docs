---
title: "Request"
excerpt: "xk6-browser: Request Class"
---

<BrowserCompatibility/>

## Supported APIs

Support for the [`Request` Playwright API](https://playwright.dev/docs/api/class-request) except for the following APIs:

### Missing Playwright APIs

- [finished()](https://playwright.dev/docs/api/class-request#request-failure): dependent on event-loop support in k6.
- [postDataJSON()](https://playwright.dev/docs/api/class-request/#request-post-data-json)
- [redirectedFrom()](https://playwright.dev/docs/api/class-request/#request-redirected-from)
- [redirectedTo()](https://playwright.dev/docs/api/class-request/#request-redirected-to)

<BrowserWIP/>

<BrowserClassList/>