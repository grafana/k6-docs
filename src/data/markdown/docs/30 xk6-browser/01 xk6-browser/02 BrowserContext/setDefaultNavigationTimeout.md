---
title: 'setDefaultNavigationTimeout(timeout)'
excerpt: 'Sets the default navigation timeout in milliseconds.'
---

Sets the default maximum navigation timeout for [Page.goto()](/javascript-api/xk6-browser/page/goto/).

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| timeout   | number | The timeout in milliseconds. |


### Example

<!-- eslint-skip -->

<CodeGroup labels={[]}>

```javascript
const context = browser.newContext();
const page = context.newPage();
context.setDefaultNavigationTimeout(1000); // 1s
// FIXME: Doesn't time out! Some JS->Go translation issue...
page.goto('https://httpbin.test.k6.io/delay/5');
```

</CodeGroup>
