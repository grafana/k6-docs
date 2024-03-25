---
title: 'waitForSelector(selector[, options])'
description: 'Browser module: page.waitForSelector(selector[, options]) method'
---

# waitForSelector(selector[, options])

{{% admonition type="note" %}}

Use web assertions that assert visibility or a locator-based [`locator.waitFor([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/waitfor/) instead.

{{% /admonition %}}

Returns when element specified by selector satisfies `state` option.

<TableWithNestedRows>

| Parameter       | Type    | Default   | Description                                                                                                                                                                                                                                                                                                                                   |
| --------------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector        | string  | `''`      | A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                                                                                                                          |
| options         | object  | `null`    |                                                                                                                                                                                                                                                                                                                                               |
| options.state   | string  | `visible` | Can be either `attached`, `detached`, `visible`, `hidden` See [Element states](#element-states) for more details.                                                                                                                                                                                                                             |
| options.strict  | boolean | `false`   | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                                                                                                                                    |
| options.timeout | number  | `30000`   | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Element states

Element states can be either:

- `'attached'` - wait for element to be present in DOM.
- `'detached'` - wait for element to not be present in DOM.
- `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`.
- `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`.

### Returns

| Type                                                                                                               | Description                                                                |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| null \| [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/keyboard/) | `ElementHandle` when a matching element is found. Else, it returns `null`. |

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
  page.waitForSelector('#text1');
}
```

{{< /code >}}
