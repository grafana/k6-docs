---
title: 'focus([options])'
excerpt: 'xk6-browser: locator.focus method'
---

Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the element, if it can be focused on.

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| options   | object | See [options](#options) for more details. |

### options

<!-- vale off -->

| Option  | Type   | Default | Description                                                                                                                                                                                                                           |
|---------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto("https://test.k6.io/browser.php");
const textbox = page.locator("#text1");
textbox.focus();
```

</CodeGroup>
