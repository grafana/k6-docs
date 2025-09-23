---
title: 'contentFrame()'
description: 'Browser module: locator.contentFrame method'
---

# contentFrame()

This method returns a [FrameLocator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/) object pointing to the same `iframe` as this locator.

Useful when you have a [Locator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/locator/) object obtained somewhere, and later on would like to interact with the content inside the frame.

### Returns

| Type                                                                                   | Description                                              |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [FrameLocator](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/framelocator/) | The `FrameLocator` pointing to the same`iframe` as this locator. |

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

    const frameLocator = page.locator('#my_frame').contentFrame();
    await frameLocator.getByText('Pizza, Please!').click();

    const noThanksBtn = frameLocator.getByText('No thanks');
    await noThanksBtn.click();
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
