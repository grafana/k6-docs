---
title: 'setOffline(offline)'
excerpt: "Toggles the BrowserContext's connectivity on/off."
---

Toggles the `BrowserContext`'s connectivity on/off.

| Parameter | Type    | Default | Description                                                                                 |
|-----------|---------|---------|---------------------------------------------------------------------------------------------|
| offline   | boolean | `false` | Whether to emulate the `BrowserContext` being disconnected (`true`) or connected (`false`). |


### Example

<CodeGroup labels={[]}>

```javascript
import { chromium } from 'k6/experimental/browser';

export default async function () {
  const browser = chromium.launch();
  const context = browser.newContext();

  context.setOffline(true);

  const page = context.newPage();

  try {
    await page.goto('https://test.k6.io/browser.php', {
      // Will not be able to load the page
      waitUntil: 'networkidle',
    });
  } finally {
    page.close();
    browser.close();
  }
}
```

</CodeGroup>
