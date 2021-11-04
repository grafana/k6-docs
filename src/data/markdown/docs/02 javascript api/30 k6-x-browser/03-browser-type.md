---
title: "BrowserType"
excerpt: "xk6-browser: BrowserType Class"
---

> ️ **️⚠️ Compatibility**
> 
> The [xk6-browser API](/javascript-api/k6-x-browser/) aims for rough compatibility with the [Playwright API for NodeJS](https://playwright.dev/docs/api/class-playwright). 
> 
> Because k6 does not run in NodeJS, the xk6-browser API will slightly differ from its Playwright counterpart.
> 
> Note that k6 APIs are synchronous.

## Supported APIs

| Method | Playwright Relevant Distintions |
| - |  - |
| [browserType.executablePath()](https://playwright.dev/docs/api/class-browsertype#browser-type-executable-path) |   |
| [browserType.launch([options])](https://playwright.dev/docs/api/class-browsertype#browser-type-launch) |   |
| [browserType.launchPersistentContext(userDataDir[, options])](https://playwright.dev/docs/api/class-browsertype#browser-type-launch-persistent-context) |   |
| [browserType.name()](https://playwright.dev/docs/api/class-browsertype#browser-type-name) |   |

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