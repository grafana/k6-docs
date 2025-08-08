---
title: 'route(url, handler)'
description: 'Browser module: page.route(url, handler) method'
---

# route(url, handler)

The method adds a route that allows modifying network requests matching the provided url. The handler is a function taking a [Route](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/) input that provides functions to [continue](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/continue), [fulfill](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/fulfill) or [abort](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/abort) the request. Once routing is enabled, every request matching the url pattern will stall unless one of these functions is called.

When several routes match the given pattern, they run in the order opposite to their registration. That way the last registered route can always override all the previous ones.

| Parameter | Type                                                                                         | Default | Description                                         |
| --------- | -------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------- |
| url       | string or Regexp                                                                             | `''`    | URL to match during routing.                        |
| handler   | function([Route](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/route/)) | null    | Handler function executed when routing the request. |

### Returns

| Type            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `Promise<void>` | A Promise that fulfills when the route is added to the page. |

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
