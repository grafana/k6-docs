---
title: 'innerText(selector[, options])'
excerpt: 'Browser module: page.innerText(selector[, options]) method'
---

# innerText(selector[, options])

{{% admonition type="warning" %}}

Use locator-based [`locator.innerText([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/innertext/) instead.

 {{% /admonition %}}

Returns the `element.innerText`.

<TableWithNestedRows>

| Parameter       | Type    | Default | Description                                                                                                                                                                                                                                                   |
| --------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector        | string  | `''`    | A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                                          |
| options         | object  | `null`  |                                                                                                                                                                                                                                                               |
| options.strict  | boolean | `false` | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                                                    |
| options.timeout | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Returns

| Type   | Description                   |
| ------ | ----------------------------- |
| string | The innerText of the element. |

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
  const innerText = page.innerText('#off-screen');
  console.log(innerText);
}
```

{{< /code >}}
