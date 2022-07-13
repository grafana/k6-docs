---
title: 'setDefaultNavigationTimeout(timeout)'
excerpt: 'Sets the default navigation timeout in milliseconds.'
---

<Blockquote mod="warning">

There is a known issue with this feature. See [issue #445](https://github.com/grafana/xk6-browser/issues/445) for details.

</Blockquote>

Sets the default maximum navigation timeout for [Page.goto()](/javascript-api/xk6-browser/page/goto/).

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| timeout   | number | The timeout in milliseconds. |


### Example

<CodeGroup labels={[]}>

<!-- eslint-skip -->

```javascript
const context = browser.newContext();
const page = context.newPage();
context.setDefaultNavigationTimeout(1000); // 1s
// FIXME: Doesn't time out! Some JS->Go translation issue...
page.goto('https://httpbin.test.k6.io/delay/5');
```

</CodeGroup>
