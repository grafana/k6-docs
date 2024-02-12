---
title: 'locator(selector)'
description: 'Browser module: page.locator(selector) method'
---

# locator(selector)

The method returns an element [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/). Locators resolve to the element when the action takes place, which means locators can span over navigations where the underlying dom changes.

| Parameter | Type   | Default | Description                                   |
| --------- | ------ | ------- | --------------------------------------------- |
| selector  | string | `''`    | A selector to use when resolving DOM element. |

### Returns

| Type                                                                                                | Description                                     |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/browser/locator/) | The element `Locator` associated with the page. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

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
  const page = browser.newPage();

  await page.goto('https://test.k6.io/browser.php');
  const textbox = page.locator('#text1');
  textbox.focus();
}
```

{{< /code >}}
