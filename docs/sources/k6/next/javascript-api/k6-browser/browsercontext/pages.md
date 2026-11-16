---
title: 'pages()'
description: 'Returns a list of pages inside this BrowserContext.'
---

# pages()

Returns all open [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/)s in the `BrowserContext` in the order they were attached. Closing a page removes it without changing the order of the remaining pages. A newly attached page appears at the end.

### Returns

| Type          | Description                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| `Array<Page>` | An array of [page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/) objects. |

### Example

```javascript
import { browser } from 'k6/browser';

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
};

export default async function () {
  const context = await browser.newContext();
  await context.newPage();
  const pages = context.pages();
  console.log(pages.length); // 1
  await context.close();
}
```
