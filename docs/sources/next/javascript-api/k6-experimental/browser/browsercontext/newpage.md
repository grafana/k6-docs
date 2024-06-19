---
title: 'newPage()'
description: 'Creates a new page inside this BrowserContext.'
---

# newPage()

Uses the [browser context](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext) to create and return a new [page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/).

### Returns

| Type            | Description                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<Page>` | A Promise that fulfills with a new [page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/page/) object. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/browser';

export default async function () {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php');
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
