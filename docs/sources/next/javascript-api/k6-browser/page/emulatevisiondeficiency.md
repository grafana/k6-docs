---
title: 'emulateVisionDeficiency(type)'
description: 'Browser module: page.emulateVisionDeficiency(type) method'
---

# emulateVisionDeficiency(type)

This emulates your website with the specified vision deficiency type.

The supported types are:

- none: default.
- blurredVision: where vision is less precise.
- protanopia: the inability to perceive any red light.
- deuteranopia: the inability to perceive any green light.
- tritanopia: the inability to perceive any blue light.
- achromatopsia: the inability to perceive any color except for shades of grey (extremely rare).

### Returns

| Type            | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the vision deficiency is emulated. |

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

  await page.goto('https://test.k6.io/browser.php');
  await page.emulateVisionDeficiency('blurredVision');
}
```

{{< /code >}}
