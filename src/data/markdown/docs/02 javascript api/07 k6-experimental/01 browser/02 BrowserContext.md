---
title: "BrowserContext"
excerpt: "Browser module: BrowserContext Class"
---

`BrowserContext`s provide a way to operate multiple independent sessions, with separate pages, cache, and cookies. A default `BrowserContext` is created when a [Browser](/javascript-api/k6-experimental/browser/browser-class/) is launched.

The [Browser](/javascript-api/k6-experimental/browser/browser-class/) type is used to create a new `BrowserContext`.

If a [page](/javascript-api/k6-experimental/browser/page/) opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's `BrowserContext`.


| Method                                                                                                                                          | Description                                                                                                |
|-------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| [BrowserContext.addCookies()](/javascript-api/k6-experimental/browser/browsercontext/addcookies/)                                                                    | Adds cookies into the `BrowserContext`. |
| [BrowserContext.clearCookies()](/javascript-api/k6-experimental/browser/browsercontext/clearcookies/) <BWIPT id="442"/>                                     | Clear the `BrowserContext`'s cookies.                                                                      |
| [BrowserContext.clearPermissions()](/javascript-api/k6-experimental/browser/browsercontext/clearpermissions) <BWIPT id="443"/>                              | Clears all permission overrides for the `BrowserContext`.                                                  |
| [BrowserContext.close()](/javascript-api/k6-experimental/browser/browsercontext/close)                                                                      | Close the `BrowserContext` and all its [page](/javascript-api/k6-experimental/browser/page/)s.                          |
| [BrowserContext.grantPermissions(permissions[, options])](/javascript-api/k6-experimental/browser/browsercontext/grantpermissions)                          | Grants specified permissions to the `BrowserContext`.                                                      |
| [BrowserContext.newPage()](/javascript-api/k6-experimental/browser/browsercontext/newpage)                                                                  | Uses the `BrowserContext` to create a new [Page](/javascript-api/k6-experimental/browser/page/) and returns it.        |
| [BrowserContext.pages()](/javascript-api/k6-experimental/browser/browsercontext/pages) <BWIPT id="444"/>                                                    | Returns a list of [page](/javascript-api/k6-experimental/browser/page/)s that belongs to the `BrowserContext`.          |
| [BrowserContext.setDefaultNavigationTimeout(timeout)](/javascript-api/k6-experimental/browser/browsercontext/setdefaultnavigationtimeout) <BWIPT id="445"/> | Sets the default navigation timeout in milliseconds.                                                       |
| [BrowserContext.setDefaultTimeout(timeout)](/javascript-api/k6-experimental/browser/browsercontext/setdefaulttimeout) <BWIPT id="456"/>                     | Sets the default maximum timeout for all methods accepting a timeout option in milliseconds.               |
| [BrowserContext.setGeolocation(geolocation)](/javascript-api/k6-experimental/browser/browsercontext/setgeolocation) <BWIPT id="435"/>                       | Sets the `BrowserContext`'s geolocation.                                                                   |
| [BrowserContext.setOffline(offline)](/javascript-api/k6-experimental/browser/browsercontext/setoffline)                                                     | Toggles the `BrowserContext`'s connectivity on/off.                                                        |
| [BrowserContext.waitForEvent(event[, optionsOrPredicate])](/javascript-api/k6-experimental/browser/browsercontext/waitforevent) <BWIPT id="447"/>           | Waits for the event to fire and passes its value into the predicate function.                              |
