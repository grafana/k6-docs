---
title: 'fill(value, [options])'
description: 'Browser module: locator.fill method'
---

# fill(value, [options])

Fill an `input`, `textarea` or `contenteditable` element with the provided value.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value               | string  | `''`    | Value to set for the `input`, `textarea` or `contenteditable` element.                                                                                                                                                                                                                                                                        |
| options             | object  | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.force       | boolean | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                                                                                                                                 |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                                                    |
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
  const textbox = page.locator('#text1');
  textbox.fill('hello world!');
}
```

{{< /code >}}
