---
title: 'textContent([options])'
excerpt: 'xk6-browser: locator.textContent method'
---

Returns the `element.textContent`.

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| options   | object | See [options](#options) for more details. |

### Returns

| Type   | Description                               |
|--------|-------------------------------------------|
| string | The text content of the selector or null. |

### options

<!-- vale off -->

| Option  | Type   | Default | Description                                                                                                                                                                                                                           |
|---------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
const res = page.goto('https://test.k6.io/browser.php');
const options = page.locator("#numbers-options");
console.log(options.textContent());
```

</CodeGroup>
