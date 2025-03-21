---
title: 'workers()'
description: 'Browser module: page.workers method'
---

# workers()

This method returns an array of the dedicated [WebWorkers](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/worker/) associated with the page.

### Returns

| Type                                                                                                    | Description                                     |
| ------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [WebWorkers](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/worker/)[] | Array of `WebWorkers` associated with the page. |

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
  console.log(page.workers());
}
```

{{< /code >}}
