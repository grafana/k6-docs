---
title: "BrowserContext"
excerpt: "xk6-browser: BrowserContext Class"
---

`BrowserContext`s provide a way to operate multiple independent sessions, with separate pages, cache, and cookies. A default `BrowserContext` is created when a [Browser](/javascript-api/xk6-browser/browser) is launched.

The [Browser](/javascript-api/xk6-browser/browser) type is used to create a new `BrowserContext`.

If a [page](/javascript-api/xk6-browser/page) opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's `BrowserContext`.


| Method                                                                                                                                          | Description                                                                                                |
|-------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| [BrowserContext.browser()](/javascript-api/xk6-browser/browsercontext/browser/)                                                                 | Returns the [Browser](/javascript-api/xk6-browser/browser) instance that this `BrowserContext` belongs to. |
| <BWIPT id="442"/> [BrowserContext.clearCookies()](/javascript-api/xk6-browser/browsercontext/clearcookies/)                                     | Clear the `BrowserContext`'s cookies.                                                                      |
| <BWIPT id="443"/> [BrowserContext.clearPermissions()](/javascript-api/xk6-browser/browsercontext/clearpermissions)                              | Clears all permission overrides for the `BrowserContext`.                                                  |
| [BrowserContext.close()](/javascript-api/xk6-browser/browsercontext/close)                                                                      | Close the `BrowserContext` and all its [page](/javascript-api/xk6-browser/page)s.                          |
| [BrowserContext.grantPermissions(permissions[, options])](/javascript-api/xk6-browser/browsercontext/grantpermissions)                          | Grants specified permissions to the `BrowserContext`.                                                      |
| [BrowserContext.newPage()](/javascript-api/xk6-browser/browsercontext/newpage)                                                                  | Uses the `BrowserContext` to create a new [Page](/javascript-api/xk6-browser/page/) and returns it.        |
| <BWIPT id="444"/> [BrowserContext.pages()](/javascript-api/xk6-browser/browsercontext/pages)                                                    | Returns a list of [page](/javascript-api/xk6-browser/page)s that belongs to the `BrowserContext`.          |
| <BWIPT id="445"/> [BrowserContext.setDefaultNavigationTimeout(timeout)](/javascript-api/xk6-browser/browsercontext/setdefaultnavigationtimeout) | Sets the default navigation timeout in milliseconds.                                                       |
| <BWIPT id="456"/> [BrowserContext.setDefaultTimeout(timeout)](/javascript-api/xk6-browser/browsercontext/setdefaulttimeout)                     | Sets the default maximum timeout for all methods accepting a timeout option in milliseconds.               |
| <BWIPT id="435"/> [BrowserContext.setGeolocation(geolocation)](/javascript-api/xk6-browser/browsercontext/setgeolocation)                       | Sets the `BrowserContext`'s geolocation.                                                                   |
| [BrowserContext.setOffline(offline)](/javascript-api/xk6-browser/browsercontext/setoffline)                                                     | Toggles the `BrowserContext`'s connectivity on/off.                                                        |
| <BWIPT id="447"/> [BrowserContext.waitForEvent(event[, optionsOrPredicate])](/javascript-api/xk6-browser/browsercontext/waitforevent)           | Waits for the event to fire and passes its value into the predicate function.                              |
