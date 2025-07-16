---
title: Asynchronous operations
description: 'Learn how the k6 browser module uses asynchronous operations.'
weight: 100
---

# Asynchronous operations

Most methods in the browser module return JavaScript promises, and k6 scripts must be written to handle this properly. This usually means using the `await` keyword to wait for the async operation to complete.

There are two recommended methods to handle async operations in browser scripts: using `Promise.all`, or using the `waitFor` method.

## Promise.all

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

## Wait for specific elements

We also encourage the use of `locator.waitFor` where possible. When you navigate to a website, there are usually one or more elements that are important for your test. Once those elements load, you can safely proceed to the next step. For example, in a search scenario:

1. Navigate to the search site
1. Wait for the search bar and submit button to appear
1. Fill in the search bar with the query
1. Click the submit button
1. Wait for the search results

We should be able to do these actions like so:

<!-- eslint-skip -->

```js
await page.goto('https://my-search-engine.com');

const searchBar = page.locator('.search-bar');
const submitButton = page.locator('.submit-button');

await searchBar.waitFor();
await submitButton.waitFor();

await searchBar.fill('k6');
await submitButton.click();

const searchResults = page.locator('.search-results-table');

await searchResults.waitFor();
```

This avoids the use of `Promise.all` which can be confusing to work with, and instead makes the script easier to follow.

## Why the browser module uses asynchronous APIs

The browser module uses asynchronous APIs that require `await` for several reasons:

1. JavaScript is single-threaded with a single event loop. Asynchronous APIs prevent blocking the thread and event loop with long-running or I/O-based tasks.
1. Consistency with [Playwright](https://playwright.dev/), a popular browser automation library.
1. Alignment with how developers expect to work with modern JavaScript APIs.

For example:

<!-- eslint-skip -->

```js
const page = await browser.newPage();

await page.goto('https://quickpizza.grafana.com/');

const locator = page.locator('button[name="pizza-please"]');

await locator.click();
```

API calls that interact with Chromium are asynchronous and require `await` to ensure completion before proceeding. Synchronous APIs, such as `page.locator`, do not require `await`, but using it does not cause issues since the JavaScript runtime will simply return the value immediately.

If you don't add `await` on asynchronous APIs, it can cause the script to finish before the test completes, resulting in errors like `"Uncaught (in promise) TypeError: Object has no member 'goto'"`. That can happen because the page object from `browser.newPage()` without an `await` is actually a JavaScript promise. You can try and see the error using the following code snippet:

<!-- eslint-skip -->

```js
const page = browser.newPage();

page.goto('https://quickpizza.grafana.com/'); // An error should occur since we're not using await in the line above.

const locator = page.locator('button[name="pizza-please"]');

locator.click();
```
