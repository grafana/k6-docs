---
title: 'frameLocator(selector)'
description: 'Browser module: locator.frameLocator(selector) method'
---

# frameLocator(selector)

Shorthand for `locator(selector).contentFrame()`. Returns a [FrameLocator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/) for the iframe that matches the given `selector`. Use this to interact with elements inside iframes without calling `locator()` and `contentFrame()` separately.

| Parameter | Type   | Description                                                                 |
| --------- | ------ | --------------------------------------------------------------------------- |
| selector  | string | A selector that resolves to an iframe element (for example `iframe#payment` or `iframe[name="form"]`). |

### Returns

| Type                                                                                                | Description                                        |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [FrameLocator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/) | A `FrameLocator` for the matched iframe. |

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

  try {
    await page.setContent(`
      <div class="widget"><iframe id="my_frame" src="https://quickpizza.grafana.com"></iframe></div>
    `);

    // Shorthand: instead of page.locator('.widget').locator('#my_frame').contentFrame()
    const frame = page.locator('.widget').frameLocator('#my_frame');
    await frame.getByText('Pizza, Please!').click();
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
