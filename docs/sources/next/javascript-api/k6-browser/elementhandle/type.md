---
title: 'type(text, [options])'
description: 'Browser module: elementHandle.type method'
---

# type(text, [options])

{{% admonition type="warning" %}}

Use [`locator.type([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/type/) instead.

{{% /admonition %}}

Type in the text into the input field.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| text                | string  | `''`    | A text to type into a focused element.                                                                                                                                                                                                                                                                                                        |
| options             | object  | `null`  |                                                                                                                                                                                                                                                                                                                                               |
| options.delay       | number  | `0`     | Milliseconds to wait between key presses. Defaults to `0`.                                                                                                                                                                                                                                                                                    |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                                                                                                                                    |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type            | Description                                               |
| --------------- | --------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the type action is finished. |

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

  const text = await page.$('#text1');
  await text.type('hello world!');

  await page.close();
}
```

{{< /code >}}
