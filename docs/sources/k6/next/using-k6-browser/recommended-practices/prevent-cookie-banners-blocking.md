---
title: "Prevent cookie banners from blocking interactions"
description: "How to reveal and dismiss cookie banners in k6 browser tests to prevent blocked interactions and improve test reliability."
weight: 100
---

# Prevent cookie banners from blocking interactions

Cookie banners often appear shortly after a page loads or remain hidden until you interact with the page. Leaving a banner open can block page elements and cause interaction failures. For example, a button might not be clickable because the banner overlaps it. If you find yourself using _force click_ frequently, the element is likely hidden or overlapped by a cookie banner.

To avoid these failures, trigger and dismiss the cookie banner early in the test flow.

- **Trigger the banner**: simulate a small user action, such as clicking or scrolling, immediately after navigation to reveal banners that appear only after interaction.
- **Dismiss the banner**: once the banner is visible, close or accept it before continuing with the rest of the test.

## Example

The example below navigates to a page and clicks a button. Replace the placeholder steps with a click to an element on your website, or scrolling a page, that reveals and dismisses your site's cookie banner.

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

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
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://quickpizza.grafana.com/');

    // Click an element or scroll the page
    const button = page.locator('button[name="pizza-please"]')
    await expect(button).toBeEnabled();
    await button.click();
  } finally {
    await page.close();
  }
}
```
