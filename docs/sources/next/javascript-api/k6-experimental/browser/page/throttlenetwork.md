---
title: 'throttleNetwork(networkProfile)'
excerpt: 'Browser module: page.throttleNetwork(networkProfile) method'
---

# throttleNetwork(networkProfile)

Throttles the network in Chrome/Chromium to slow it down by the specified fields in the `networkProfile` object.

| Parameter               | Type           | Default | Description                                                                            |
|-------------------------|----------------|---------|----------------------------------------------------------------------------------------|
| networkProfile          | NetworkProfile | `null`  | This is a mandatory parameter.                                                         |
| networkProfile.latency  | number         | `0`     | Minimum latency from request sent to response headers received (ms).                   |
| networkProfile.download | number         | `-1`    | Maximal aggregated download throughput (bytes/sec). `-1` disables download throttling. |
| networkProfile.upload   | number         | `-1`    | Maximal aggregated upload throughput (bytes/sec). `-1` disables upload throttling.     |

To work with the most commonly tested network profiles, import `networkProfiles` from the browser module. There are three profiles available:

| Name              | Notes                                                                                                                          |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `'No Throttling'` | No throttling, which is the default before applying any network throttling. This can be used to remove the network throttling. |
| `'Fast 3G'`       | Emulates a typical fast 3G connection                                                                                          |
| `'Slow 3G'`       | Emulates a typical slow 3G connection                                                                                          |

### Example

{{< code >}}

```javascript
import { browser, networkProfiles } from 'k6/x/browser';

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
    page.throttleNetwork(networkProfiles['Slow 3G']);

    await page.goto('https://test.k6.io/', { waitUntil: 'networkidle' });
  } finally {
    page.close();
  }
}
```

{{< /code >}}
