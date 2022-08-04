---
title: 'selectOption(values, [options])'
excerpt: 'xk6-browser: locator.selectOption method'
---

<Blockquote mod="warning">

There are known issues with this feature. See [issue #470](https://github.com/grafana/xk6-browser/issues/470) and [issue #471](https://github.com/grafana/xk6-browser/issues/471) for details.

</Blockquote>

Select one or more options which match the values.

<TableWithNestedRows>

| Parameter           | Type                         | Default | Description                                                                                                                                                                                                                           |
|---------------------|------------------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| values              | string or string[] or object | `''`    | If the `select` has the multiple attribute, all matching options are selected, otherwise only the first option matching one of the passed options is selected. Object can be made up of keys with `value`, `label` or `index`.        |
| options             | object                       | `null`  | Optional options.                                                                                                                                                                                                                     |
| options.force       | boolean                      | `false` | Setting this to `true` will bypass the actionability checks (`visible`, `stable`, `enabled`).                                                                                                                                         |
| options.noWaitAfter | boolean                      | `false` | If set to `true` and a navigation occurs from performing this action, it will not wait for it to complete.                                                                                                                            |
| options.timeout     | number                       | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

</TableWithNestedRows>

### Returns

| Type     | Description                   |
|----------|-------------------------------|
| string[] | List of the selected options. |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page.goto('https://test.k6.io/browser.php');
const options = page.locator('#numbers-options');
options.selectOption('three');
```

</CodeGroup>
