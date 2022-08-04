---
title: 'fill(value, [options])'
excerpt: 'xk6-browser: locator.fill method'
---

Fill an `input`, `textarea` or `contenteditable` element with the provided value.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                           |
|---------------------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| value               | string  | `''`    | Value to set for the `input`, `textarea` or `contenteditable` element.                                                                                                                                                                |
| options             | object  | `null`  | Optional options.                                                                                                                                                                                                                     |
| options.force       | boolean | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                         |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                            |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

</TableWithNestedRows>

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto("https://test.k6.io/browser.php");
const textbox = page.locator("#text1");
textbox.fill('hello world!');
```

</CodeGroup>
