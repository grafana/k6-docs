---
title: 'page.on("requestfinished")'
description: 'Browser module: page.on("requestfinished") event handler'
---

# page.on("requestfinished")

Subscribe to the `requestfinished` event, which fires when a network request successfully completes (receives a response).

This event is triggered after the response is fully received, making it useful for tracking completed network activity, measuring request durations, or collecting statistics about successful requests.

| Parameter | Type     | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| event     | string   | The event name: `"requestfinished"`              |
| handler   | function | A callback function that receives a Request object |

### Handler Parameters

| Parameter | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| request   | Request   | The completed Request object    |

### Request Object Properties

The handler receives a [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request/) object with the following useful properties:

| Property            | Type     | Description                                             |
| ------------------- | -------- | ------------------------------------------------------- |
| request.url()       | string   | The URL of the request                                  |
| request.method()    | string   | The HTTP method (GET, POST, PUT, DELETE, etc.)          |
| request.resourceType() | string | The type of resource (document, stylesheet, image, etc.)|
| request.isNavigationRequest() | boolean | Whether this request is a navigation request      |

### Examples

#### Basic usage

```javascript
import { browser } from 'k6/browser';

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

  // Track all completed requests
  const finishedRequests = [];

  page.on('requestfinished', (request) => {
    finishedRequests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType(),
    });

    console.log(`✓ Request finished: ${request.method()} ${request.url()}`);
  });

  await page.goto('https://test.k6.io/');

  console.log(`Total requests completed: ${finishedRequests.length}`);

  await page.close();
}
```

#### Tracking API requests

```javascript
import { browser } from 'k6/browser';

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

  // Track API requests specifically
  const apiRequests = [];

  page.on('requestfinished', (request) => {
    if (request.url().includes('/api/')) {
      apiRequests.push({
        url: request.url(),
        method: request.method(),
        timestamp: new Date().toISOString(),
      });
    }
  });

  // Perform actions that trigger API calls
  await page.goto('https://quickpizza.grafana.com/');
  await page.click('button[name="order-pizza"]');

  console.log(`API requests completed: ${apiRequests.length}`);

  await page.close();
}
```

### Best practices

1. **Setup before navigation**: Always set up the event listener before performing actions that trigger network requests:

   ```javascript
   // Correct
   page.on('requestfinished', handler);
   await page.goto('https://example.com');
   
   // Incorrect - may miss early requests
   await page.goto('https://example.com');
   page.on('requestfinished', handler);
   ```

2. **Distinguish from other events**:
   - Use `page.on('request')` to track when requests are initiated
   - Use `page.on('response')` to track when responses start arriving
   - Use `page.on('requestfinished')` to track when requests completely finish

3. **Performance monitoring**: This event is ideal for measuring actual request completion times and tracking network performance.

### Related

- [page.on("request")](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/on) - Subscribe to request initiation events
- [page.on("response")](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/on) - Subscribe to response start events
- [page.waitForEvent()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforevent/) - Wait for page events with predicate functions
- [page.waitForRequest()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforrequest/) - Wait for HTTP requests with URL pattern matching
- [page.waitForResponse()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforresponse/) - Wait for HTTP responses with URL pattern matching
- [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request/) - Request object methods and properties