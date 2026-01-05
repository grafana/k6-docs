---
title: 'continue([options])'
description: 'Browser module: Route.continue method'
---

# continue([options])

{{< admonition type="caution" >}}

This method has **known issues**, but it does work as intended. For details, refer to [#5012](https://github.com/grafana/k6/issues/5012).

{{< /admonition >}}

Sends the request to the network with optional overrides.

| Parameter        | Type             | Default | Description                        |
| ---------------- | ---------------- | ------- | ---------------------------------- |
| options          | object           | null    |                                    |
| options.headers  | object           | null    | Request headers.                   |
| options.method   | string           | `''`    | Request method (e.g. GET or POST). |
| options.postData | string or Buffer | `''`    | Post data of the request.          |
| options.url      | string           | `''`    | Request URL.                       |

## Returns

| Type            | Description                                          |
| --------------- | ---------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the request is resumed. |

## Example

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
