---
title: 'selectOption(selector, values[, options])'
description: 'Browser module: page.selectOption(selector, values[, options]) method'
---

# selectOption(selector, values[, options])

{{% admonition type="warning" %}}

Use locator-based [`locator.selectOption()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/selectoption/) instead.

{{% /admonition %}}

Selects one or more options which match the values from a `<select>` element.

<TableWithNestedRows>

| Parameter           | Type                         | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ---------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector            | string                       | `''`    | A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.                                                                                                                                                                                                                          |
| values              | string or string[] or object | `''`    | If the `select` has the multiple attribute, all matching options are selected, otherwise only the first option matching one of the passed options is selected. Object can be made up of keys with `value`, `label` or `index`.                                                                                                                |
| options             | object                       | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.force       | boolean                      | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                                                                                                                                 |
| options.noWaitAfter | boolean                      | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                                                    |
| options.strict      | boolean                      | `false` | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                                                                                                                                    |
| options.timeout     | number                       | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/). |

</TableWithNestedRows>

### Returns

| Type     | Description                   |
| -------- | ----------------------------- |
| string[] | List of the selected options. |

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
  page.selectOption('#numbers-options', 'three');
}
```

{{< /code >}}
