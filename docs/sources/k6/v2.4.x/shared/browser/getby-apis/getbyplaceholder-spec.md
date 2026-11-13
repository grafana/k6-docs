---
title: browser/getby-apis/getbyplaceholder-spec
---

# getByPlaceholder(placeholder[, options])

Returns a locator for input elements with the specified `placeholder` attribute. This method is useful for locating form fields that use `placeholder` attribute to provide hints or examples to users about the expected input format.

| Parameter       | Type             | Default | Description                                                                                                        |
| --------------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `placeholder`   | string \| RegExp | -       | Required. The placeholder text to search for. Can be a string for exact match or a RegExp for pattern matching.    |
| `options`       | object           | `null`  |                                                                                                                    |
| `options.exact` | boolean          | `false` | Whether to match the placeholder text exactly with case sensitivity. When `true`, performs a case-sensitive match. |

## Returns

| Type                                                                                   | Description                                                                                                    |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with the input elements matching the specified placeholder text. |
