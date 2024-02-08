---
title: 'newPage()'
description: 'Creates a new page inside this BrowserContext.'
---

# newPage()

Uses the `BrowserContext` to create a new [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/) and returns it.

### Returns

| Type   | Description                                                                                                 |
| ------ | ----------------------------------------------------------------------------------------------------------- |
| object | A new [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/) object. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

export default async function () {
  const context = browser.newContext();
  const page = context.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php');
  } finally {
    page.close();
  }
}
```

{{< /code >}}
