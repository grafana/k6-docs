---
title: "BrowserContext"
excerpt: "Browser module: BrowserContext Class"
---

`BrowserContext`s provide a way to operate multiple independent sessions, with separate pages, cache, and cookies. A default `BrowserContext` is created when a [Browser](/javascript-api/xk6-browser/api/browser) is launched.

The [Browser](/javascript-api/xk6-browser/api/browser) type is used to create a new `BrowserContext`.

If a [page](/javascript-api/xk6-browser/api/page) opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's `BrowserContext`.


| Method                                                                                                                                          | Description                                                                                                |
|-------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| [BrowserContext.browser()](/javascript-api/xk6-browser/api/browsercontext/browser/)                                                                 | Returns the [Browser](/javascript-api/xk6-browser/api/browser) instance that this `BrowserContext` belongs to. |
| [BrowserContext.clearCookies()](/javascript-api/xk6-browser/api/browsercontext/clearcookies/) <BWIPT id="442"/>                                     | Clear the `BrowserContext`'s cookies.                                                                      |
| [BrowserContext.clearPermissions()](/javascript-api/xk6-browser/api/browsercontext/clearpermissions) <BWIPT id="443"/>                              | Clears all permission overrides for the `BrowserContext`.                                                  |
| [BrowserContext.close()](/javascript-api/xk6-browser/api/browsercontext/close)                                                                      | Close the `BrowserContext` and all its [page](/javascript-api/xk6-browser/api/page)s.                          |
| [BrowserContext.grantPermissions(permissions[, options])](/javascript-api/xk6-browser/api/browsercontext/grantpermissions)                          | Grants specified permissions to the `BrowserContext`.                                                      |
| [BrowserContext.newPage()](/javascript-api/xk6-browser/api/browsercontext/newpage)                                                                  | Uses the `BrowserContext` to create a new [Page](/javascript-api/xk6-browser/api/page/) and returns it.        |
| [BrowserContext.pages()](/javascript-api/xk6-browser/api/browsercontext/pages) <BWIPT id="444"/>                                                    | Returns a list of [page](/javascript-api/xk6-browser/api/page)s that belongs to the `BrowserContext`.          |
| [BrowserContext.setDefaultNavigationTimeout(timeout)](/javascript-api/xk6-browser/api/browsercontext/setdefaultnavigationtimeout) <BWIPT id="445"/> | Sets the default navigation timeout in milliseconds.                                                       |
| [BrowserContext.setDefaultTimeout(timeout)](/javascript-api/xk6-browser/api/browsercontext/setdefaulttimeout) <BWIPT id="456"/>                     | Sets the default maximum timeout for all methods accepting a timeout option in milliseconds.               |
| [BrowserContext.setGeolocation(geolocation)](/javascript-api/xk6-browser/api/browsercontext/setgeolocation) <BWIPT id="435"/>                       | Sets the `BrowserContext`'s geolocation.                                                                   |
| [BrowserContext.setOffline(offline)](/javascript-api/xk6-browser/api/browsercontext/setoffline)                                                     | Toggles the `BrowserContext`'s connectivity on/off.                                                        |
| [BrowserContext.waitForEvent(event[, optionsOrPredicate])](/javascript-api/xk6-browser/api/browsercontext/waitforevent) <BWIPT id="447"/>           | Waits for the event to fire and passes its value into the predicate function.                              |
