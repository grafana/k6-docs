---
title: 'count()'
description: 'Browser module: locator.count method'
---

# count()

Returns the number of elements matching the selector. This does not wait for actionability checks (whether the matching elements are `visible`, `stable`, and `enabled`). If the return value from `count` doesn't match the expected count, then you should manually retry the API call.

### Returns

| Type              | Description                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| `Promise<number>` | A promise which resolves with the number of elements matching the selector. |

### Example

{{< code >}}

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/0.4.0/index.js';
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
  await page.goto('https://quickpizza.grafana.com/login');

  const expected = 3;
  let match = false;
  for (let i = 0; i < 5; i++) {
    match = await page.locator('input').count();
    if (match == expected) {
      break;
    }
  }

  expect(match).toEqual(expected);

  await page.close();
}
```

{{< /code >}}
