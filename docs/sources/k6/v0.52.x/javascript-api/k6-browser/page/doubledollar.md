---
title: 'page.$$(selector)'
slug: 'page-doubledollar'
description: 'Browser module: page.$$(selector) method'
---

# page.$$(selector)

{{< admonition type="warning" >}}

When possible, use locator-based [`page.locator(selector)`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/locator/) instead.

However, working with `locator`s might not be possible when trying to select an element from a list or table if it's difficult to find a stable and unique way to identify the element.

{{< /admonition >}}

The method finds all elements matching the specified selector within the page. If no elements match the selector, the return value resolves to `[]`. This is particularly useful when you want to retrieve a list of elements, and iterate through them to find the one that you need for your test case.

### Returns

| Type                       | Description                                                                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<ElementHandle[]>` | A Promise that fulfills with the [ElementHandle](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/elementhandle/) array of the selector when matching elements are found. |

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

  await page.goto('https://test.k6.io/');

  // Retrieve all the td elements.
  const cells = await page.$$('td');
  for (let i = 0; i < cells.length; i++) {
    if ((await cells[i].innerText()) == '/pi.php?decimals=3') {
      // When the element is found, click on it and
      // wait for the navigation.
      await Promise.all([page.waitForNavigation(), cells[i].click()]);
      break;
    }
  }

  // Wait for an important element to load.
  await page.locator('//pre[text()="3.141"]').waitFor();
}
```

{{< /code >}}
