---
title: 'Worker'
description: 'Browser module: Worker Class'
weight: 14
---

# Worker

{{< docs/shared source="k6" lookup="browser-module-wip.md" version="<K6_VERSION>" >}}

Represents a Web Worker or a Service Worker within the browser context.

## Supported APIs

| k6 Class                                                                                                   | Description                        |
| ---------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [worker.url()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/worker/url) | Returns the URL of the web worker. |

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
