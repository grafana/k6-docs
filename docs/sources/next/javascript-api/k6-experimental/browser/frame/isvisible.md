---
title: 'isVisible(selector[, options])'
description: 'Browser module: frame.isVisible(selector[, options]) method'
---

# isVisible(selector[, options])

{{% admonition type="warning" %}}

Use locator-based [`locator.isVisible([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/isvisible/) instead.

{{% /admonition %}}

Checks if the element is `visible`.

<TableWithNestedRows>

| Parameter      | Type    | Default | Description                                                                                                                                                        |
| -------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| selector       | string  | `''`    | A selector to search for an element. If there are multiple elements satisfying the selector, the first one will be used.                                           |
| options        | object  | `null`  |                                                                                                                                                                    |
| options.strict | boolean | `false` | When `true`, the call requires the selector to resolve to a single element. If the given selector resolves to more than one element, the call throws an exception. |

</TableWithNestedRows>

### Returns

| Type | Description                                            |
| ---- | ------------------------------------------------------ |
| bool | `true` if the element is `visible`, `false` otherwise. |

### Example

{{< code >}}

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
};

export default async function () {
  const page = browser.newPage();

  await page.goto('https://test.k6.io/browser.php');

  const frames = page.frames();

  if (frames[0].isVisible('#text1')) {
    console.log('element is visible');
  }
}
```

{{< /code >}}
