---
title: 'pages()'
excerpt: 'Returns a list of pages inside this BrowserContext.'
---

<Blockquote mod="attention">

This feature has **known issues**. For details, refer to
[#444](https://github.com/grafana/xk6-browser/issues/444).

</Blockquote>

Returns all open [Page](/javascript-api/k6-experimental/browser/page/)s in the `BrowserContext`.


### Returns

| Type   | Description     |
| ------ | --------------- |
| array  | All open pages. |


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default function () {
  const browser = chromium.launch();
  const context = browser.newContext();
  context.newPage();
  const pages = context.pages();
  console.log(pages.length); // 1

  context.close();
  browser.close();
}
```

</CodeGroup>
