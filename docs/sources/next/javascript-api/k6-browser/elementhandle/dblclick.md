---
title: 'dblclick([options])'
description: 'Browser module: elementHandle.dblclick method'
---

# dblclick([options])

{{% admonition type="warning" %}}

Use [`locator.dblclick([options])`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/dblclick/) instead.

{{% /admonition %}}

Mouse double clicks on the element.

<TableWithNestedRows>

| Parameter           | Type     | Default | Description                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| options             | object   | `null`  | Optional parameters.                                                                                                                                                                                                                                                                                                                                   |
| options.button      | string   | `left`  | The mouse button (`left`, `middle` or `right`) to use during the action.                                                                                                                                                                                                                                                                               |
| options.delay       | number   | `0`     | Milliseconds to wait between `mousedown` and `mouseup`.                                                                                                                                                                                                                                                                                                |
| options.force       | boolean  | `false` | Bypasses the actionability checks (`visible`, `stable`, `enabled`) if set to `true`.                                                                                                                                                                                                                                                                   |
| options.modifiers   | string[] | `null`  | `Alt`, `Control`, `Meta` or `Shift` modifiers keys pressed during the action. If not specified, currently pressed modifiers are used.                                                                                                                                                                                                                  |
| options.noWaitAfter | boolean  | `false` | If set to `true` and a navigation occurs from performing this action, it doesn't wait for it to complete.                                                                                                                                                                                                                                              |
| options.position    | object   | `null`  | A point to use relative to the top left corner of the element. If not supplied, a visible point of the element is used.                                                                                                                                                                                                                                |
| options.position.x  | number   | `0`     | The x coordinate.                                                                                                                                                                                                                                                                                                                                      |
| options.position.y  | number   | `0`     | The y coordinate.                                                                                                                                                                                                                                                                                                                                      |
| options.timeout     | number   | `30000` | Maximum time in milliseconds. Passing `0` disables the timeout. The `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/) can override the default timeout. |
| options.trial       | boolean  | `false` | Performs the actionability checks without performing the double click action if set to `true`.                                                                                                                                                                                                                                                         |

</TableWithNestedRows>

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

  const elementHandle = await page.$('#counter-button');
  await elementHandle.dblclick();

  await page.close();
}
```

{{< /code >}}
