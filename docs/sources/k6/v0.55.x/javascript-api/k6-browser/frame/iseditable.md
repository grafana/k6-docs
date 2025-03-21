---
title: 'isEditable(selector[, options])'
description: 'Browser module: frame.isEditable(selector[, options]) method'
---

# isEditable(selector[, options])

{{< admonition type="warning" >}}

Use locator-based [`locator.isEditable([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/iseditable/) instead.

{{< /admonition >}}

Checks if the element is `editable`.

<TableWithNestedRows>

| Parameter       | Type    | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector        | string  | `''`    | A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                                                                                                                          |
| options         | object  | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.strict  | boolean | `false` | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                                                                                                                                    |
| options.timeout | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type            | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| `Promise<bool>` | A Promise that fullfils with `true` if the element is `editable`, else `false`. |
