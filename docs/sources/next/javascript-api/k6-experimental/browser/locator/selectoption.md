---
title: 'selectOption(values, [options])'
description: 'Browser module: locator.selectOption method'
---

# selectOption(values, [options])

{{% admonition type="caution" %}}

This feature has **known issues**. For details, refer to
[#470](https://github.com/grafana/xk6-browser/issues/470) and [#471](https://github.com/grafana/xk6-browser/issues/471).

{{% /admonition %}}

Select one or more options which match the values.

<TableWithNestedRows>

| Parameter           | Type                         | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ---------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| values              | string or string[] or object | `''`    | If the `select` has the multiple attribute, all matching options are selected, otherwise only the first option matching one of the passed options is selected. Object can be made up of keys with `value`, `label` or `index`.                                                                                                                |
| options             | object                       | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.force       | boolean                      | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                                                                                                                                 |
| options.noWaitAfter | boolean                      | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                                                    |
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
  const options = page.locator('#numbers-options');
  options.selectOption('three');
}
```

{{< /code >}}
