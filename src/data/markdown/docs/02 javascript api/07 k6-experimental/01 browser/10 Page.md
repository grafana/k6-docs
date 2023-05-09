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






<!-- 
| <a href="https://playwright.dev/docs/api/class-page#page-is-enabled" target="_blank" >page.isEnabled(selector[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-is-hidden" target="_blank" >page.isHidden(selector[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-is-visible" target="_blank" >page.isVisible(selector[, options])</a> | - | - |
| [page.locator(selector\[, options\])](/javascript-api/k6-experimental/browser/locator/) | - | Creates and returns a new page `locator` given a selector with strict mode on. The strict mode only allows selecting a single matching element, and will throw an error if multiple matches are found. |
| <a href="https://playwright.dev/docs/api/class-page#page-main-frame" target="_blank" >page.mainFrame()</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-opener" target="_blank" >page.opener()</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-press" target="_blank" >page.press(selector, key[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-reload" target="_blank" >page.reload([options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-screenshot" target="_blank" >page.screenshot([options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-select-option" target="_blank" >page.selectOption(selector, values[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-set-checked" target="_blank" >page.setChecked(selector, checked[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-set-content" target="_blank" >page.setContent(html[, options])</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-set-default-navigation-timeout" target="_blank" >page.setDefaultNavigationTimeout(timeout)</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-set-default-timeout" target="_blank" >page.setDefaultTimeout(timeout)</a> | - | - |
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
| <a href="https://playwright.dev/docs/api/class-page#page-keyboard" target="_blank" >keyboard</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-mouse" target="_blank" >mouse</a> | - | - |
| <a href="https://playwright.dev/docs/api/class-page#page-touchscreen" target="_blank" >touchscreen</a> | - | - | -->
