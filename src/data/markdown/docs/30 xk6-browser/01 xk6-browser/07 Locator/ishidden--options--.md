---
title: 'isHidden([options])'
excerpt: 'xk6-browser: locator.isHidden method'
---

Checks if the element is `hidden`.

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| options   | object | See [options](#options) for more details. |

### Returns

| Type | Description                                       |
|------|---------------------------------------------------|
| bool | `true` if the element is `hidden`, else `false`. |

### options

<!-- vale off -->

| Option  | Type   | Default | Description                                                                                                                                                                                                                           |
|---------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto('https://test.k6.io/browser.php');
const text = page.locator('#input-text-hidden');
if (text.isHidden()) {
    console.log("element is hidden");
}
```

</CodeGroup>
