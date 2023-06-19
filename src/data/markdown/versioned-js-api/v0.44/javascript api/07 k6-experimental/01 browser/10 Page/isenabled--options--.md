---
title: 'isEnabled(selector[, options])'
excerpt: 'Browser module: page.isEnabled(selector[, options]) method'
---

<Blockquote mod="warning" title="">

Use locator-based [`locator.isEnabled([options])`](/javascript-api/k6-experimental/browser/locator/isenabled/) instead.

</Blockquote>

Checks if the element is `enabled`.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| selector        | string  | `''`    |  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                 |
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.strict  | boolean| `false`  | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                            |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Returns

| Type | Description                                       |
|------|---------------------------------------------------|
| bool | `true` if the element is `enabled`, else `false`. |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
	if (page.isEnabled('#text1')) {
		console.log("element is enabled");
	}
}
```

</CodeGroup>
