---
title: 'fill(value, [options])'
description: 'Browser module: elementHandle.fill method'
---

# fill(value, [options])

{{% admonition type="warning" %}}

Use [`locator.fill(value, [options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/fill/) instead.

{{< /admonition >}}

Fill an `input`, `textarea` or `contenteditable` element with the provided value.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value               | string  | `''`    | Value to set for the `input`, `textarea` or `contenteditable` element.                                                                                                                                                                                                                                                                        |
| options             | object  | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.force       | boolean | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                                                                                                                                 |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                                                    |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type            | Description                                               |
| --------------- | --------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the fill action is finished. |

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

  const textbox = await page.$('#text1');
  await textbox.fill('hello world!');

  await page.close();
}
```

{{< /code >}}
