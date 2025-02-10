---
title: 'Keyboard'
description: 'Browser module: Keyboard Class'
weight: 07
---

# Keyboard

{{< docs/shared source="k6" lookup="browser-module-wip.md" version="<K6_VERSION>" >}}

`Keyboard` provide a way to interact with a virtual keyboard.

| Method                                                                                                     | Description                                                                                      |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [down(key)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/keyboard/down)              | Dispatches a `keydown` event.                                                                    |
| [up(key)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/keyboard/up)                  | Dispatches a `keyup` event.                                                                      |
| [press(key[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/keyboard/press) | Dispatches a `keydown` event followed by an `keyup` event.                                       |
| [type(text[, options])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/keyboard/type)  | Dispatches a `keydown`, `keypress` or`input`, and `keyup` events for each character in the text. |
| [insertText(text)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/keyboard/inserttext) | Dispatches only an `input` event.                                                                |

### Example

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
};

export default async function () {
  const page = await browser.newPage();
  await page.goto('https://test.k6.io/my_messages.php', {
    waitUntil: 'networkidle',
  });

  const login = page.locator('input[name="login"]');
  await login.click();
  await page.keyboard.type('admin');

  const password = page.locator('input[name="password"]');
  await password.click();
  await page.keyboard.type('123');

  await Promise.all([
    page.keyboard.press('Enter'), // submit
    page.waitForNavigation(),
  ]);

  await page.close();
}
```
