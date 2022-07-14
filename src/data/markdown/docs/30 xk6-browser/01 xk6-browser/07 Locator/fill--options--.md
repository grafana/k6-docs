---
title: 'fill(value, [options])'
excerpt: 'xk6-browser: locator.fill method'
---

Fill an `input`, `textarea` or `contenteditable` element with the provided value.

| Parameter | Type   | Description                                                            |
|-----------|--------|------------------------------------------------------------------------|
| value     | string | Value to set for the `input`, `textarea` or `contenteditable` element. |
| options   | object | See [options](#options) for more details.                              |

### options

<!-- vale off -->

| Option      | Type    | Default | Description                                                                                                                                                                                                                           |
|-------------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| force       | boolean | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                         |
| noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                            |
| timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto("https://test.k6.io/browser.php");
const textbox = page.locator("#text1");
textbox.fill('hello world!');
```

</CodeGroup>
