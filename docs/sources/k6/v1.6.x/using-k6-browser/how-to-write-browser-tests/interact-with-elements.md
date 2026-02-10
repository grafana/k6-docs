---
title: Interact with elements on your webpage
description: 'Learn how to interact with elements on a webpage using the k6 browser module.'
weight: 200
---

# Interact with elements on your webpage

You can use `page.locator()` and pass in the element's selector you want to find on the page. `page.locator()` will create and return a [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator) object, which you can later use to interact with the element.

To find out which selectors the browser module supports, check out [Selecting Elements](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/recommended-practices/selecting-elements).

{{< admonition type="note" >}}

You can also use `page.$()` instead of `page.locator()`. You can find the differences between `page.locator()` and `page.$` in the [Locator API documentation](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator).

{{< /admonition >}}

{{< code >}}

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
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    // Enter login credentials
    await page.locator('input[name="login"]').type('admin');
    await page.locator('input[name="password"]').type('123');

    await page.screenshot({ path: 'screenshots/screenshot.png' });
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

The preceding code creates and returns a Locator object with the selectors for both login and password passed as arguments.

Within the Locator API, various methods such as `type()` can be used to interact with the elements. The `type()` method types a text to an input field.
