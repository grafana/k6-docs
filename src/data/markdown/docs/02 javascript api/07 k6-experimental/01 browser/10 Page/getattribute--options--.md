---
title: 'getAttribute(selector, name[, options])'
excerpt: 'Browser module: page.getAttribute(selector, name[, options]) method'
---

<Blockquote mod="note" title="">

Use locator-based [`locator.getAttribute()`](/javascript-api/k6-experimental/browser/locator/getattribute/) instead.

</Blockquote>

Returns the element attribute value for the given attribute name.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| selector        | string  | `''`    |  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                 |
| name            | string | `''`    | Attribute name to get the value for.                                                                                                                                                                                                  |
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.strict  | boolean| `false`  | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                            |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Returns

| Type   | Description                         |
|--------|-------------------------------------|
| null or string | The value of the attribute. Else, it returns `null`. |

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  const attribute = page.getAttribute('#text1', 'onfocus');
  console.log(attribute); // prints inputTextOnFocus();
}
```

</CodeGroup>
