---
title: 'Chromium'
description: 'Browser module: Chromium browser type'
weight: 03
---

# Chromium

`chromium` is a browser type that you can import from the browser module (`'k6/browser'`). It lets your test attach to a Chromium-based browser that is already running, instead of one that k6 launches and manages for you.

Use it when the browser lifecycle isn't k6's to manage, for example when the browser runs in a separate container or when a third-party provider hands you a browser session. Everything else stays the same: the returned browser exposes the same [browser module API](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser#browser-module-api) as a k6-managed [`browser`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser).

| Method                                                                                                                   | Description                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [connectOverCDP(wsEndpoint)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/chromium/connectovercdp) | Attaches to an existing Chromium-based browser over the [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (CDP) and returns the [Browser](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser). |
