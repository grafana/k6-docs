---
title: browser/getby-apis/getbytitle-spec
---

# getByTitle(title[, options])

Returns a locator for elements with the specified `title` attribute. This method is useful for locating elements that use the `title` attribute to provide additional information, tooltips, or accessibility context.

| Parameter       | Type             | Default | Description                                                                                                  |
| --------------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `title`         | string \| RegExp | -       | Required. The title text to search for. Can be a string for exact match or a RegExp for pattern matching.    |
| `options`       | object           | `null`  |                                                                                                              |
| `options.exact` | boolean          | `false` | Whether to match the title text exactly with case sensitivity. When `true`, performs a case-sensitive match. |

## Returns

| Type                                                                                   | Description                                                                                             |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with the elements matching the specified title attribute. |
