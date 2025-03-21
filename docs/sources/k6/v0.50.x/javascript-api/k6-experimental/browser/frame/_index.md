---
title: 'Frame'
description: 'Browser module: Frame Class'
weight: 05
---

# Frame

{{< docs/shared source="k6" lookup="browser-module-wip.md" version="<K6_VERSION>" >}}

## Supported APIs

| Method                                                                                                                                                    | Playwright Relevant Distinctions                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| <a href="https://playwright.dev/docs/api/class-frame#frame-query-selector" target="_blank" >frame.$(selector[, options])</a>                              | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-check" target="_blank" >frame.check(selector[, options])</a>                                   | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-child-frames" target="_blank" >frame.childFrames()</a>                                         | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-click" target="_blank" >frame.click(selector[, options])</a>                                   | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-content" target="_blank" >frame.content()</a>                                                  | -                                                            |
| [frame.dblclick(selector[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame/dblclick)                     | Double click on an element matching the provided `selector`. |
| <a href="https://playwright.dev/docs/api/class-frame#frame-dblclick" target="_blank" >frame.dblclick(selector[, options])</a>                             | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-dispatch-event" target="_blank" >frame.dispatchEvent(selector, type[, eventInit, options])</a> | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-evaluate" target="_blank" >frame.evaluate(pageFunction[, arg])</a>                             | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-evaluate-handle" target="_blank" >frame.evaluateHandle(pageFunction[, arg])</a>                | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-fill" target="_blank" >frame.fill(selector, value[, options])</a>                              | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-focus" target="_blank" >frame.focus(selector[, options])</a>                                   | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-frame-element" target="_blank" >frame.frameElement()</a>                                       | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-get-attribute" target="_blank" >frame.getAttribute(selector, name[, options])</a>              | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-goto" target="_blank" >frame.goto(url[, options])</a>                                          | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-hover" target="_blank" >frame.hover(selector[, options])</a>                                   | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-inner-html" target="_blank" >frame.innerHTML(selector[, options])</a>                          | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-inner-text" target="_blank" >frame.innerText(selector[, options])</a>                          | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-input-value" target="_blank" >frame.inputValue(selector[, options])</a>                        | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-is-checked" target="_blank" >frame.isChecked(selector[, options])</a>                          | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-is-detached" target="_blank" >frame.isDetached()</a>                                           | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-is-disabled" target="_blank" >frame.isDisabled(selector[, options])</a>                        | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-is-editable" target="_blank" >frame.isEditable(selector[, options])</a>                        | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-is-enabled" target="_blank" >frame.isEnabled(selector[, options])</a>                          | -                                                            |
| [frame.isHidden(selector[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame/ishidden/)                    | Checks if the matched element is `hidden`.                   |
| [frame.isVisible(selector[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame/isvisible/)                  | Checks if the matched element is `visible`.                  |
| <a href="https://playwright.dev/docs/api/class-frame#frame-locator" target="_blank" >frame.locator(selector[, options])</a>                               | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-name" target="_blank" >frame.name()</a>                                                        | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-page" target="_blank" >frame.page()</a>                                                        | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-parent-frame" target="_blank" >frame.parentFrame()</a>                                         | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-press" target="_blank" >frame.press(selector, key[, options])</a>                              | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-select-option" target="_blank" >frame.selectOption(selector, values[, options])</a>            | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-set-checked" target="_blank" >frame.setChecked(selector, checked[, options])</a>               | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-set-content" target="_blank" >frame.setContent(html[, options])</a>                            | -                                                            |
| [frame.setInputFiles(selector, file[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/frame/setinputfiles)     | Sets the file input element's value to the specified files.  |
| <a href="https://playwright.dev/docs/api/class-frame#frame-tap" target="_blank" >frame.tap(selector[, options])</a>                                       | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-text-content" target="_blank" >frame.textContent(selector[, options])</a>                      | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-title" target="_blank" >frame.title()</a>                                                      | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-type" target="_blank" >frame.title()</a>                                                       | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-uncheck" target="_blank" >frame.uncheck(selector[, options])</a>                               | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-url" target="_blank" >frame.url()</a>                                                          | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-wait-for-function" target="_blank" >frame.waitForFunction(pageFunction[, arg, options])</a>    | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-wait-for-load-state" target="_blank" >frame.waitForLoadState([state, options])</a>             | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-wait-for-navigation" target="_blank" >frame.waitForNavigation([options])</a>                   | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-wait-for-selector" target="_blank" >frame.waitForSelector(selector[, options])</a>             | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-wait-for-timeout" target="_blank" >frame.waitForTimeout(timeout)</a>                           | -                                                            |
| <a href="https://playwright.dev/docs/api/class-frame#frame-wait-for-url" target="_blank" >frame.waitForURL(url[, options])</a>                            | -                                                            |
