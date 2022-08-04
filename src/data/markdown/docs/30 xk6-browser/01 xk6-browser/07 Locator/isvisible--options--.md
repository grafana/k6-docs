---
title: 'isVisible([options])'
excerpt: 'xk6-browser: locator.isVisible method'
---

Checks if the element is `visible`.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`  | Optional options.                                                                                                                                                                                                                     |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type | Description                                       |
|------|---------------------------------------------------|
| bool | `true` if the element is `visible`, else `false`. |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto('https://test.k6.io/browser.php');
const text = page.locator('#text1');
if (text.isVisible()) {
    console.log("element is visible");
}
```

</CodeGroup>
