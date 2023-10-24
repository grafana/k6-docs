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
import { browser } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
            type: 'chromium',
        },
      },
    },
  },
}

export default function () {
  const context = browser.newContext();
  context.newPage();
  const pages = context.pages();
  console.log(pages.length); // 1
  context.close();
}
```

</CodeGroup>
