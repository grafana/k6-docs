---
title: 'inputValue(selector[, options])'
excerpt: 'Browser module: page.inputValue(selector[, options]) method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/page/inputvalue/
---

<Blockquote mod="warning" title="">

Use locator-based [`locator.inputValue([options])`](/javascript-api/k6-experimental/browser/locator/inputvalue/) instead.

</Blockquote>

Returns `input.value` for the selected `input`, `textarea` or `select` element.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| selector        | string  | `''`    |  A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                 |
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.strict  | boolean| `false`  | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                            |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Returns

| Type   | Description                      |
|--------|----------------------------------|
| string | The input value of the element. |

### Example

<CodeGroup labels={[]}>

```javascript
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
            type: 'chromium',
        },
      },
    },
  },
}

export default async function () {
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.fill('#text1', 'Hello world!');
  const inputValue = page.inputValue('#text1');
  console.log(inputValue);
}
```

</CodeGroup>
