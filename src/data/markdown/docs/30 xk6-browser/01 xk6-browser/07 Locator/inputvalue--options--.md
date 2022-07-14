---
title: 'inputValue([options])'
excerpt: 'xk6-browser: locator.inputValue method'
---

Returns `input.value` for the selected `input`, `textarea` or `select` element.

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| options   | object | See [options](#options) for more details. |

### Returns

| Type   | Description                      |
|--------|----------------------------------|
| string | The input value of the element. |

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
const textInput = page.locator('#text1');
textInput.fill("Hello world!");
const inputValue = textInput.inputValue();
console.log(inputValue);
```

</CodeGroup>
