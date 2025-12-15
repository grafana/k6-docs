---
title: 'waitForEvent(event[, optionsOrPredicate])'
description: 'Browser module: page.waitForEvent(event[, optionsOrPredicate]) method'
---

# waitForEvent(event[, optionsOrPredicate])

Waits for the specified event to be emitted. This is a generic method that can wait for any page event such as `console`, `request`, or `response`.

| Parameter          | Type                      | Default | Description                                                                                                                                                                                                                                                                                                         |
| ------------------ | ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event              | string                    | -       | Required. Event name. Supported events: `console`, `request`, `response`.                                                                                                                                                                                                                                           |
| optionsOrPredicate | function \| object        | `null`  | Either a predicate function or an options object. If a function, it will be used as the predicate.                                                                                                                                                                                                                  |
| options.predicate  | function                  | `null`  | A function that returns `true` when the expected event is received. The event object is passed as argument.                                                                                                                                                                                                         |
| options.timeout    | number                    | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

### Returns

| Type          | Description                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Promise<any>  | A Promise that fulfills with the event data when the event is emitted. The return type depends on the event: [ConsoleMessage](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/consolemessage/) for `console`, [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request/) for `request`, [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/) for `response`. |

### Examples

#### Wait for console message

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

  try {
    // Set up the wait before triggering the action
    const consolePromise = page.waitForEvent('console');

    // Trigger action that causes a console message
    await page.evaluate(() => console.log('hello from page'));

    const msg = await consolePromise;
    console.log(`Console message: ${msg.text()}`);
  } finally {
    await page.close();
  }
}
```

#### Wait for response with predicate

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

    // Wait for a specific response using a predicate function
    const responsePromise = page.waitForEvent('response', (res) =>
      res.url().includes('/api/pizza')
    );

    await page.getByRole('button', { name: /pizza/i }).click();

    const response = await responsePromise;

    check(response, {
      'response status is 200': (r) => r.status() === 200,
    });
  } finally {
    await page.close();
  }
}
```

### Best practices

1. **Set up promise before trigger**: Always set up the `waitForEvent` promise before triggering the action that causes the event:

  <!-- md-k6:skip -->

   ```javascript
   // Correct
   const eventPromise = page.waitForEvent('console');
   await page.evaluate(() => console.log('test'));
   const msg = await eventPromise;

   // Incorrect - may miss the event
   await page.evaluate(() => console.log('test'));
   const msg = await page.waitForEvent('console');
   ```

1. **Use specific methods when available**: For common use cases, prefer the more specific methods like `waitForRequest` or `waitForResponse` which provide URL pattern matching.

### Related

- [page.on()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/on/) - Subscribe to page events
- [page.waitForRequest()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforrequest/) - Wait for HTTP requests with URL pattern matching
- [page.waitForResponse()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforresponse/) - Wait for HTTP responses with URL pattern matching
