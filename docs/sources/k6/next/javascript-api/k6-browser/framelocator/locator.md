---
title: 'locator(selector[, options])'
description: 'Browser module: frameLocator.locator(selector[, options]) method'
---

# locator(selector[, options])

The method returns an element's [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/). Locators resolve to the element when the action takes place, which means locators can span over navigations where the underlying DOM changes.

<TableWithNestedRows>

| Parameter           | Type             | Default | Description                                                                                                                                                                                                                           |
| ------------------- | ---------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| selector            | string           | `''`    | A selector to use when resolving a DOM element.                                                                                                                                                                                        |
| options             | object           | `null`  |                                                                                                                                                                                                                                       |
| options.hasText     | string or RegExp | `null`  | Matches only elements that contain the specified text. String or regular expression. Optional.                                                                                                                                       |
| options.hasNotText  | string or RegExp | `null`  | Matches only elements that do not contain the specified text. String or regular expression. Optional.                                                                                                                                |

</TableWithNestedRows>

### Returns

| Type                                                                                   | Description                                      |
| -------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | The element's `Locator` associated with the frame. |

### Example

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
};

export default async function () {
  const page = await browser.newPage();

  await page.setContent(`<iframe src='https://quickpizza.grafana.com'></iframe>`);

  // Get a locator for an iframe element
  const frameLocator = page.locator('iframe').contentFrame();

  // Create a locator within the frame with text filtering options
  const submitButton = frameLocator.locator('button', { hasText: 'Pizza, Please!' });
  await submitButton.click();
}
```

{{< /code >}}