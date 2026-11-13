---
title: 'close()'
description: 'Browser module: close method'
---

# close()

Closes the connection to the browser, along with all of its [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext)s and [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page)s.

{{< admonition type="note" >}}

This method is only available on a browser returned by [`chromium.connectOverCDP()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/chromium/connectovercdp). The k6-managed [`browser`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser) doesn't expose `close()`, because k6 owns its lifecycle.

{{< /admonition >}}

Calling this method is optional. k6 closes the connection at the end of the iteration either way, so use `close()` only when you want to release it earlier. Closing an already closed browser is a no-op.

Since you manage the browser, closing the connection doesn't stop the browser itself, which keeps running and stays available to later iterations.

Using the browser after you close it throws an error, so treat `close()` as the last thing you do with it.

### Returns

| Type            | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| `Promise<void>` | A Promise that fulfills when the browser connection is closed. |

### Example

<!-- md-k6:skip -->

```javascript
import { chromium } from 'k6/browser';

export default async function () {
  const browser = await chromium.connectOverCDP(__ENV.CDP_WS_URL);
  const page = await browser.newPage();

  try {
    await page.goto('https://quickpizza.grafana.com/');
  } finally {
    await page.close();
    await browser.close(); // releases the connection, the browser keeps running
  }
}
```

### Related

- [browser.isConnected](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/isconnected/) - Check whether the CDP connection is still active
- [chromium.connectOverCDP()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/chromium/connectovercdp/) - Attach to an existing browser over CDP
