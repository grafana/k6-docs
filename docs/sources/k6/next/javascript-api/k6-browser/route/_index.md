---
title: 'Route'
description: 'Browser module: Route Class'
weight: 12
---

# Route

Route represents a network request intercepted by the [`page.route()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/route) function and allows to modify its behavior. Once routing is enabled, every request intercepted by a route will stall unless it's continued, fulfilled or aborted.

When several routes match the given pattern, they run in the order opposite to their registration. That way the last registered route can always override all the previous ones.

## Supported APIs

| Method                                                                                                   | Description                                                                                                        |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [abort([errorCode])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/abort)     | Aborts the route's request.                                                                                        |
| [continue([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/continue) | Continues the request with optional overrides.                                                                     |
| [fulfill([options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/fulfill)   | Fulfills the request with the given response                                                                       |
| [request()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/request)            | Returns the matching [Request](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/request) object. |

### Example

{{< code >}}

<!-- md-k6:skip -->

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
  });

  // Fulfill request with the following response which
  // changes the quotes displayed on the page
  await page.route(/.*\/quotes$/, async function (route) {
    await route.fulfill({
      body: JSON.stringify({
        quotes: ['"We ❤️ pizza" - k6 team'],
      }),
    });
  });

  // Change the pizza request when the button is clicked
  await page.route(/.*\/pizza$/, async function (route) {
    await route.continue({
      headers: {
        ...route.request().headers(),
        foo: 'bar',
      },
      method: 'POST',
      postData: JSON.stringify({
        maxCaloriesPerSlice: 500,
        mustBeVegetarian: true,
        excludedIngredients: ['Pineapple'],
        excludedTools: ['Knife', 'Scissors'],
        maxNumberOfToppings: 1,
        minNumberOfToppings: 1,
        customName: 'Classic Pizza',
      }),
    });
  });

  await page.goto('https://quickpizza.grafana.com/');

  await page.getByRole('button', { name: 'Pizza, Please!' }).click();

  await page.close();
}
```

{{< /code >}}
