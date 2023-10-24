---
title: 'emulateVisionDeficiency(type)'
excerpt: 'Browser module: page.emulateVisionDeficiency(type) method'
canonicalUrl: https://grafana.com/docs/k6
---

This emulates your website with the specified vision deficiency type.

The supported types are:
  - none: default.
  - blurredVision: where vision is less precise.
  - protanopia: the inability to perceive any red light.
  - deuteranopia: the inability to perceive any green light.
  - tritanopia: the inability to perceive any blue light.
  - achromatopsia: the inability to perceive any color except for shades of grey (extremely rare).

### Example

<CodeGroup labels={[]}>

```javascript
import { browser } from 'k6/experimental/browser';

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
}

export default async function () {
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io/browser.php');
  page.emulateVisionDeficiency('blurredVision');
}
```

</CodeGroup>


