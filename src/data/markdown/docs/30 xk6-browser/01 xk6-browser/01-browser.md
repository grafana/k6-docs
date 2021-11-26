---
title: "Browser"
excerpt: "xk6-browser: Browser Class"
---

<BrowserCompatibility/>

```javascript
import launcher from 'k6/x/browser';
export default function () {
  const browser = launcher.launch('chromium');
  const context = browser.newContext();
  const page = context.newPage();
  page.close();
  browser.close();
}
```

- [browser.close()](#browser-close)
- [browser.contexts()](#browser-contexts)
- [browser.isConnected()](#browser-isconnected)
- [browser.newContext([options])](#browser-newcontext-options)
- [browser.newPage([options])](#browser-newpage-options)
- [browser.version()](#browser-version)
- 🚧 [browser.newBrowserCDPSession()](#missing-playwright-apis)
- 🚧 [browser.on()](#missing-playwright-apis)
- ❌ [browser.startTracing()](#missing-playwright-apis)
- ❌ [browser.stopTracing()](#missing-playwright-apis)




## browser.close()

hola is close

## browser.contexts()

hola is contexts

## browser.isConnected()

hola is connected

## browser.newContext([options])

hola new context 

## browser.newPage([options])

hola new page

## browser.version()

hola version


### Missing Playwright APIs

<Glossary>

- [on()](https://playwright.dev/docs/api/class-browsertype/#browser-type-connect)
- [newBrowserCDPSession()](https://playwright.dev/docs/api/class-browser#browser-new-browser-cdp-session)
- [startTracing()](https://playwright.dev/docs/api/class-browser#browser-start-tracing)
- [stopTracing()](https://playwright.dev/docs/api/class-browser#browser-stop-tracing)

</Glossary>