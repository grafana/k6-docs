---
title: 'locator(selector[, options])'
description: 'Browser module: page.locator(selector[, options]) method'
---

# locator(selector[, options])

The method returns an element [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/). Locators resolve to the element when the action takes place, which means locators can span over navigations where the underlying dom changes.

<TableWithNestedRows>

| Parameter           | Type             | Default | Description                                                                                                                                                                                                                           |
| ------------------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector            | string           | `''`    | A selector to use when resolving DOM element.                                                                                                                                                                                        |
| options             | object           | `null`  |                                                                                                                                                                                                                                       |
| options.hasText     | string or RegExp | `null`  | Matches only elements that contain the specified text. String or regular expression. Optional.                                                                                                                                       |
| options.hasNotText  | string or RegExp | `null`  | Matches only elements that do not contain the specified text. String or regular expression. Optional.                                                                                                                                |

</TableWithNestedRows>

### Returns

| Type                                                                                                | Description                                     |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | The element `Locator` associated with the page. |

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

  await page.goto('https://quickpizza.grafana.com');
  
  // Create a locator with text filtering options
  const submitButton = page.locator('button', { hasText: 'Pizza, Please!' });
  await submitButton.click();
}
```

{{< /code >}}
