---
title: 'timing()'
description: 'Browser module: Request.timing method'
---

# timing()

Returns resource timing information for given request. Most of the timing values become available upon the response, `responseEnd` becomes available when request finishes.

### Returns

| Type                                 | Description                                                                                                                                                                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ResourceTiming                       | The object that is returned.                                                                                                                                                                                                                |
| ResourceTiming.statTime              | Request start time in milliseconds elapsed since January 1, 1970 00:00:00 UTC.                                                                                                                                                              |
| ResourceTiming.domainLookupStart     | Time immediately before the browser starts the domain name lookup for the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.                                                                        |
| ResourceTiming.domainLookupEnd       | Time immediately after the browser ends the domain name lookup for the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.                                                                           |
| ResourceTiming.connectStart          | Time immediately before the user agent starts establishing the connection to the server to retrieve the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.                                          |
| ResourceTiming.secureConnectionStart | Time immediately before the browser starts the handshake process to secure the current connection. The value is given in milliseconds relative to `startTime`, -1 if not available.                                                         |
| ResourceTiming.connectEnd            | Time immediately after the user agent establishes the connection to the server to retrieve the resource. The value is given in milliseconds relative to `startTime`, -1 if not available.                                                   |
| ResourceTiming.requestStart          | Time immediately before the browser starts requesting the resource from the server, cache, or local resource. The value is given in milliseconds relative to `startTime`, -1 if not available.                                              |
| ResourceTiming.responseStart         | Time immediately after the browser receives the first byte of the response from the server, cache, or local resource. The value is given in milliseconds relative to `startTime`, -1 if not available.                                      |
| ResourceTiming.responseEnd           | Time immediately after the browser receives the last byte of the resource or immediately before the transport connection is closed, whichever comes first. The value is given in milliseconds relative to `startTime`, -1 if not available. |

### Example

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';

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

  try {
    const res = await page.goto('https://test.k6.io/');
    const req = res.request();

    const timing = await req.timing();
    console.log(`timing: ${JSON.stringify(timing)}`); // timing: {"startTime":534898988.85297775,...}
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
