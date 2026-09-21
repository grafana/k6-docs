---
title: '$(selector)'
slug: 'frame-dollar'
description: 'Browser module: frame.$(selector) method'
---

# $(selector)

{{< admonition type="warning" >}}

Use locator-based [`frame.locator(selector)`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/locator/) instead.

{{< /admonition >}}

The method finds an element matching the specified selector within the frame. If no elements match the selector, the return value resolves to `null`. To wait for an element on the frame, use [locator.waitFor([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/waitfor/).

### Returns

| Type                             | Description                                                                                                                                                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<ElementHandle \| null>` | A Promise that fulfills with the [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/elementhandle/)  of the selector when a matching element is found or `null`. |
