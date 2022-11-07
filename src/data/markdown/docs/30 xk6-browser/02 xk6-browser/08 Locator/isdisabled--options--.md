---
title: 'isDisabled([options])'
excerpt: 'xk6-browser: locator.isDisabled method'
---

Checks if the element is `disabled`.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type | Description                                       |
|------|---------------------------------------------------|
| bool | `true` if the element is `disabled`, else `false`. |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page
  .goto('https://test.k6.io/browser.php')
  .then(() => {
    const text = page.locator('#input-text-disabled');
    if (text.isDisabled()) {
        console.log("element is disabled")
    }
  });
```

</CodeGroup>
