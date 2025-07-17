---
title: 'isVisible(selector[, options])'
description: 'Browser module: page.isVisible(selector[, options]) method'
---

# isVisible(selector[, options])

{{< admonition type="warning" >}}

Use locator-based [`locator.isVisible([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/isvisible/) instead.

{{< /admonition >}}

Checks if the element is `visible`.

<TableWithNestedRows>

| Parameter      | Type    | Default | Description                                                                                                                                                        |
| -------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| selector       | string  | `''`    | A selector to search for an element. If there are multiple elements satisfying the selector, the first one will be used.                                           |
| options        | object  | `null`  |                                                                                                                                                                    |
| options.strict | boolean | `false` | When `true`, the call requires the selector to resolve to a single element. If the given selector resolves to more than one element, the call throws an exception. |

</TableWithNestedRows>

### Returns

| Type            | Description                                                                    |
| --------------- | ------------------------------------------------------------------------------ |
| `Promise<bool>` | A Promise that fullfils with `true` if the element is `visible`, else `false`. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

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
};

export default async function () {
  const page = await browser.newPage();

  await page.goto('https://test.k6.io/browser.php');
  const isVisible = await page.isVisible('#text1');
  if (isVisible) {
    console.log('element is visible');
  }
}
```

{{< /code >}}
