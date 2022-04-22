---
title: "launcher"
excerpt: "xk6-browser: launcher Object"
---

This object can be used to launch or connect to Chromium, returning instances of [Browser](/javascript-api/xk6-browser/browser/).

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

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium', { headless: false });
  const context = browser.newContext();
  const page = context.newPage();
  page.goto('http://whatsmyuseragent.org/');
  page.close();
  browser.close();
}
```
