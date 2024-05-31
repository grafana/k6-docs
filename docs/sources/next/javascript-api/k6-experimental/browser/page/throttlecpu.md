---
title: 'throttleCPU(cpuProfile)'
description: 'Browser module: page.throttleCPU(cpuProfile) method'
---

# throttleCPU(cpuProfile)

Throttles the CPU in Chrome/Chromium to slow it down by the specified `rate` in `cpuProfile`.

| Parameter       | Type       | Default | Description                                                          |
| --------------- | ---------- | ------- | -------------------------------------------------------------------- |
| cpuProfile      | CPUProfile | `null`  | This is a mandatory parameter.                                       |
| cpuProfile.rate | number     | `1`     | rate as a slowdown factor (1 is no throttle, 2 is 2x slowdown, etc). |

### Returns

| Type            | Description                                                                    |
| --------------- | ------------------------------------------------------------------------------ |
| `Promise<void>` | A Promise that fulfills when the CPU has been throttled to the specified rate. |

### Example

{{< code >}}

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
};

export default async function () {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.throttleCPU({ rate: 4 });

    await page.goto('https://test.k6.io/', { waitUntil: 'networkidle' });
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
