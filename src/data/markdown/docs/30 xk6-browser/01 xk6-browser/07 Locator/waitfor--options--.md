---
title: 'waitFor([options])'
excerpt: 'xk6-browser: locator.waitFor method'
---

<Blockquote mod="warning">

There is a known issue with this feature. See [issue #472](https://github.com/grafana/xk6-browser/issues/472) for details.

</Blockquote>

Wait for the element to be in a particular state e.g. `visible`.

| Parameter | Type   | Description                               |
|-----------|--------|-------------------------------------------|
| options   | object | See [options](#options) for more details. |

### options

<!-- vale off -->

| Option  | Type   | Default   | Description                                                                                                                                                                                                                           |
|---------|--------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| state   | string | `visible` | Can be `attached`, `detached`, `visible` or `hidden`.                                                                                                                                                                                 |
| timeout | number | `30000`   | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/browsercontext/) or [Page](/javascript-api/xk6-browser/page/). |

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
const res = page.goto('https://test.k6.io/browser.php');
const text = page.locator('#input-text-hidden');
text.waitFor({
    state: 'hidden',
});
```

</CodeGroup>
