---
title: 'focus([options])'
excerpt: 'Browser module: locator.focus method'
---

Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the element, if it can be focused on.

<TableWithNestedRows>

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`  |                                                                                                                                                                                                                      |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

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
  const textbox = page.locator("#text1");
  textbox.focus();
}
```

</CodeGroup>
