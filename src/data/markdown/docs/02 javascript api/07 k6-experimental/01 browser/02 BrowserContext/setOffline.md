---
title: 'setOffline(offline)'
excerpt: "Toggles the BrowserContext's connectivity on/off."
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/browser/browsercontext/setoffline/
---

Toggles the `BrowserContext`'s connectivity on/off.

| Parameter | Type    | Default | Description                                                                                 |
|-----------|---------|---------|---------------------------------------------------------------------------------------------|
| offline   | boolean | `false` | Whether to emulate the `BrowserContext` being disconnected (`true`) or connected (`false`). |


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
  const context = browser.newContext();

  context.setOffline(true);

  const page = context.newPage();

  try {
    // Will not be able to load the page
    await page.goto('https://test.k6.io/browser.php');
  } finally {
    page.close();
  }
}
```

</CodeGroup>
