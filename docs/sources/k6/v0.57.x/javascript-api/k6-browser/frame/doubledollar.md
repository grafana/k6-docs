---
title: '$$(selector)'
slug: 'frame-doubledollar'
description: 'Browser module: frame.$$(selector) method'
---

# $$(selector)

{{< admonition type="warning" >}}

Use locator-based [`frame.locator(selector)`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/locator/) instead.

{{< /admonition >}}

The method finds all elements matching the specified selector within the page. If no elements match the selector, the return value resolves to `[]`.

### Returns

| Type                       | Description                                                                                                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<ElementHandle[]>` | A Promise that fulfills with the [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/elementhandle/) array of the selector when matching elements are found. |
