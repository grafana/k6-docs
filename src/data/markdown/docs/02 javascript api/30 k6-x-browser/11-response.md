---
title: "Response"
excerpt: "xk6-browser: Response Class"
---

> ️ **️⚠️ Compatibility**
> 
> The [xk6-browser API](/javascript-api/k6-x-browser/) aims for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright). 
> 
> Because k6 does not run in NodeJS, the xk6-browser API will slightly differ from its Playwright counterpart.
> 
> Note that k6 APIs are synchronous.


## Supported APIs

Support for the [`Response` Playwright API](https://playwright.dev/docs/api/class-response) except for the missing APIs listed above.

### Missing Playwright APIs

- [finished()](https://playwright.dev/docs/api/class-response/#response-finished): dependent on event-loop support in k6.