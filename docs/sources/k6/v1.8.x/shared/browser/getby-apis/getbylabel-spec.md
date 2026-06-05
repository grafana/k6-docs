---
title: browser/getby-apis/getbylabel-spec
---

# getByLabel(text[, options])

Returns a locator for form controls associated with the specified label text. This method is ideal for interacting with form elements in an accessible and user-focused way, as it mirrors how users typically identify form fields.

| Parameter       | Type             | Default | Description                                                                                                  |
| --------------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `text`          | string \| RegExp | -       | Required. The label text to search for. Can be a string for exact match or a RegExp for pattern matching.    |
| `options`       | object           | `null`  |                                                                                                              |
| `options.exact` | boolean          | `false` | Whether to match the label text exactly with case sensitivity. When `true`, performs a case-sensitive match. |

## Returns

| Type                                                                                   | Description                                                                                              |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with the form control associated with the specified label. |