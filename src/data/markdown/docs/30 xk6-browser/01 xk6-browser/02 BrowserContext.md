---
title: "BrowserContext"
excerpt: "xk6-browser: BrowserContext Class"
---

BrowserContexts provide a way to operate multiple independent browser sessions, with separate pages, cache and cookies. When a browser is launched, a default BrowserContext is created.

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser context.


| State | Method                                                                                       | Description                                                                                                                                            |
| - | ---------------------------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <span title="Not implemented">❌</span> | BrowserContext.addCookies(cookies) | Adds cookies into this browser context. Follow the progress in [issue #5](https://github.com/grafana/xk6-browser/issues/5). |
| <span title="Not implemented">❌</span> | BrowserContext.addInitScript(script[, arg]) | Adds a script that will be evaluated on all new pages. |
| ✅ | [BrowserContext.browser()](/javascript-api/xk6-browser/browsercontext/browser/) | Returns the browser instance that this browser context belongs to. |
| 🚧 | [BrowserContext.clearCookies()](/javascript-api/xk6-browser/browsercontext/clearcookies/) | Clears context cookies. Follow the progress in [issue #442](https://github.com/grafana/xk6-browser/issues/442). |
| 🚧 | [BrowserContext.clearPermissions()](/javascript-api/xk6-browser/browsercontext/clearpermissions) | Clears all permission overrides for the browser context. Follow the progress in [issue #443](https://github.com/grafana/xk6-browser/issues/443) |
| ✅ | [BrowserContext.close()](/javascript-api/xk6-browser/browsercontext/close) | Close the browser context and all its pages. |
| <span title="Not implemented">❌</span> | BrowserContext.cookies() | Returns all cookies used in this context. Follow the progress in [issue #6](https://github.com/grafana/xk6-browser/issues/6). |
| <span title="Not implemented">❌</span> | BrowserContext.exposeBinding(name, callback[, options]) | Add a function to the window object of all frames in this context. |
| <span title="Not implemented">❌</span> | BrowserContext.exposeFunction(name, callback) | Add a function to the window object of all frames in this context. |
| ✅ | [BrowserContext.grantPermissions(permissions[, options])](/javascript-api/xk6-browser/browsercontext/grantpermissions) | Grants specified permissions to the browser context. |
| <span title="Not implemented">❌</span> | BrowserContext.newCDPSession() | Returns a new CDP session attached to this context. |
| ✅ | [BrowserContext.newPage()](/javascript-api/xk6-browser/browsercontext/newpage) | Creates a new page inside this browser context. |
| 🚧 | [BrowserContext.pages()](/javascript-api/xk6-browser/browsercontext/pages) | Returns a list of pages inside this browser context. Follow the progress in [issue #444](https://github.com/grafana/xk6-browser/issues/444). |
| <span title="Not implemented">❌</span> | BrowserContext.route(url, handler[, options]) | Enables request interception for the provided URL to be processed by the provided handler function. |
| 🚧 | [BrowserContext.setDefaultNavigationTimeout(timeout)](/javascript-api/xk6-browser/browsercontext/setdefaultnavigationtimeout) | Sets the default navigation timeout in milliseconds. Follow the progress in [issue #445](https://github.com/grafana/xk6-browser/issues/445). |
| ✅ | [BrowserContext.setDefaultTimeout(timeout)](/javascript-api/xk6-browser/browsercontext/setdefaulttiontimeout) | Sets the default maximum timeout in milliseconds. |
| <span title="Not implemented">❌</span> | BrowserContext.setExtraHTTPHeaders(headers) | Sets extra headers that will be sent with every request initiated in the context. |
| 🚧 | [BrowserContext.setGeolocation(geolocation)](/javascript-api/xk6-browser/browsercontext/setgeolocation) | Sets the context's geolocation. Follow the progress in [issue #435](https://github.com/grafana/xk6-browser/issues/435). |
| ✅ | [BrowserContext.setOffline(offline)](/javascript-api/xk6-browser/browsercontext/setoffline) | Toggles the browser's connectivity on/off. |
| <span title="Not implemented">❌</span> | BrowserContext.storageState([options]) | Returns the storage state for this browser context, containing current cookies and local storage snapshot. |
| <span title="Not implemented">❌</span> | [BrowserContext.unroute(url[, handler])](/javascript-api/xk6-browser/browsercontext/unroute) | Removes a route created with [BrowserContext.route(url, handler[, options])](/javascript-api/xk6-browser/browsercontext/route). |
| <span title="WIP: Requires async">🚧</span> | [BrowserContext.waitForEvent(event[, optionsOrPredicate])](/javascript-api/xk6-browser/browsercontext/waitforevent) | Waits for the event to fire and passes its value into the predicate function. Follow the progress in [issue #447](https://github.com/grafana/xk6-browser/issues/447). |
