---
title: 'isEditable([options])'
excerpt: 'xk6-browser: locator.isEditable method'
---

Checks if the element is `editable`.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/) or [Page](/javascript-api/xk6-browser/api/page/). |

</TableWithNestedRows>

### Returns

| Type | Description                                        |
|------|----------------------------------------------------|
| bool | `true` if the element is `editable`, else `false`. |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page
  .goto('https://test.k6.io/browser.php')
  .then(() => {
    const text = page.locator('#text1');
    if (text.isEditable()) {
        text.fill("hello world!");
    }
  });
```

</CodeGroup>
