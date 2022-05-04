---
title: "BrowserType"
excerpt: "xk6-browser: BrowserType Class"
---

<BrowserCompatibility/>

BrowserType launches a new browser application or connects to an
existing one.

| Method                                                                                                 | Description                                                        |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| [❌](https://github.com/grafana/xk6-browser/issues/17) browserType.connect(wsEndPoint, [options])      | Connects to an existing browser application over the CDP protocol. |
| [❌](https://github.com/grafana/xk6-browser/issues/15) browserType.executablePath()                    | Returns the expected executable path of the browser application.   |
| [browserType.launch([options])](/javascript-api/xk6-browser/browsertype/launch)                        | Launches a browser application.                                    |
| [❌](https://github.com/grafana/xk6-browser/issues/16) launchPersistentContext(userDataDir, [options]) | Launches a browser application with a persistent browser context.  |
| ❌ name()                                                                                              | Returns the browser type name (e.g. `chromium`).                   |
