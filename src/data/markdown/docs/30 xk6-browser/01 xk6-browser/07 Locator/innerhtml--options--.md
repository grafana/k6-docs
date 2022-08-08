---
title: 'innerHTML([options])'
excerpt: 'xk6-browser: locator.innerHTML method'
---

Returns the `element.innerHTML`.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type   | Description                    |
|--------|--------------------------------|
| string | The innerHTML of the element. |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto('https://test.k6.io/browser.php');
const offScreen = page.locator('#off-screen');
const innerHTML = offScreen.innerHTML();
console.log(innerHTML);
```

</CodeGroup>
