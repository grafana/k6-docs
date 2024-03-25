---
title: 'type(selector, text[, options])'
description: 'Browser module: page.type(selector, text[, options]) method'
---

# type(selector, text[, options])

{{% admonition type="warning" %}}

Use locator-based [`locator.type()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/type/) instead.

{{% /admonition %}}

Type the `text` in the first element found that matches the selector.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector            | string  | `''`    | A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                                                                                                                          |
| text                | string  | `''`    | A text to type into a focused element.                                                                                                                                                                                                                                                                                                        |
| options             | object  | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.delay       | number  | `0`     | Milliseconds to wait between key presses. Defaults to `0`.                                                                                                                                                                                                                                                                                    |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                                                    |
| options.strict      | boolean | `false` | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                                                                                                                                    |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

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
  page.type('#text1', 'hello world!');
}
```

{{< /code >}}
