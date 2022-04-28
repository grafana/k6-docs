---
title: 'Browser.on()'
excerpt: 'xk6-browser: Browser.on method'
---

<BrowserCompatibility/>

Emitted when Browser gets disconnected from the browser application. This might happen because of one of the following:

* Browser application is closed or crashed.
* The [browser.close()](#browser-close) method was called.

| Parameter | Type   | Description                                        |
| --------- | ------ | -------------------------------------------------- |
| event     | string | The only accepted event value is `'disconnected'`. |

### Returns

| Type    | Description                                                                     |
| ------- | ------------------------------------------------------------------------------- |
| promise | On returns a Promise that is resolved when the browser process is disconnected. |
