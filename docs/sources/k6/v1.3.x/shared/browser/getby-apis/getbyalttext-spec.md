---
title: browser/getby-apis/getbyalttext-spec
---

# getByAltText(altText[, options])

Returns a locator for elements with the specified alt text. This method is useful for locating images and other elements that have an `alt` attribute, making your tests more accessible and user-focused.

| Parameter       | Type             | Default | Description                                                                                                |
| --------------- | ---------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `altText`       | string \| RegExp | -       | Required. The alt text to search for. Can be a string for exact match or a RegExp for pattern matching.    |
| `options`       | object           | `null`  |                                                                                                            |
| `options.exact` | boolean          | `false` | Whether to match the alt text exactly with case sensitivity. When `true`, performs a case-sensitive match. |

## Returns

| Type                                                                                   | Description                                                                                  |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with elements matching the specified alt text. |