---
title: "BrowserContext"
excerpt: "xk6-browser: BrowserContext Class"
---

`BrowserContext`s provide a way to operate multiple independent browser sessions, with separate pages, cache and cookies. When a browser is launched, a default `BrowserContext` is created.

A `BrowserContext` is created by using the [Browser](/javascript-api/xk6-browser/browser) type.

If a page opens another page, e.g. with a `window.open` call, the popup will belong to the parent page's browser context.


| Method                                                                                                                                          | Description                                                                   |
|-------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| [BrowserContext.browser()](/javascript-api/xk6-browser/browsercontext/browser/)                                                                 | Returns the browser instance that this browser context belongs to.            |
| <BWIPT id="442"/> [BrowserContext.clearCookies()](/javascript-api/xk6-browser/browsercontext/clearcookies/)                                     | Clears context cookies.                                                       |
| <BWIPT id="443"/> [BrowserContext.clearPermissions()](/javascript-api/xk6-browser/browsercontext/clearpermissions)                              | Clears all permission overrides for the browser context.                      |
| [BrowserContext.close()](/javascript-api/xk6-browser/browsercontext/close)                                                                      | Close the browser context and all its pages.                                  |
| [BrowserContext.grantPermissions(permissions[, options])](/javascript-api/xk6-browser/browsercontext/grantpermissions)                          | Grants specified permissions to the browser context.                          |
| [BrowserContext.newPage()](/javascript-api/xk6-browser/browsercontext/newpage)                                                                  | Creates a new page inside this browser context.                               |
| <BWIPT id="444"/> [BrowserContext.pages()](/javascript-api/xk6-browser/browsercontext/pages)                                                    | Returns a list of pages inside this browser context.                          |
| <BWIPT id="445"/> [BrowserContext.setDefaultNavigationTimeout(timeout)](/javascript-api/xk6-browser/browsercontext/setdefaultnavigationtimeout) | Sets the default navigation timeout in milliseconds.                          |
| [BrowserContext.setDefaultTimeout(timeout)](/javascript-api/xk6-browser/browsercontext/setdefaulttiontimeout)                                   | Sets the default maximum timeout in milliseconds.                             |
| <BWIPT id="435"/> [BrowserContext.setGeolocation(geolocation)](/javascript-api/xk6-browser/browsercontext/setgeolocation)                       | Sets the context's geolocation.                                               |
| [BrowserContext.setOffline(offline)](/javascript-api/xk6-browser/browsercontext/setoffline)                                                     | Toggles the browser's connectivity on/off.                                    |
| <BWIPT id="447"/> [BrowserContext.waitForEvent(event[, optionsOrPredicate])](/javascript-api/xk6-browser/browsercontext/waitforevent)           | Waits for the event to fire and passes its value into the predicate function. |
