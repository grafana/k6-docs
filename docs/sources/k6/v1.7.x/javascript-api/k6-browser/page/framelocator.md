---
title: 'frameLocator(selector)'
description: 'Browser module: page.frameLocator(selector) method'
---

# frameLocator(selector)

Returns a [FrameLocator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/) for the iframe that matches the given `selector`. Use this to interact with elements inside iframes without first resolving the iframe element or calling `locator.contentFrame()`.

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
      <iframe id="my_frame" src="https://quickpizza.grafana.com" width="50%" height="50%"></iframe>
    `);

    const frame = page.frameLocator('iframe#my_frame');
    await frame.getByText('Pizza, Please!').click();

    const noThanksBtn = frame.getByText('No thanks');
    await noThanksBtn.click();
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
