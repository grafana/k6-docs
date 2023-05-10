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
| [page.setExtraHTTPHeaders(headers)](/javascript-api/k6-experimental/browser/page/setextrahttpheaders/)       | Sets extra HTTP headers which will be sent with subsequent HTTP requests. |
| [page.setViewportSize(viewportSize)](/javascript-api/k6-experimental/browser/page/setviewportsize/)       | Updates the page's width and height. |
| [page.tap(selector, [options])](/javascript-api/k6-experimental/browser/page/tap/)       | Taps the first element that matches the selector.                                      |
| [page.textContent(selector, [options])](/javascript-api/k6-experimental/browser/page/textcontent/)       | Returns the `element.textContent`.         |
| [page.title()](/javascript-api/k6-experimental/browser/page/title/)       | Returns the page's title.         |
| [page.type(selector, text, [options])](/javascript-api/k6-experimental/browser/page/type/)       | Types the `text` in the first element found that matches the selector.              |
| [page.touchScreen()](/javascript-api/k6-experimental/browser/page/touchscreen/)       | Returns the [Touchscreen](/javascript-api/k6-experimental/browser/touchscreen/) instance to interact with a virtual touchscreen on the page.                                      |
| [page.uncheck(selector, [options])](/javascript-api/k6-experimental/browser/page/uncheck/)       | Unselects an input checkbox.                                    |
| [page.url()](/javascript-api/k6-experimental/browser/page/url/)       | Returns the page's URL.         |
| [page.viewportSize()](/javascript-api/k6-experimental/browser/page/viewportsize/)       | Returns the page's size (width and height).         |
| [page.waitForFunction(pageFunction, arg, [options])](/javascript-api/k6-experimental/browser/page/waitforfunction/)       | Returns when the `pageFunction` returns a truthy value.         |
| [page.waitForLoadState(state, [options])](/javascript-api/k6-experimental/browser/page/waitforloadstate/)       | Waits for the given load state to be reached.         |
| [page.waitForNavigation([options])](/javascript-api/k6-experimental/browser/page/waitfornavigation/)       | Waits for the given navigation lifecycle event to occur and returns the main resource response.         |
| [page.waitForSelector(selector, [options])](/javascript-api/k6-experimental/browser/page/waitforselector/)       | Returns when element specified by selector satisfies `state` option.        |
| [page.waitForTimeout(timeout)](/javascript-api/k6-experimental/browser/page/waitfortimeout/)       | Waits for the given `timeout` in milliseconds. |
| [page.workers()](/javascript-api/k6-experimental/browser/page/workers/)       | Returns an array of the dedicated WebWorkers associated with the page. |
| [page.$(selector)](/javascript-api/k6-experimental/browser/page/$/)       | Finds an element matching the specified selector within the page. |
| [page.$$(selector)](/javascript-api/k6-experimental/browser/page/$$/)       | Finds all elements matching the specified selector within the page. |
