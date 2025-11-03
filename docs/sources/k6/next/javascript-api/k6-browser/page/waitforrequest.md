---
title: 'waitForRequest(urlPattern[, options])'
description: 'Browser module: page.waitForRequest(urlPattern[, options]) method'
---

# waitForRequest(urlPattern[, options])

Waits for an HTTP request that matches the specified URL pattern. This method is particularly useful for waiting for requests to be initiated before proceeding with the test, such as verifying that form submissions or API calls are triggered.

| Parameter        | Type           | Default | Description                                                                                                                                                                                                                                                                                                         |
| ---------------- | -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| urlPattern       | string \| RegExp | -       | Required. URL or URL pattern to match against requests. Can be an exact URL string, a regular expression, or an empty string to match any request.                                                                                                                                                                |
| options          | object         | `null`  |                                                                                                                                                                                                                                                                                                                     |
| options.timeout  | number         | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

### Returns

| Type                                                                                                       | Description                                                                                        |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Promise<[Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request/)> | A Promise that fulfills with the [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request/) object when a URL matches and the request is initiated. |

### Examples

#### Wait for API request

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

    // Test waitForRequest with user interaction
    const pizzaRequestPromise = page.waitForRequest('https://quickpizza.grafana.com/api/pizza');

    await page.getByRole('button', { name: /pizza/i }).click();

    const pizzaRequest = await pizzaRequestPromise;

    // Check that the pizza API request was initiated
    check(pizzaRequest, {
      'pizza API URL is correct': (r) => r.url() === 'https://quickpizza.grafana.com/api/pizza',
      'pizza API method is POST': (r) => r.method() === 'POST',
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

1. **Set up promise before trigger**: Always set up the `waitForRequest` promise before triggering the action that causes the request:

  <!-- md-k6:skip -->

   ```javascript
   // Correct
   const requestPromise = page.waitForRequest('/api/data');
   await page.click('#submit');
   const request = await requestPromise;

   // Incorrect - may miss the request
   await page.click('#submit');
   const request = await page.waitForRequest('/api/data');
   ```

1. **Verify request content**: After waiting for the request, verify that the request URL, method, and headers match your expectations.

### Related

- [page.waitForResponse()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforresponse/) - Wait for HTTP responses
- [page.waitForNavigation()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitfornavigation/) - Wait for navigation events
- [page.waitForURL()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforurl/) - Wait for URL changes
- [page.waitForLoadState()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforloadstate/) - Wait for load states
- [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request/) - Request object methods and properties
