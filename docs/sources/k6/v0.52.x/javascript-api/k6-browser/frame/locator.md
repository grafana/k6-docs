---
title: 'locator(selector)'
description: 'Browser module: frame.locator(selector) method'
---

# locator(selector)

The method returns an element [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/). Locators resolve to the element when the action takes place, which means locators can span over navigations where the underlying dom changes.

| Parameter | Type   | Default | Description                                   |
| --------- | ------ | ------- | --------------------------------------------- |
| selector  | string | `''`    | A selector to use when resolving DOM element. |

### Returns

| Type                                                                                   | Description                                      |
| -------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | The element `Locator` associated with the frame. |
