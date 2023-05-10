---
title: "Page"
excerpt: "Browser module: Page Class"
---

Page provides methods to interact with a single tab in a running web browser instance. One instance of the browser can have many page instances.

| Method                                                                                                        | Description                                                                                                                |
|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| [page.bringToFront()](/javascript-api/k6-experimental/browser/page/bringtofront/)                             | Activates a browser tab.                                                                                                   |
| [page.check(selector, [options])](/javascript-api/k6-experimental/browser/page/check/)                        | Select the input checkbox.                                                                                                 |
| [page.click(selector, [options])](/javascript-api/k6-experimental/browser/page/click/)                        | Clicks an element matching a `selector`.                                                                                   |
| [page.close()](/javascript-api/k6-experimental/browser/page/close/)                                           | Closes a tab that a page is associated with.                                                                               |
| [page.content()](/javascript-api/k6-experimental/browser/page/content/)                                       | Gets the HTML contents of the page.                                                                                        |
| [page.context()](/javascript-api/k6-experimental/browser/page/context/)                                       | Gets the [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) that the page belongs to.               |
| [page.dblclick(selector, [options])](/javascript-api/k6-experimental/browser/page/dblclick/)                                     | Mouse double clicks an element matching provided selector.                                                                 |
| [page.dispatchEvent(selector, type, eventInit, [options])](/javascript-api/k6-experimental/browser/page/dispatchevent/)                           | Dispatches HTML DOM event types e.g. `'click'`                                                                             |
| [page.emulateMedia([options])](/javascript-api/k6-experimental/browser/page/emulatemedia/)                             | Changes the CSS media type and the color scheme feature.                                                                   |
| [page.emulateVisionDeficiency(type)](/javascript-api/k6-experimental/browser/page/emulatevisiondeficiency/)       | Emulates your website with the specified vision deficiency type.                                                           |
| [page.evaluate(pageFunction, arg)](/javascript-api/k6-experimental/browser/page/evaluate/)       | Returns the value of the pageFunction invocation.                                                          |
| [page.evaluateHandle(pageFunction, arg)](/javascript-api/k6-experimental/browser/page/evaluate/)       | Returns the value of the pageFunction invocation as a [JSHandle](javascript-api/k6-experimental/browser/jshandle/).                                                        |
| [page.fill(selector, value, [options])](/javascript-api/k6-experimental/browser/page/fill/)       | Fill an `input`, `textarea` or `contenteditable` element with the provided value.                                                      |
| [page.focus(selector, [options])](/javascript-api/k6-experimental/browser/page/focus/)       | Fetches an element with `selector` and focuses it.                                                  |
| [page.frames()](/javascript-api/k6-experimental/browser/page/frames/)       | Returns an array of frames on the page.                                                  |
| [page.getAttribute(selector, name, [options])](/javascript-api/k6-experimental/browser/page/getattribute/)       | Returns the element attribute value for the given attribute name.                                                 |
| [page.goto(url, [options])](/javascript-api/k6-experimental/browser/page/goto/)       | Navigates to the specified url.                                                 |
| [page.hover(selector, [options])](/javascript-api/k6-experimental/browser/page/hover/)       | Hovers over an element matching `selector`.                                                |
| [page.innerHTML(selector, [options])](/javascript-api/k6-experimental/browser/page/innerhtml/)       | Returns the `element.innerHTML`.                                                |
| [page.innerText(selector, [options])](/javascript-api/k6-experimental/browser/page/innertext/)       | Returns the `element.innerText`.                                                |
| [page.inputValue(selector, [options])](/javascript-api/k6-experimental/browser/page/inputvalue/)       | Returns `input.value` for the selected `input`, `textarea` or `select` element.                                               |
| [page.isChecked(selector, [options])](/javascript-api/k6-experimental/browser/page/ischecked/)       | Checks to see if the `checkbox` `input` type is selected or not.                                               |
| [page.isClosed()](/javascript-api/k6-experimental/browser/page/isclosed/)       | Checks if the page has been closed.                                           |
| [page.isDisabled(selector, [options])](/javascript-api/k6-experimental/browser/page/isdisabled/)       | Checks if the element is `disabled`.                                        |
| [page.isEditable(selector, [options])](/javascript-api/k6-experimental/browser/page/iseditable/)       | Checks if the element is `editable`.                                      |
| [page.isEnabled(selector, [options])](/javascript-api/k6-experimental/browser/page/isenabbled/)       | Checks if the element is `enabled`.                                      |
| [page.isHidden(selector, [options])](/javascript-api/k6-experimental/browser/page/ishidden/)       | Checks if the element is `hidden`.                                      |
| [page.isVisible(selector, [options])](/javascript-api/k6-experimental/browser/page/isvisible/)       | Checks if the element is `visible`.                                      |
| [page.keyboard()](/javascript-api/k6-experimental/browser/page/keyboard/)       | Returns the [Keyboard](javascript-api/k6-experimental/browser/keyboard/) instance to interact with a virtual keyboard on the page.                                         |
| [page.locator(selector)](/javascript-api/k6-experimental/browser/page/locator/)       | Returns an element [Locator](/javascript-api/k6-experimental/browser/locator/).                                          |
| [page.mainFrame()](/javascript-api/k6-experimental/browser/page/mainframe/)       | Returns the page's main frame.                                         |
| [page.mouse()](/javascript-api/k6-experimental/browser/page/mouse/)       | Returns the [Mouse](javascript-api/k6-experimental/browser/mouse/) instance to interact with a virtual mouse on the page.                                        |
| [page.opener()](/javascript-api/k6-experimental/browser/page/opener/)       | Returns the page that opened the current page.                                        |
| [page.press(selector, key, [options])](/javascript-api/k6-experimental/browser/page/press/)       | Focuses the element, and then uses `keyboard.down(key)` and `keyboard.up(key)`. |
| [page.opener([options])](/javascript-api/k6-experimental/browser/page/reload/)       | Reloads the current page.                                        |
| [page.screenshot([options])](/javascript-api/k6-experimental/browser/page/screenshot/)       | Returns the buffer with the captured screenshot from the browser.                 |
| [page.selectOption(selector, values, [options])](/javascript-api/k6-experimental/browser/page/selectoption/)       | Selects one or more options which match the values from a `<select>` element.                |
| [page.setContent(html, [options])](/javascript-api/k6-experimental/browser/page/setcontent/)       | Sets the supplied html string to the current page.               |
| [page.setDefaultNavigationTimeout(timeout)](/javascript-api/k6-experimental/browser/page/setdefaultnavigationtimeout/)       | Changes the navigation timeout for [page.goto(url, [options])](/javascript-api/k6-experimental/browser/page/goto/), [page.reload([options])](/javascript-api/k6-experimental/browser/page/reload/), [page.setContent(html, [options])](/javascript-api/k6-experimental/browser/page/setcontent/), and [page.waitForNavigation([options])](/javascript-api/k6-experimental/browser/page/waitfornavigation/)               |
| [page.setDefaultTimeout(timeout)](/javascript-api/k6-experimental/browser/page/setdefaulttimeout/)       | Changes the timeout for all the methods accepting a `timeout` option.  |






