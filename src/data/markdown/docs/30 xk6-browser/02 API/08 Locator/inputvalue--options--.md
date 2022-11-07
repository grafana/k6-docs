---
title: 'inputValue([options])'
excerpt: 'xk6-browser: locator.inputValue method'
---

Returns `input.value` for the selected `input`, `textarea` or `select` element.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/) or [Page](/javascript-api/xk6-browser/api/page/). |

</TableWithNestedRows>

### Returns

| Type   | Description                      |
|--------|----------------------------------|
| string | The input value of the element. |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page
  .goto('https://test.k6.io/browser.php')
  .then(() => {
    const textInput = page.locator('#text1');
    textInput.fill("Hello world!");
    const inputValue = textInput.inputValue();
    console.log(inputValue);
  });
```

</CodeGroup>
