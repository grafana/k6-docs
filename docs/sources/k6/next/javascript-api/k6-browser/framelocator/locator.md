---
title: 'locator(selector)'
description: 'Browser module: frameLocator.locator(selector) method'
---

# locator(selector)

The method returns an element [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/). Locators resolve to the element when the action takes place, which means locators can span over navigations where the underlying dom changes.

| Parameter | Type   | Default | Description                                   |
| --------- | ------ | ------- | --------------------------------------------- |
| selector  | string | `''`    | A selector to use when resolving DOM element. |

### Returns

| Type                                                                                                | Description                                     |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) | The element `Locator` associated with the frame. |

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

  await page.setContent(`
    <iframe id="my_frame" src="https://test.k6.io/browser.php" width="50%" height="50%"></iframe>
  `);

  const textbox = page.locator('#my_frame').contentFrame().locator('#text1');
  await textbox.focus();
}
```

{{< /code >}}
