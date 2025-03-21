---
title: 'getAttribute(selector, name[, options])'
description: 'Browser module: frame.getAttribute(selector, name[, options]) method'
---

# getAttribute(selector, name[, options])

{{< admonition type="warning" >}}

Use locator-based [`locator.getAttribute()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/getattribute/) instead.

{{< /admonition >}}

Returns the element attribute value for the given attribute name.

<TableWithNestedRows>

| Parameter       | Type    | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector        | string  | `''`    | A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                                                                                                                          |
| name            | string  | `''`    | Attribute name to get the value for.                                                                                                                                                                                                                                                                                                          |
| options         | object  | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.strict  | boolean | `false` | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                                                                                                                                    |
| options.timeout | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type                      | Description                                                                       |
| ------------------------- | --------------------------------------------------------------------------------- |
| `Promise<string \| null>` | A Promise that fulfills with the value of the attribute. Else, it returns `null`. |
