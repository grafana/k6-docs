---
title: "BrowserType"
excerpt: "xk6-browser: BrowserType Class"
---

<BrowserCompatibility/>

## Supported APIs

| Method | Playwright Relevant Distintions |
| - |  - |
| <a href="https://playwright.dev/docs/api/class-browsertype#browser-type-executable-path" target="_blank" >browserType.executablePath()</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsertype#browser-type-launch" target="_blank" >browserType.launch([options])</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsertype#browser-type-launch-persistent-context" target="_blank" >browserType.launchPersistentContext(userDataDir[, options])</a> |   |
| <a href="https://playwright.dev/docs/api/class-browsertype#browser-type-name" target="_blank" >browserType.name()</a> |   |

### Missing Playwright APIs

<Glossary>

- [connect()](https://playwright.dev/docs/api/class-browsertype/#browser-type-connect)
- [connectOverCDP()](https://playwright.dev/docs/api/class-browsertype#browser-type-connect-over-cdp)
- [launchPersistentContext()](https://playwright.dev/docs/api/class-browsertype#browsertypelaunchpersistentcontextuserdatadir-options)
- [launchServer()](https://playwright.dev/docs/api/class-browsertype#browsertypelaunchserveroptions)
  
</Glossary>

🚧 `xk6-browser` is in Beta - we are working to cover more Playwright APIs.

## Examples

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium', {
    args: [], // Extra commandline arguments to include when launching browser process
    debug: true, // Log all CDP messages to k6 logging subsystem
    devtools: true, // Open up developer tools in the browser by default
    env: {}, // Environment variables to set before launching browser process
    executablePath: null, // Override search for browser executable in favor of specified absolute path
    headless: false, // Show browser UI or not
    ignoreDefaultArgs: [], // Ignore any of the default arguments included when launching browser process
    proxy: {}, // Specify to set browser's proxy config
    slowMo: '500ms', // Slow down input actions and navigations by specified time
    timeout: '30s', // Default timeout to use for various actions and navigations
  });
  browser.close();
}
```

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