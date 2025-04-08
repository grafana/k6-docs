---
title: Asynchronous operations
description: 'Learn how the k6 browser module uses asynchronous operations.'
weight: 100
---

# Asynchronous operations

Since many browser operations happen asynchronously, and to follow the Playwright API more closely, we are working on migrating most of the browser module methods to be asynchronous as well.

At the moment, methods such as `page.goto()`, `page.waitForNavigation()` and `Element.click()` return [JavaScript promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), and scripts must be written to handle this properly.

To avoid timing errors or other race conditions in your script, if you have actions that load up a different page, you need to make sure that you wait for that action to finish before continuing.

{{< code >}}

```javascript
import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    await check(page.locator('h2'), {
      header: async (lo) => (await lo.textContent()) == 'Welcome, admin!',
    });
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

The preceding code uses `Promise.all([])` to wait for the two promises to be resolved before continuing. Since clicking the submit button causes page navigation, `page.waitForNavigation()` is needed because the page won't be ready until the navigation completes. This is required because there can be a race condition if these two actions don't happen simultaneously.

Then, you can use [`check`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check) from the k6 API to assert the text content of a specific element. Finally, you close the page and the browser.
