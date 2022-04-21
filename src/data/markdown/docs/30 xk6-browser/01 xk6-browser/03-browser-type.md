---
title: "BrowserType"
excerpt: "xk6-browser: BrowserType Class"
---

<BrowserCompatibility/>

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

- [browserType.connect()](#browsertype-connect)
- [browserType.connectOverCDP()](#browsertype-connectovercdp)
- [browserType.executablePath()](#browsertype-executablepath)
- [browserType.launch([options])](#browsertype-launch-options)
- [browserType.launchPersistentContext()](#browsertype-launchpersistentcontext)
- [browserType.launchServer()](#browsertype-launchserver)
- [browserType.name()](#browsertype-name)


## browserType.connect()

## browserType.connectOverCDP()

## browserType.executablePath()

## browserType.launch([options])

## browserType.launchPersistentContext()

## browserType.launchServer()

## browserType.name()

