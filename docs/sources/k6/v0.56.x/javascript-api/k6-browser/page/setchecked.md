---
title: 'setChecked(selector, checked[, options])'
description: 'Browser module: page.setChecked method'
---

# setChecked(selector, checked[, options])

{{< admonition type="warning" >}}

Use [`locator.setChecked(checked [, options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/setchecked/) instead.

{{< /admonition >}}

Use this method to select or unselect an `input` or `radio` checkbox.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                                                                                                         |
| ------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options             | object  | `null`  | Optional parameters.                                                                                                                                                                                                                                                                                                |
| options.force       | boolean | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                                                                                                       |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                          |
| options.position    | object  | `null`  | A point to use relative to the top left corner of the element. If not supplied, a visible point of the element is used.                                                                                                                                                                                             |
| options.position.x  | number  | `0`     | The x coordinate.                                                                                                                                                                                                                                                                                                   |
| options.position.y  | number  | `0`     | The y coordinate.                                                                                                                                                                                                                                                                                                   |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |
| options.trial       | boolean | `false` | Setting this to `true` will perform the actionability checks without performing the action.                                                                                                                                                                                                                         |
| options.strict      | boolean | `false` | When `true`, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.                                                                                                                                                          |

</TableWithNestedRows>

### Returns

| Type            | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the set check action is finished. |

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

  await page.setChecked('#checkbox1', true);
  await page.setChecked('#checkbox1', false);

  await page.close();
}
```

{{< /code >}}
