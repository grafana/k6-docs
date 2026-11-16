---
title: browser/getby-apis/getbyrole-spec
---

# getByRole(role[, options])

Returns a locator for elements with the specified ARIA role. This is the preferred way to locate elements as it most closely resembles how users and assistive technology perceive the page.

| Parameter               | Type           | Default | Description                                                                                                                       |
| ----------------------- | -------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `role`                  | string         | -       | Required. The ARIA role to search for. For example, `'button'`, `'link'`, `'heading'`, or `'textbox'`.                            |
| options                 | object         | `null`  |                                                                                                                                   |
| `options.checked`       | boolean        | `null`  | Filter elements by their checked state. Only applicable for roles like `checkbox`, `radio`, `menuitemcheckbox`.                   |
| `options.disabled`      | boolean        | `null`  | Filter elements by their disabled state.                                                                                          |
| `options.exact`         | boolean        | `false` | Whether to match the accessible name exactly with case sensitivity. When `true`, performs a case-sensitive match.                 |
| `options.expanded`      | boolean        | `null`  | Filter elements by their expanded state. Only applicable for roles that support the `aria-expanded` attribute.                    |
| `options.includeHidden` | boolean        | `false` | Whether to include elements that are normally excluded from the accessibility tree in the search.                                 |
| `options.level`         | number         | `null`  | Filter headings by their level 1 to 6. Only applicable for `heading` role.                                                        |
| `options.name`          | string\|RegExp | `null`  | Filter elements by their accessible name. The accessible name is typically the text content, label text, or aria-label attribute. |
| `options.pressed`       | boolean        | `null`  | Filter elements by their pressed state. Only applicable for roles like `button` with toggle behavior.                             |
| `options.selected`      | boolean        | `null`  | Filter elements by their selected state. Only applicable for roles like `option`, `tab`.                                          |

## Returns

| Type                                                                                   | Description                                                                                              |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | A locator object that can be used to interact with the elements matching the specified role and options. |