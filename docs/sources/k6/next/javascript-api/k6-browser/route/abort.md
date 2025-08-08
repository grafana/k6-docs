---
title: 'abort([errorCode])'
description: 'Browser module: Route.abort method'
---

# abort([errorCode])

Aborts the request with the given error code.

| Parameter | Type   | Default    | Description                                                                                                                                                                                                                                                                                                                                                  |
| --------- | ------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| errorCode | string | `'failed'` | Error code when aborting the request. Can be one of the following: `'aborted'`, `'accessdenied'`, `'addressunreachable'`, `'blockedbyclient'`, `'blockedbyresponse'`, `'connectionaborted'`,`'connectionclosed'`, `'connectionfailed'`, `'connectionrefused'`, `'connectionreset'`, `'internetdisconnected'`, `'namenotresolved'`, `'timedout'`, `'failed'`. |

### Returns

| Type            | Description                                          |
| --------------- | ---------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the request is aborted. |

### Example

{{< code >}}

<!-- md-k6:skip -->

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

  // Abort all images requests
  await page.route(/(\.png$)|(\.jpg$)/, async function (route) {
    await route.abort('blockedbyclient');
  });

  await page.goto('https://quickpizza.grafana.com/');

  await page.close();
}
```

{{< /code >}}
