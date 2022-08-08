---
title: 'getAttribute(name, [options])'
excerpt: 'xk6-browser: locator.getAttribute method'
---

Returns the element attribute value for the given attribute name.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name            | string | `''`    | Attribute name to get the value for.                                                                                                                                                                                                  |
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type   | Description                         |
|--------|-------------------------------------|
| string | The value of the attribute or null. |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto('https://test.k6.io/browser.php');
const textInput = page.locator('#text1');
const attribute = textInput.getAttribute('onfocus');
console.log(attribute);
```

</CodeGroup>
