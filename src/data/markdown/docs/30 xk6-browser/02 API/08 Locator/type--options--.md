---
title: 'type(text, [options])'
excerpt: 'xk6-browser: locator.type method'
---

Type in the text into the input field.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                           |
|---------------------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| text                | string  | `''`    | A text to type into a focused element.                                                                                                                                                                                                |
| options             | object  | `null`  |                                                                                                                                                                                                                      |
| options.delay       | number  | `0`     | Milliseconds to wait between key presses. Defaults to `0`.                                                                                                                                                                            |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                            |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/) or [Page](/javascript-api/xk6-browser/api/page/). |

</TableWithNestedRows>

### Example

<CodeGroup labels={[]}>

{/* eslint-skip */}

```javascript
page
  .goto('https://test.k6.io/browser.php')
  .then(() => {
    const text = page.locator("#text1");
    text.type('hello world!');    
  });
```

</CodeGroup>
