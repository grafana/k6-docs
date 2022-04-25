---
title: "Page"
excerpt: "xk6-browser: Page Class"
---

<BrowserCompatibility/>

```javascript
import launcher from 'k6/x/browser';

export default function () {
  const browser = launcher.launch('chromium', {
    headless: false,
  });
  const context = browser.newContext();
  const page = context.newPage();

  // Goto front page, find login link and click it
  page.goto('https://test.k6.io/', { waitUntil: 'networkidle' });
  const elem = page.$('a[href="/my_messages.php"]');
  elem.click();

  // Wait for login page to load
  page.waitForLoadState();

  // Enter login credentials and login
  page.$('input[name="login"]').type('admin');
  page.$('input[name="password"]').type('123');
  page.$('input[type="submit"]').click();

  // Wait for next page to load
  page.waitForNavigation();

  page.close();
  browser.close();
}
```


## page.bringToFront()

## page.check(selector[, options])

## page.click(selector[, options])

## page.close([options])

## page.content()

## page.context()

## page.dblclick(selector[, options])

## page.dispatchEvent(selector, type[, eventInit, options])

## page.emulateMedia([options])

## page.evaluate(pageFunction[, arg])

## page.evaluateHandle(pageFunction[, arg])

## page.fill(selector, value[, options])

## page.focus(selector[, options])

## page.frames()

## page.getAttribute(selector, name[, options])

## page.goto(url[, options])

## page.hover(selector[, options])

## page.innerHTML(selector[, options])

## page.innerText(selector[, options])

## page.inputValue(selector[, options])

## page.isChecked(selector[, options])

## page.isClosed()

## page.isDisabled(selector[, options])

## page.isEditable(selector[, options])

## page.isEnabled(selector[, options])

## page.isHidden(selector[, options])

## page.isVisible(selector[, options])

## page.mainFrame()

## page.opener()

## page.press(selector, key[, options])

## page.reload([options])

## page.screenshot([options])

## page.selectOption(selector, values[, options])

## page.setChecked(selector, checked[, options])

## page.setContent(html[, options])

## page.setDefaultNavigationTimeout(timeout)

## page.setDefaultTimeout(timeout)

## page.setExtraHTTPHeaders(headers)

## page.setInputFiles(selector, files[, options])

## page.setViewportSize(viewportSize)

## page.tap(selector[, options])

## page.textContent(selector[, options])

## page.title()

## page.type(selector, text[, options])

## page.uncheck(selector[, options])

## page.unroute(url[, handler])

## page.url()

## page.viewportSize()

## page.waitForFunction(pageFunction[, arg, options])

## page.waitForLoadState([state, options])

## page.waitForNavigation([options])

## page.waitForRequest(urlOrPredicate[, options])

## page.waitForResponse(urlOrPredicate[, options])

## page.waitForSelector(selector[, options])

## page.waitForTimeout(timeout)

## page.keyboard

## page.mouse

## page.touchscreen

## page.$eval()

## page.$$eval()

## page.addInitScript()

## page.addScriptTag()

## page.addStyleTag()

## page.dragAndDrop()

## page.exposeBinding()

## page.exposeFunction()

## page.frame()

## page.goBack()

## page.goForward()

## page.locator()

## page.pause()

## page.pdf()

## page.video()

## page.workers()

## page.accessibility

## page.coverage

## page.request

## page.on()

## page.route()

## page.unroute()

## page.waitForEvent()

## page.waitForResponse()

## page.waitForURL()
  
<BrowserClassList/>

