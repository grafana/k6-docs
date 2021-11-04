---
title: "Browser"
excerpt: "xk6-browser: Browser Class"
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
| [browser.close()](https://playwright.dev/docs/api/class-browser#browser-close) |   |
| [browser.contexts()](https://playwright.dev/docs/api/class-browser#browser-contexts) |   |
| [browser.isConnected()](https://playwright.dev/docs/api/class-browser#browser-is-connected) |   |
| [browser.newContext([options])](https://playwright.dev/docs/api/class-browser#browser-new-context) |   |
| [browser.newPage([options])](https://playwright.dev/docs/api/class-browser#browser-new-page) |   |
| [browser.version()](https://playwright.dev/docs/api/class-browser#browser-version) |   |

### Missing Playwright APIs

- [on()](https://playwright.dev/docs/api/class-browsertype/#browser-type-connect): dependent on event-loop support in k6.
- [startTracing()](https://playwright.dev/docs/api/class-browser#browser-start-tracing)
- [stopTracing()](https://playwright.dev/docs/api/class-browser#browser-stop-tracing)

🚧 `xk6-browser` is in Beta - we are working to cover more Playwright APIs.

## Examples

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium');
  const context = browser.newContext({
    acceptDownloads: false, // Whether to accepts downloading of files by defaul
    bypassCSP: false, // Whether to bypass content-security-policy rules
    colorScheme: 'light', // Preferred color scheme of browser ('light', 'dark' or 'no-preference')
    deviceScaleFactor: 1.0, // Device scaling factor
    extraHTTPHeaders: { name: 'value' }, // HTTP headers to always include in HTTP requests
    geolocation: { latitude: 0.0, longitude: 0.0 }, // Geolocation to use
    hasTouch: false, // Simulate device with touch or not
    httpCredentials: { username: null, password: null }, // Credentials to use if encountering HTTP authentication
    ignoreHTTPSErrors: false, // Ignore HTTPS certificate issues
    isMobile: false, // Simulate mobile device or not
    javaScriptEnabled: true, // Should JavaScript be enabled or not
    locale: 'en-US', // The locale to set
    offline: false, // Whether to put browser in offline or not
    permissions: ['midi'], // Permisions to grant by default
    reducedMotion: 'no-preference', // Indicate to browser whether it should try to reduce motion/animations
    screen: { width: 800, height: 600 }, // Set default screen size
    timezoneID: '', // Set default timezone to use
    userAgent: '', // Set default user-agent string to use
    viewport: { width: 800, height: 600 }, // Set default viewport to use
  });
  browser.close();
}
```