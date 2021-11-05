---
title: "Frame"
excerpt: "xk6-browser: Frame Class"
---

> ️ **️⚠️ Compatibility**
> 
> The [xk6-browser API](/javascript-api/k6-x-browser/) aims for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright). 
> 
> Because k6 does not run in NodeJS, the xk6-browser API will slightly differ from its Playwright counterpart.
> 
> Note that k6 APIs are synchronous.

## Supported APIs

Support for the [`Frame` Playwright API](https://playwright.dev/docs/api/class-frame) except for the following APIs:

### Missing Playwright APIs

<Glossary>

- [$eval()](https://playwright.dev/docs/api/class-frame/#frame-eval-on-selector)
- [$$eval()](https://playwright.dev/docs/api/class-frame/#frame-eval-on-selector-all)
- [addScriptTag()](https://playwright.dev/docs/api/class-frame/#frame-add-script-tag)
- [addStyleTag()](https://playwright.dev/docs/api/class-frame/#frame-add-style-tag)
- [dragAndDrop()](https://playwright.dev/docs/api/class-frame/#frame-drag-and-drop)
- [locator()](https://playwright.dev/docs/api/class-frame/#frame-locator)
- [setInputFiles()](https://playwright.dev/docs/api/class-frame/#frame-set-input-files)

</Glossary>

🚧 `xk6-browser` is in Beta - we are working to cover more Playwright APIs.