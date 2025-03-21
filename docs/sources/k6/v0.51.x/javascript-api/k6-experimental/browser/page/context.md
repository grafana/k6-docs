---
title: 'context()'
description: 'Browser module: page.context method'
---

# context()

Gets the [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) that the page belongs to.

### Returns

| Type                                                                                                              | Description                                    |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/browsercontext/) | The `BrowserContext` that the page belongs to. |

### Example

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
  const page = browser.newPage();

  await page.goto('https://test.k6.io/browser.php');
  console.log(page.context()); // prints {"base_event_emitter":{}}
}
```

{{< /code >}}
