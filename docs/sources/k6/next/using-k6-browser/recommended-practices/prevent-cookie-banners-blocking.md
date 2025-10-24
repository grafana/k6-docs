---
title: "How to prevent cookie banners from blocking interactions"
description: "How to reveal and dismiss cookie banners in k6 Browser tests to prevent blocked interactions and improve test reliability."
weight: 100
---

# How to prevent cookie banners from blocking interactions

Cookie banners often appear shortly after a page loads or remain hidden until you interact with the page. In k6 browser tests, reveal and dismiss these banners before performing other actions. Leaving a banner open can block page elements and cause interaction failures. For example, a button might not be clickable because the banner overlaps it. If you find yourself using _force click_ frequently, the element is likely hidden or overlapped by a cookie banner.

To avoid these failures, trigger and dismiss the cookie banner early in the test flow.

- Trigger the banner: simulate a small user action (click, scroll, or similar) immediately after navigation to reveal banners that appear only after interaction.
- Dismiss the banner: once the banner is visible, close or accept it before continuing with the rest of the test.

## Example

The example below navigates to a page and takes a screenshot. Replace the placeholder steps with a click or scroll that reveals and dismisses your site's cookie banner.

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
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {
    await page.goto('https://test.k6.io/');
    await page.screenshot({ path: 'screenshots/screenshot.png' });
  } finally {
    await page.close();
  }
}
```
