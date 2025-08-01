---
title: 'Route'
description: 'Browser module: Route Class'
weight: 12
---

# Route

Route represents a network request intercepted by the [`page.route()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/route) function and allows to modify its behavior. Once routing is enabled, every request intercepted by a route will stall unless it's continued, fulfilled or aborted.

When several routes match the given pattern, they run in the order opposite to their registration. That way the last registered route can always override all the previous ones.

## Supported APIs

| Method                                                                                                                             | Description                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [abort([errorCode])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/abort) | Aborts the route's request.                                                         |
| [continue([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/continue) | Continues the request with optional overrides.                                                       |
| [fulfill([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/fulfill) | Fulfills the request with the given response |
| [request()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/request) | Returns the matching [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request) object.                       |

### Example

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

  // Abort all images requests
  await page.route(/(\.png$)|(\.jpg$)/, async function (route) {
    await route.abort();
  })

  await page.goto('https://quickpizza.grafana.com/');
```

{{< /code >}}
