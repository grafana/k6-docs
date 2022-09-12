---
title: 'isChecked([options])'
excerpt: 'xk6-browser: locator.isChecked method'
---

Checks to see if the `checkbox` `input` type is selected or not.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type | Description                                       |
|------|---------------------------------------------------|
| bool | `true` if the checkbox is selected, else `false`. |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto('https://test.k6.io/browser.php');
const checkbox = page.locator('#checkbox1');
if (!checkbox.isChecked()) {
    checkbox.check();
}
```

</CodeGroup>
