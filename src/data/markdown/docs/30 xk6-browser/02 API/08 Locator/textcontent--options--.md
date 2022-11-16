---
title: 'textContent([options])'
excerpt: 'xk6-browser: locator.textContent method'
---

Returns the `element.textContent`.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/) or [Page](/javascript-api/xk6-browser/api/page/). |

</TableWithNestedRows>

### Returns

| Type   | Description                               |
|--------|-------------------------------------------|
| string | The text content of the selector or null. |

### Example

<CodeGroup labels={[]}>

{/* eslint-skip */}

```javascript
page
  .goto('https://test.k6.io/browser.php')
  .then(() => {
    const options = page.locator("#checkbox1");
    console.log(options.textContent()); /*  Zero
                                            One
                                            Two
                                            Three
                                            Four
                                            Five
                                        */    
  });
```

</CodeGroup>
