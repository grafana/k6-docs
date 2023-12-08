---
title: 'inputValue([options])'
excerpt: 'Browser module: locator.inputValue method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/locator/inputvalue/
---

Returns `input.value` for the selected `input`, `textarea` or `select` element.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`  |                                                                                                                                                                                                                      |
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
  const textInput = page.locator('#text1');
  textInput.fill("Hello world!");
  const inputValue = textInput.inputValue();
  console.log(inputValue);
}
```

</CodeGroup>
