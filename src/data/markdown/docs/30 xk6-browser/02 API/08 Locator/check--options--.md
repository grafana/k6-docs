---
title: 'check([options])'
excerpt: 'xk6-browser: locator.check method'
---

<Blockquote mod="warning">

See [issue #471](https://github.com/grafana/xk6-browser/issues/471) and [issue #475](https://github.com/grafana/xk6-browser/issues/475) for details of known issues.

</Blockquote>

Use this method to select an `input` checkbox.

<TableWithNestedRows>

| Parameter           | Type    | Default | Description                                                                                                                                                                                                                           |
|---------------------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options             | object  | `null`  |                                                                                                                                                                                                                      |
| options.force       | boolean | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                         |
| options.noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                            |
| options.position    | object  | `null`  | A point to use relative to the top left corner of the element. If not supplied, a visible point of the element is used.                                                                                                               |
| options.position.x  | number  | `0`     | The x coordinate.                                                                                                                                                                                                                     |
| options.position.y  | number  | `0`     | The y coordinate.                                                                                                                                                                                                                     |
| options.timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/) or [Page](/javascript-api/xk6-browser/api/page/). |
| options.trial       | boolean | `false` | Setting this to `true` will perform the actionability checks without performing the action.                                                                                                                                           |

</TableWithNestedRows>

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page
  .goto('https://test.k6.io/browser.php')
  .then(() => {
    const checkbox = page.locator("#checkbox1");
    checkbox.check();
  });
```

</CodeGroup>
