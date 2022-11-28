---
title: 'waitFor([options])'
excerpt: 'xk6-browser: locator.waitFor method'
---

<Blockquote mod="attention">

This feature has **known issues**. For details,
refer to [#472](https://github.com/grafana/xk6-browser/issues/472).

</Blockquote>

Wait for the element to be in a particular state e.g. `visible`.

<TableWithNestedRows>

| Parameter       | Type   | Default   | Description                                                                                                                                                                                                                           |
|-----------------|--------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| options         | object | `null`    |                                                                                                                                                                                                                      |
| options.state   | string | `visible` | Can be `attached`, `detached`, `visible` or `hidden`.                                                                                                                                                                                 |
| options.timeout | number | `30000`   | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](/javascript-api/xk6-browser/api/browsercontext/) or [Page](/javascript-api/xk6-browser/api/page/). |

</TableWithNestedRows>

### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
page
  .goto('https://test.k6.io/browser.php')
  .then(() => {
    const text = page.locator('#input-text-hidden');
    text.waitFor({
        state: 'hidden',
    });   
  });
```

</CodeGroup>
