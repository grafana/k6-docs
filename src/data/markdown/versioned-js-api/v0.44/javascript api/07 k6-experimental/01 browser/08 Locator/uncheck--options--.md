---
title: 'uncheck([options])'
excerpt: 'Browser module: locator.uncheck method'
---

<Blockquote mod="attention">

This feature has **known issues**.
For details, refer to [#471](https://github.com/grafana/xk6-browser/issues/471).

</Blockquote>

Unselect the `input` checkbox.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                           |
|---------------------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options             | object  | `null`  |                                                                                                                                                                                                                      |
| options.force       | boolean | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                         |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                            |
| options.position    | object  | `null`  | A point to use relative to the top left corner of the element. If not supplied, a visible point of the element is used.                                                                                                               |
| options.position.x  | number  | `0`     | The x coordinate.                                                                                                                                                                                                                     |
| options.position.y  | number  | `0`     | The y coordinate.                                                                                                                                                                                                                     |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/k6-experimental/browser/browsercontext/) or [Page](/javascript-api/k6-experimental/browser/page/). |
| options.trial       | boolean | `false` | Setting this to `true` will perform the actionability checks without performing the action.                                                                                                                                           |

</TableWithNestedRows>

### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  const checkbox = page.locator("#checkbox1");
  checkbox.check();
  checkbox.uncheck();  
}
```

</CodeGroup>
