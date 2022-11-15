---
title: 'setDefaultNavigationTimeout(timeout)'
excerpt: 'Sets the default navigation timeout in milliseconds.'
---

<Blockquote mod="warning">

See [issue #445](https://github.com/grafana/xk6-browser/issues/445) for details of a known issue.

</Blockquote>

Sets the default maximum navigation timeout for [Page.goto()](/javascript-api/xk6-browser/api/page/goto/).

| Parameter | Type   | Default                  | Description                  |
|-----------|--------|--------------------------|------------------------------|
| timeout   | number | Dependent on the action. | The timeout in milliseconds. |


### Example

<CodeGroup labels={[]}>

[//]: # (eslint-skip)

```javascript
const context = browser.newContext();
const page = context.newPage();
context.setDefaultNavigationTimeout(1000); // 1s

page
  .goto('https://httpbin.test.k6.io/delay/5', {
    waitUntil: 'networkidle',
  })
  .finally(() => {
    page.close();
    browser.close();
  });
```

</CodeGroup>
