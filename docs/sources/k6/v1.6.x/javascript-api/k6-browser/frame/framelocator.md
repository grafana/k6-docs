---
title: 'frameLocator(selector)'
description: 'Browser module: frame.frameLocator(selector) method'
---

# frameLocator(selector)

Returns a [FrameLocator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/) for the iframe that matches the given `selector` within this frame. Use this to interact with elements inside nested iframes.

| Parameter | Type   | Description                                                                 |
| --------- | ------ | --------------------------------------------------------------------------- |
| selector  | string | A selector that resolves to an iframe element (for example `iframe#payment` or `iframe[name="form"]`). |

### Returns

| Type                                                                                                | Description                                        |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [FrameLocator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/) | A `FrameLocator` for the matched nested iframe. |

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
    await page.goto('https://example.com/page-with-nested-iframes');

    // Get the outer frame, then locate a nested iframe inside it
    const mainFrame = page.mainFrame();
    const innerFrame = mainFrame.frameLocator('iframe#inner');
    await innerFrame.locator('button').click();
  } finally {
    await page.close();
  }
}
```

{{< /code >}}