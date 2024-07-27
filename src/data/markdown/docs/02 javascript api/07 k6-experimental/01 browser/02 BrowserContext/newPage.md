---
title: 'newPage()'
excerpt: 'Creates a new page inside this BrowserContext.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/browsercontext/newpage/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/browsercontext/newpage/
---

Uses the `BrowserContext` to create a new [Page](/javascript-api/k6-experimental/browser/page/) and returns it.


### Returns

| Type   | Description                                             |
| ------ | ------------------------------------------------------- |
| object | A new [Page](/javascript-api/k6-experimental/browser/page/) object. |


### Example

<CodeGroup labels={[]}>

```javascript
import { browser } from 'k6/experimental/browser';

export default async function () {
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php');
  } finally {
    page.close();
  }
}
```

</CodeGroup>