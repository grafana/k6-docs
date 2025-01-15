---
title: 'setDefaultNavigationTimeout(timeout)'
description: 'Sets the default navigation timeout in milliseconds.'
---

# setDefaultNavigationTimeout(timeout)

Sets the default maximum navigation timeout for [Page.goto()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/goto).

| Parameter | Type   | Default                  | Description                  |
| --------- | ------ | ------------------------ | ---------------------------- |
| timeout   | number | Dependent on the action. | The timeout in milliseconds. |

### Example

{{< code >}}

<!-- md-k6:nofail -->

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
  const page = await context.newPage();
  context.setDefaultNavigationTimeout(1000); // 1s

  try {
    await page.goto('https://quickpizza.grafana.com/api/delay/5');
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
