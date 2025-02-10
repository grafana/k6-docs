---
title: 'textContent(selector[, options])'
description: 'Browser module: locator.textContent(selector[, options]) method'
---

# textContent(selector[, options])

{{< admonition type="warning" >}}

Use locator-based [`locator.textContent([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/textcontent/) instead.

{{< /admonition >}}

Returns the `element.textContent`.

<TableWithNestedRows>

| Parameter       | Type    | Default | Description                                                                                                                                                                                                                                                                                                         |
| --------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector        | string  | `''`    | A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                                                                                                |
| options         | object  | `null`  |                                                                                                                                                                                                                                                                                                                     |
| options.strict  | boolean | `false` | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                                                                                                          |
| options.timeout | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type                      | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| `Promise<string \| null>` | A Promise that fulfills with the text content of the selector or `null`. |
