---
title: "Page"
excerpt: "xk6-browser: Page Class"
---

<BrowserCompatibility/>

## Supported APIs

Support for the [`Page` Playwright API](https://playwright.dev/docs/api/class-page) except for the following APIs:

### Missing Playwright APIs

<Glossary>

- [$eval()](https://playwright.dev/docs/api/class-page#page-eval-on-selector)
- [$$eval()](https://playwright.dev/docs/api/class-page#page-eval-on-selector-all)
- [addInitScript()](https://playwright.dev/docs/api/class-page#page-add-init-script)
- [addScriptTag()](https://playwright.dev/docs/api/class-page#page-add-script-tag)
- [addStyleTag()](https://playwright.dev/docs/api/class-page#page-add-style-tag)
- [dragAndDrop()](https://playwright.dev/docs/api/class-page#page-drag-and-drop)
- [exposeBinding()](https://playwright.dev/docs/api/class-page#page-expose-binding)
- [exposeFunction()](https://playwright.dev/docs/api/class-page#page-expose-function)
- [frame()](https://playwright.dev/docs/api/class-page#page-frame)
- [goBack()](https://playwright.dev/docs/api/class-page#page-go-back)
- [goForward()](https://playwright.dev/docs/api/class-page#page-go-forward)
- [locator()](https://playwright.dev/docs/api/class-page#page-locator)
- [pause()](https://playwright.dev/docs/api/class-page#page-pause)
- [pdf()](https://playwright.dev/docs/api/class-page#page-pdf)
- [video()](https://playwright.dev/docs/api/class-page#page-video)
- [workers()](https://playwright.dev/docs/api/class-page#page-workers)
  
</Glossary>

The next APIs depends on event-loop support in k6:

<Glossary>

- [on()](https://playwright.dev/docs/api/class-page#page-on)
- [route()](https://playwright.dev/docs/api/class-page#page-route)
- [unroute()](https://playwright.dev/docs/api/class-page#page-unroute)
- [waitForEvent()](https://playwright.dev/docs/api/class-page#page-wait-for-event)
- [waitForResponse()](https://playwright.dev/docs/api/class-page#page-wait-for-response)
- [waitForURL()](https://playwright.dev/docs/api/class-page#page-wait-for-url)
  
</Glossary>



🚧 `xk6-browser` is in Beta - we are working to cover more Playwright APIs.


## Examples


```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium', {
    headless: false,
    slowMo: '500ms', // slow down by 500ms
  });
  const context = browser.newContext();
  const page = context.newPage();

  // Goto front page, find login link and click it
  page.goto('https://test.k6.io/', { waitUntil: 'networkidle' });
  const elem = page.$('a[href="/my_messages.php"]');
  elem.click();

  // Enter login credentials and login
  page.$('input[name="login"]').type('admin');
  page.$('input[name="password"]').type('123');
  page.$('input[type="submit"]').click();

  // Wait for next page to load
  page.waitForLoadState('networkdidle');

  page.close();
  browser.close();
}
```

### Browser APIs

<Glossary>

-  [Browser](/javascript-api/k6-x-browser/browser/)
-  [BrowserContext](/javascript-api/k6-x-browser/browsercontext/)
-  [BrowserType](/javascript-api/k6-x-browser/browsertype/)
-  [ElementHandle](/javascript-api/k6-x-browser/elementhandle/)
-  [Frame](/javascript-api/k6-x-browser/frame/)
-  [JSHandle](/javascript-api/k6-x-browser/jshandle)
-  [Keyboard](/javascript-api/k6-x-browser/keyboard)
-  [Mouse](/javascript-api/k6-x-browser/mouse/)
-  [Page](/javascript-api/k6-x-browser/page/)
-  [Request](/javascript-api/k6-x-browser/request/)
-  [Response](/javascript-api/k6-x-browser/response/)
-  [Browser](/javascript-api/k6-x-browser/browser/)
-  [Touchscreen](/javascript-api/k6-x-browser/touchscreen/)

</Glossary>