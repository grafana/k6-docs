---
title: 'tap([options])'
excerpt: 'xk6-browser: locator.tap method'
---

<Blockquote mod="warning">

See [issue #436](https://github.com/grafana/xk6-browser/issues/436) and [issue #471](https://github.com/grafana/xk6-browser/issues/471) for details of known issues.

</Blockquote>

Tap on the chosen element.

<TableWithNestedRows>

| Parameter           | Type     | Default | Description                                                                                                                                                                                                                           |
|---------------------|----------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options             | object   | `null`  |                                                                                                                                                                                                                      |
| options.force       | boolean  | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                         |
| options.modifiers   | string[] | `null`  | `Alt`, `Control`, `Meta` or `Shift` modifiers keys pressed during the action. If not specified, currently pressed modifiers are used.                                                                                                 |
| options.noWaitAfter | boolean  | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                            |
| options.position    | object   | `null`  | A point to use relative to the top left corner of the element. If not supplied, a visible point of the element is used.                                                                                                               |
| options.position.x  | number   | `0`     | The x coordinate.                                                                                                                                                                                                                     |
| options.position.y  | number   | `0`     | The y coordinate.                                                                                                                                                                                                                     |
| options.timeout     | number   | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/) or [Page](/javascript-api/xk6-browser/api/page/). |
| options.trial       | boolean  | `false` | Setting this to `true` will perform the actionability checks without performing the action.                                                                                                                                           |

</TableWithNestedRows>

### Example

<CodeGroup labels={[]}>

[//]: # (eslint-skip)

```javascript
const page = context.newPage({
    hasTouch: true,
});

page
  .goto('https://test.k6.io/browser.php')
  .then(() => {
    const options = page.locator("#numbers-options");
    options.tap();      
  });
```

</CodeGroup>
