---
title: 'isInViewport([options])'
description: 'Browser module: locator.isInViewport method'
---

# isInViewport([options])

Checks whether the element intersects the browser viewport. This matches Playwright's `toBeInViewport` semantics.

| Parameter       | Type   | Default | Description                                                                                                                                                                                                                                                                                                         |
| --------------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options         | object | `null`  |                                                                                                                                                                                                                                                                                                                     |
| options.ratio   | number | `0`     | The minimum ratio of the element that must be within the viewport for it to count as in viewport, from `0` to `1`. The default of `0` means any visible pixel counts.                                                                                                                                               |
| options.timeout | number | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |

### Returns

| Type            | Description                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| `Promise<bool>` | A Promise that fulfills with `true` if the element is in the viewport, else `false`. |

### Example

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
  const button = page.locator('button#submit');
  if (await button.isInViewport()) {
    await button.click();
  }
}
```