<!-- 
| <a href="https://playwright.dev/docs/api/class-page#page-set-extra-http-headers" target="_blank" >page.setExtraHTTPHeaders(headers)</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-set-input-files" target="_blank" >page.setInputFiles(selector, files[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-set-viewport-size" target="_blank" >page.setViewportSize(viewportSize)</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-tap" target="_blank" >page.tap(selector[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-text-content" target="_blank" >page.textContent(selector[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-title" target="_blank" >page.title()</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-type" target="_blank" >page.type(selector, text[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-uncheck" target="_blank" >page.uncheck(selector[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-unroute" target="_blank" >page.unroute(url[, handler])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-url" target="_blank" >page.url()</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-viewport-size" target="_blank" >page.viewportSize()</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-wait-for-function" target="_blank" >page.waitForFunction(pageFunction[, arg, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-wait-for-load-state" target="_blank" >page.waitForLoadState([state, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-wait-for-navigation" target="_blank" >page.waitForNavigation([options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-wait-for-request" target="_blank" >page.waitForRequest(urlOrPredicate[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-wait-for-response" target="_blank" >page.waitForResponse(urlOrPredicate[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-wait-for-selector" target="_blank" >page.waitForSelector(selector[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-wait-for-timeout" target="_blank" >page.waitForTimeout(timeout)</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-touchscreen" target="_blank" >touchscreen</a> | - | - | -->
