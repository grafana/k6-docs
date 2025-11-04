---
title: 'Handle stale or dynamic elements after navigation'
description: 'Wait for elements to appear in k6 browser tests to avoid interacting with stale or dynamic content'
weight: 50
---

# Handle stale or dynamic elements after navigation

Modern websites often update the DOM asynchronously after navigation or user interactions. Waiting for navigation to complete isn't sufficient, as test scripts may still fail or attempt to interact with elements that aren't yet available.

To avoid these issues, wait for specific elements to appear before you continue your test. Use [locator APIs](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) such as `waitFor` to ensure elements are ready for interaction.

This approach is especially important when you test single-page applications (SPAs) or any pages with dynamic content, where elements may be added, removed, or updated asynchronously.

## Example

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
