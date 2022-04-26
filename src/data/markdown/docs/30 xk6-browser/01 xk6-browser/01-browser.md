---
title: "Browser"
excerpt: "xk6-browser: Browser Class"
---

<BrowserCompatibility/>

A Browser is created via [browserType.launch([options])](03-browser-type.md#launch). An example of using a Browser to create a [Page](09-page.md):

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium');
  const context = browser.newContext();
  const page = context.newPage();
  const res = page.goto('https://test.k6.io/');
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
- 🚧 [browser.newBrowserCDPSession()](#browser-newbrowsercdpsession)
- 🚧 [browser.on()](#browser-on)
- ❌ [browser.startTracing()](#browser-starttracing)
- ❌ [browser.stopTracing()](#browser-stoptracing)


## browser.close()

In case this browser is obtained using [browserType.launch([options])](03-browser-type.md#launch), closes the browser and all of its pages (if any were opened).

In case this browser is connected to, clears all created contexts belonging to this browser and disconnects from the browser server.

The [Browser](01-browser.md) object itself is considered to be disposed and cannot be used anymore.

## browser.contexts()

## browser.isConnected()

## browser.newBrowserCDPSession()

## browser.newContext([options])

## browser.newPage([options])

## browser.on()

## browser.startTracing()

## browser.stopTracing()

## browser.version()
