---
title: 'waitForResponse(urlPattern[, options])'
description: 'Browser module: page.waitForResponse(urlPattern[, options]) method'
---

# waitForResponse(urlPattern[, options])

Waits for an HTTP response that matches the specified URL pattern. This method is particularly useful for waiting for responses from AJAX/fetch requests, API calls, or specific resources to be loaded before proceeding with the test.

| Parameter        | Type           | Default | Description                                                                                                                                                                                                                                                                                                         |
| ---------------- | -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| urlPattern       | string \| RegExp | -       | Required. URL or URL pattern to match against responses. Can be an exact URL string, a regular expression, or an empty string to match any response.                                                                                                                                                                |
| options          | object         | `null`  |                                                                                                                                                                                                                                                                                                                     |
| options.timeout  | number         | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

### Returns

| Type                                                                                                       | Description                                                                                        |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Promise<[Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/)> | A Promise that fulfills with the [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/) object when a URL matches and the response is received. |

### Examples

#### Wait for API response

```javascript
import { browser } from 'k6/browser';
import { check } from 'k6';

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
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://quickpizza.grafana.com/');

    // Test waitForResponse with user interaction
    const pizzaResponsePromise = page.waitForResponse('https://quickpizza.grafana.com/api/pizza');

    await page.getByRole('button', { name: /pizza/i }).click();

    const pizzaResponse = await pizzaResponsePromise;

    // Check that the pizza API call was successful
    check(pizzaResponse, {
      'pizza API status is 200': (r) => r.status() === 200,
      'pizza API URL is correct': (r) => r.url() === 'https://quickpizza.grafana.com/api/pizza',
    });
  } finally {
    await page.close();
  }
}
```

### Best practices

1. **Use appropriate patterns**: Choose the right matching method based on your needs:
   - Exact strings for known, static API endpoints
   - RegExp for pattern-based matching and dynamic URLs

1. **Set up promise before trigger**: Always set up the `waitForResponse` promise before triggering the action that causes the request:

   ```javascript
   // Correct
   const responsePromise = page.waitForResponse('/api/data');
   await page.click('#submit');
   const response = await responsePromise;

   // Incorrect - may miss the response
   await page.click('#submit');
   const response = await page.waitForResponse('/api/data');
   ```

1. **Verify response content**: After waiting for the response, verify that the response status and content match your expectations.

### Related

- [page.waitForNavigation()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitfornavigation/) - Wait for navigation events
- [page.waitForURL()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforurl/) - Wait for URL changes
- [page.waitForLoadState()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforloadstate/) - Wait for load states
- [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/) - Response object methods and properties
