---
title: 'waitForTimeout(timeout)'
excerpt: 'Browser module: waitForTimeout(timeout) method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-browser/page/waitfortimeout/
---

<Blockquote mod="note" title="">

Never wait for timeout in production, use this only for debugging. Tests that wait for time are inherently flaky. Use [`Locator`](/javascript-api/k6-experimental/browser/locator/) actions and web assertions that wait automatically.

</Blockquote>

Waits for the given `timeout` in milliseconds.

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                           |
|-----------------|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| timeout        | number  |     |  Timeout in milliseconds.                              |

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

export default async function () {
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.waitForTimeout(5000);
}
```

</CodeGroup>