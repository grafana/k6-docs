---
title: 'waitForSelector(selector[, options])'
excerpt: 'Browser module: page.waitForSelector(selector[, options]) method'
---

<Blockquote mod="note" title="">

Use web assertions that assert visibility or a locator-based [`locator.waitFor([options])`](/javascript-api/k6-experimental/browser/locator/waitfor/) instead.

</Blockquote>

Returns when element specified by selector satisfies `state` option.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| selector        | string  | `''`    |  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                 |
| options             | object  | `null`  |                                                                                                                                                                                                                      |
| options.state | string | `visible` | Can be either `attached`, `detached`, `visible`, `hidden` See [Element states](#element-states) for more details. |
| options.strict  | boolean| `false`  | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                            |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Element states

Element states can be either:

- `'attached'` - wait for element to be present in DOM.
- `'detached'` - wait for element to not be present in DOM.
- `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`.
- `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`.

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.waitForSelector('#text1');
}
```

</CodeGroup>