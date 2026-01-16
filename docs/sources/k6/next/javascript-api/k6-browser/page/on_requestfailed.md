---
title: 'page.on("requestfailed")'
description: 'Browser module: page.on("requestfailed") event handler'
---

# page.on("requestfailed")

Subscribe to the `requestfailed` event, which fires when a network request fails to reach the server.

This event is triggered when requests encounter network-level failures such as DNS errors, connection refused, timeouts, or other network problems. It does **not** fire for HTTP 4xx/5xx responses, which are considered successful network requests.

| Parameter | Type     | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| event     | string   | The event name: `"requestfailed"`                |
| handler   | function | A callback function that receives a Request object |

### Handler Parameters

| Parameter | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| request   | Request   | The failed Request object       |

### Request Object Properties

The handler receives a [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request/) object with the following useful properties:

| Property            | Type     | Description                                             |
| ------------------- | -------- | ------------------------------------------------------- |
| request.url()       | string   | The URL of the request                                  |
| request.method()    | string   | The HTTP method (GET, POST, PUT, DELETE, etc.)          |
| request.resourceType() | string | The type of resource (document, stylesheet, image, etc.)|
| request.failure()   | object   | Information about the failure (see below)               |

### Request Failure Information

The `request.failure()` method returns an object with the following property:

| Property            | Type     | Description                                             |
| ------------------- | -------- | ------------------------------------------------------- |
| failure.errorText   | string   | Text describing the error that caused the request to fail |

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

  // Track all failed requests
  const failedRequests = [];

  page.on('requestfailed', (request) => {
    const failure = request.failure();
    failedRequests.push({
      url: request.url(),
      method: request.method(),
      error: failure ? failure.errorText : 'unknown error',
    });

    console.log(`✗ Request failed: ${request.method()} ${request.url()}`);
    if (failure) {
      console.log(`  Error: ${failure.errorText}`);
    }
  });

  try {
    // This will trigger a requestfailed event due to DNS failure
    await page.goto('https://does-not-exist.invalid/');
  } catch (e) {
    // Navigation error expected
  }

  console.log(`Total failed requests: ${failedRequests.length}`);

  await page.close();
}
```

#### Monitoring for specific failure types

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

  // Track connection timeout failures specifically
  const timeoutFailures = [];

  page.on('requestfailed', (request) => {
    const failure = request.failure();
    if (failure && failure.errorText.toLowerCase().includes('timeout')) {
      timeoutFailures.push({
        url: request.url(),
        error: failure.errorText,
        timestamp: new Date().toISOString(),
      });
      
      console.log(`Timeout: ${failure.errorText} for ${request.url()}`);
    }
  });

  // Perform actions that might cause timeouts
  await page.goto('https://test.k6.io/');

  console.log(`Timeout failures: ${timeoutFailures.length}`);

  await page.close();
}
```

### Best practices

1. **Setup before navigation**: Always set up the event listener before performing actions that trigger network requests:

   ```javascript
   // Correct
   page.on('requestfailed', handler);
   await page.goto('https://example.com');
   
   // Incorrect - may miss early failures
   await page.goto('https://example.com');
   page.on('requestfailed', handler);
   ```

2. **Distinguish from other events**: 
   - Use `page.on('request')` to track when requests are initiated
   - Use `page.on('response')` to track when responses start arriving
   - Use `page.on('requestfinished')` to track when requests successfully complete
   - Use `page.on('requestfailed')` to track when requests fail at the network level

3. **Error categorization**: The `failure.errorText` can help categorize different types of network failures.

4. **Monitoring**: This event is valuable for identifying network infrastructure issues during browser automation tests.

### Related

- [page.on("request")](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/on) - Subscribe to request initiation events
- [page.on("response")](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/on) - Subscribe to response start events
- [page.on("requestfinished")](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/on) - Subscribe to request completion events
- [page.waitForEvent()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforevent/) - Wait for page events with predicate functions
- [page.waitForRequest()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforrequest/) - Wait for HTTP requests with URL pattern matching
- [page.waitForResponse()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforresponse/) - Wait for HTTP responses with URL pattern matching
- [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request/) - Request object methods and properties