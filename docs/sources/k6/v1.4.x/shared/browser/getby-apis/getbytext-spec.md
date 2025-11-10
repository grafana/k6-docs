---
title: browser/getby-apis/getbytext-spec
---

# getByText(text[, options])

Returns a locator for elements containing the specified text. This method finds elements by their visible text content, making it ideal for locating user-facing content like buttons, links, headings, and other text elements.

| Parameter       | Type             | Default | Description                                                                                                 |
| --------------- | ---------------- | ------- | ----------------------------------------------------------------------------------------------------------- |
| `text`          | string \| RegExp | -       | Required. The text content to search for. Can be a string for exact match or a RegExp for pattern matching. |
| `options`       | object           | `null`  |                                                                                                             |
| `options.exact` | boolean          | `false` | Whether to match the text exactly with case sensitivity. When `true`, performs a case-sensitive match.      |

## Returns

| Type                                                                                   | Description                                                                                    |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with the elements containing the specified text. |
