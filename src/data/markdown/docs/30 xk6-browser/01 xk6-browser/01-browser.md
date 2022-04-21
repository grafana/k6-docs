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
- 🚧 [browser.newBrowserCDPSession()](#browser-newbrowsercdpsession)
- [browser.newContext([options])](#browser-newcontext-options)
- [browser.newPage([options])](#browser-newpage-options)
- 🚧 [browser.on()](#browser-on)
- ❌ [browser.startTracing()](#browser-starttracing)
- ❌ [browser.stopTracing()](#browser-stoptracing)
- [browser.version()](#browser-version)


## browser.close()

## browser.contexts()

## browser.isConnected()

## browser.newBrowserCDPSession()

## browser.newContext([options])

## browser.newPage([options])

## browser.on()

## browser.startTracing()

## browser.stopTracing()

## browser.version()
