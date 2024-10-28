---
title: 'uncheck([options])'
description: 'Browser module: elementHandle.uncheck method'
---

# uncheck([options])

{{< admonition type="warning" >}}

Use [`locator.uncheck([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/uncheck/) instead.

{{< /admonition >}}

Unselect the `input` checkbox.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                                                                                                         |
| ------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options             | object  | `null`  |                                                                                                                                                                                                                                                                                                                     |
| options.force       | boolean | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                                                                                                       |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                          |
| options.position    | object  | `null`  | A point to use relative to the top left corner of the element. If not supplied, a visible point of the element is used.                                                                                                                                                                                             |
| options.position.x  | number  | `0`     | The x coordinate.                                                                                                                                                                                                                                                                                                   |
| options.position.y  | number  | `0`     | The y coordinate.                                                                                                                                                                                                                                                                                                   |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |
| options.trial       | boolean | `false` | Setting this to `true` will perform the actionability checks without performing the action.                                                                                                                                                                                                                         |

</TableWithNestedRows>

### Returns

| Type            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `Promise<void>` | A Promise that fulfills when the uncheck action is finished. |

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

  const checkbox = await page.$('#checkbox1');
  await checkbox.check();
  await checkbox.uncheck();

  await page.close();
}
```

{{< /code >}}
