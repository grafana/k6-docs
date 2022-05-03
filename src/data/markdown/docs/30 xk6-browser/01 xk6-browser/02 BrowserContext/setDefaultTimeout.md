---
title: 'setDefaultTimeout(timeout)'
excerpt: 'Sets the default timeout in milliseconds.'
---

Sets the default maximum timeout for all methods accepting a `timeout` option.

| Parameter | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| timeout   | number | The timeout in milliseconds. |


### Example

<!-- eslint-skip -->

<CodeGroup labels={[]}>

```javascript
const context = browser.newContext();
// FIXME: This is interpreted as 16m40s. Wrong JS->Go conversion.
context.setDefaultTimeout(1000); // 1s
const page = context.newPage();
page.click('h2'); // times out
```

</CodeGroup>
