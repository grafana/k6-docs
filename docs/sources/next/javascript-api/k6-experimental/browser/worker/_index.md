---
title: 'Worker'
description: 'Browser module: Worker Class'
weight: 14
---

# Worker

{{< docs/shared source="k6" lookup="browser-module-wip.md" version="<K6_VERSION>" >}}

Represents a Web Worker or a Service Worker within the browser context.

## Supported APIs

| Method                                                                                              | Playwright Relevant Distinctions |
| --------------------------------------------------------------------------------------------------- | -------------------------------- |
| <a href="https://playwright.dev/docs/api/class-worker#worker-url" target="_blank" >worker.url()</a> | -                                |

{{< code >}}

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
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php');
    console.log(page.workers());
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
