---
title: 'throttleCPU(cpuProfile)'
excerpt: 'Browser module: page.throttleCPU(cpuProfile) method'
---

# throttleCPU(cpuProfile)

Throttles the CPU in Chrome/Chromium to slow it down by the specified `rate` in `cpuProfile`.

| Parameter       | Type       | Default | Description                                                          |
|-----------------|------------|---------|----------------------------------------------------------------------|
| cpuProfile      | CPUProfile | `null`  | This is a mandatory parameter.                                       |
| cpuProfile.rate | number     | `1`     | rate as a slowdown factor (1 is no throttle, 2 is 2x slowdown, etc). |

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
  const context = browser.newContext();
  const page = context.newPage();

  try {
    page.throttleCPU({ rate: 4 });

    await page.goto('https://test.k6.io/', { waitUntil: 'networkidle' });
  } finally {
    page.close();
  }
}
```

{{< /code >}}
