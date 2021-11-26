---
title: "BrowserContext"
excerpt: "xk6-browser: BrowserContext Class"
---

<BrowserCompatibility/>

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



- [browserContext.addInitScript(script[, arg])](#browsercontext-addinitscript-script-arg)
- [browserContext.clearCookies()](#browsercontext-clearcookies)
- [browserContext.clearPermissions()](#browsercontext-clearpermissions)
- [browserContext.grantPermissions(permissions[, options])](#browsercontext-grantpermissions-permissions-options)
- [browserContext.close()](#browsercontext-close)
- [browserContext.newPage()](#browsercontext-newpage)
- [browserContext.pages()](#browsercontext-pages)
- [browserContext.setDefaultNavigationTimeout(timeout)](#browsercontext-setdefaultnavigationtimeout-timeout)
- [browserContext.setDefaultTimeout(timeout)](#browsercontext-setdefaulttimeout-timeout)
- [browserContext.setGeolocation(geolocation)](#browsercontext-setgeolocation-geolocation)
- [browserContext.setHTTPCredentials(httpCredentials)](#browsercontext-sethttpcredentials-httpcredentials)
- [browserContext.setOffline(offline)](#browsercontext-setoffline-offline)
- [Missing Playwright APIs](#missing-playwright-apis)



## browserContext.addInitScript(script[, arg])

hola

## browserContext.clearCookies()

hola

## browserContext.clearPermissions()

hola

## browserContext.grantPermissions(permissions[, options])

hola

## browserContext.close()

hola

## browserContext.newPage()

hola

## browserContext.pages()

hola

## browserContext.setDefaultNavigationTimeout(timeout)

hola

## browserContext.setDefaultTimeout(timeout)

hola

## browserContext.setGeolocation(geolocation)


## browserContext.setHTTPCredentials(httpCredentials)


## browserContext.setOffline(offline)


## Missing Playwright APIs

<Glossary>


- [addCookies()](https://playwright.dev/docs/api/class-browsercontext/#browsercontextaddcookiescookies)
- [backgroundPages()](https://playwright.dev/docs/api/class-browsercontext#browser-context-background-pages)
- [browser()](https://playwright.dev/docs/api/class-browsercontext#browser-context-browser)
- [cookies()](https://playwright.dev/docs/api/class-browsercontext#browser-context-cookies)
- [exposeBinding()](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-binding)
- [exposeFunction()](https://playwright.dev/docs/api/class-browsercontext#browser-context-expose-function)
- [newCDPSession()](https://playwright.dev/docs/api/class-browsercontext#browser-context-new-cdp-session)
- [serviceWorkers()](https://playwright.dev/docs/api/class-browsercontext/#browser-context-service-workers)
- [setExtraHTTPHeaders()](https://playwright.dev/docs/api/class-browsercontext#browser-context-set-extra-http-headers)
- [storageState()](https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state)
- [request](https://playwright.dev/docs/api/class-browsercontext#browser-context-request)
- [tracing](https://playwright.dev/docs/api/class-browsercontext#browser-context-tracing)

</Glossary>

The following missing APIs depends on [event-loop support in k6](https://github.com/grafana/k6/issues/882):

<Glossary>

- [on(event)](https://playwright.dev/docs/api/class-browsercontext#browser-context-event-background-page)
- [route()](https://playwright.dev/docs/api/class-browsercontext#browser-context-route)
- [unroute()](https://playwright.dev/docs/api/class-browsercontext#browser-context-unroute)
- [waitForEvent()](https://playwright.dev/docs/api/class-browsercontext#browser-context-wait-for-event)

</Glossary>