---
title: 'hover([options])'
excerpt: 'xk6-browser: locator.hover method'
---

<Blockquote mod="warning">

There is a known issue with this feature. See [issue #471](https://github.com/grafana/xk6-browser/issues/471) for details.

</Blockquote>

Hovers over the element.

| Parameter | Type   | Description                               |
| --------- | ------ | ----------------------------------------- |
| options   | object | See [options](#options) for more details. |

### options

<!-- vale off -->

| Option      | Type    | Default | Description                                                                                                                                                                                                                           |
|-------------|---------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| force       | boolean | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                         |
| modifiers   | string[]  | `null`  | `Alt`, `Control`, `Meta` or `Shift` modifiers keys pressed during the action. If not specified, currently pressed modifiers are used.                                                                                                 |
| noWaitAfter | boolean | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                            |
| position    | object  | `null`  | A point to use relative to the top left corner of the element. If not supplied, a visible point of the element is used. See [position](#position) for more details.                                                                   |
| timeout     | number  | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |
| trial       | boolean | `false` | Setting this to `true` will perform the actionability checks without performing the action.                                                                                                                                           |

### position

| variable | Type   | Description       |
|----------|--------|-------------------|
| x        | number | The x coordinate. |
| y        | number | The y coordinate. |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto('https://test.k6.io/browser.php');
const offScreenElement = page.locator("#off-screen");
offScreenElement.hover();
```

</CodeGroup>
