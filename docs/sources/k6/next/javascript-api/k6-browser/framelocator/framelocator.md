---
title: 'frameLocator(selector)'
description: 'Browser module: frameLocator.frameLocator(selector) method'
---

# frameLocator(selector)

Returns a [FrameLocator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/) for a nested iframe that matches the given `selector` within this frame. Use this to chain frame locators for nested iframes.

| Parameter | Type   | Description                                                                 |
| --------- | ------ | --------------------------------------------------------------------------- |
| selector  | string | A selector that resolves to an iframe element (for example `iframe#inner` or `iframe[name="nested"]`). |

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
    await page.setContent(`
      <iframe id="outer" srcdoc="<iframe id='inner' srcdoc='<button>Submit</button>'></iframe>"></iframe>
    `);

    // Nested iframes: outer frame, then inner frame, then element
    const button = page.frameLocator('#outer').frameLocator('#inner').locator('button');
    await button.click();
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
