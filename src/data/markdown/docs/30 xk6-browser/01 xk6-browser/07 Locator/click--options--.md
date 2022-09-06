---
title: 'click([options])'
excerpt: 'xk6-browser: locator.click method'
---

<Blockquote mod="warning">

There are known issues with this feature. See [issue #471](https://github.com/grafana/xk6-browser/issues/471) and [issue #474](https://github.com/grafana/xk6-browser/issues/474) for details.

</Blockquote>

Mouse click on the chosen element.

<TableWithNestedRows>

| Parameter           | Type     | Default | Description                                                                                                                                                                                                                           |
|---------------------|----------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options             | object   | `null`  | Optional options.                                                                                                                                                                                             |
| options.button      | string   | `left`  | The mouse button (`left`, `middle` or `right`) to use during the action.                                                                                                                                                              |
| options.clickCount  | number   | `1`     | The number of times the action is performed.                                                                                                                                                                                          |
| options.delay       | number   | `0`     | Milliseconds to wait between `mousedown` and `mouseup`.                                                                                                                                                                               |
| options.force       | boolean  | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                         |
| options.modifiers   | string[] | `null`  | `Alt`, `Control`, `Meta` or `Shift` modifiers keys pressed during the action. If not specified, currently pressed modifiers are used.                                                                                                 |
| options.noWaitAfter | boolean  | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                            |
| options.position    | object   | `null`  | A point to use relative to the top left corner of the element. If not supplied, a visible point of the element is used.                                                                                                               |
| options.position.x  | number   | `0`     | The x coordinate.                                                                                                                                                                                                                     |
| options.position.y  | number   | `0`     | The y coordinate.                                                                                                                                                                                                                     |
| options.timeout     | number   | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |
| options.trial       | boolean  | `false` | Setting this to `true` will perform the actionability checks without performing the action.                                                                                                                                           |

</TableWithNestedRows>

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto("https://test.k6.io/browser.php");
const button = page.locator("#counter-button");
button.click();
```

</CodeGroup>
