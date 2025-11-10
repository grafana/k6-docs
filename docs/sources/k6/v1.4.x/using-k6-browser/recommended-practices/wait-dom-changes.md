---
title: 'Handling Stale or Dynamic Elements After Navigation'
description: 'Wait for elements to appear in k6 browser tests to avoid interacting with stale or dynamic content'
weight: 01
---

# How To Handle Stale or Dynamic Elements After Navigation
Modern websites often update the DOM asynchronously after navigation or user interactions. Waiting for navigation to complete is not sufficient, as test scripts may still fail or attempt to interact with elements that are not yet available. Instead, wait for specific elements to appear before continuing your test. Use [locator APIs](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) such as `waitFor` to ensure elements are ready for interaction. This is especially important when testing SPAs or any pages with dynamic content, where elements may be added, removed, or updated asynchronously.

## Example
{{< code >}}

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
  const page = await browser.newPage();

  await page.goto('https://test.k6.io/browser.php');
  const text = page.locator('#input-text-hidden');
  await text.waitFor({
    state: 'hidden',
  });
}
```

{{< /code >}}
