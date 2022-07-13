---
title: 'setDefaultTimeout(timeout)'
excerpt: 'Sets the default timeout in milliseconds.'
---

<Blockquote mod="warning">

There is a known issue with this feature. See [issue #456](https://github.com/grafana/xk6-browser/issues/456) for details.

</Blockquote>

Sets the default maximum timeout for all methods accepting a `timeout` option.

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| timeout   | number | The timeout in milliseconds. |


### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
const context = browser.newContext();
context.setDefaultTimeout(1000); // 1s
const page = context.newPage();
page.click('h2'); // times out
```

</CodeGroup>
