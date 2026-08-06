---
title: 'connectOverCDP(wsEndpoint)'
description: 'Chromium browser type: chromium.connectOverCDP(wsEndpoint) method'
---

# connectOverCDP(wsEndpoint)

Attaches k6 to an existing Chromium-based browser over the [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) (CDP), and returns a [Browser](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser) you can use exactly like a k6-managed one.

Because you connect from inside the iteration, you can compute the WebSocket endpoint at runtime. For instance, you can request a browser session from your provider's API in [`setup()`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle) and pass the endpoint to your iterations.

{{< admonition type="note" >}}

`connectOverCDP` doesn't need the `browser` [scenario option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/running-browser-tests). k6 doesn't launch a browser, so there's no browser type for it to resolve. The [browser module options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/options) that apply to an existing browser, such as `K6_BROWSER_TIMEOUT` and `K6_BROWSER_DEBUG`, are still honored.

{{< /admonition >}}

| Parameter  | Type   | Default | Description                                                                                                                                                          |
| ---------- | ------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wsEndpoint | string | -       | Required. The WebSocket endpoint of the browser's CDP interface, for example `ws://localhost:9222/devtools/browser/<BROWSER_ID>`. Must use the `ws` or `wss` scheme. |

### Returns

| Type               | Description                                                                                                                                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<Browser>` | A Promise that fulfills with a [Browser](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser) object. It also exposes a `close()` method, as described in [Connection lifecycle](#connection-lifecycle). |

### Connection lifecycle

k6 manages the connection for you and closes it at the end of the iteration, the same way it does for a browser it launched itself.

Unlike a k6-managed `browser`, a browser returned by `connectOverCDP` also exposes a `close()` method, so you can release the connection earlier when you no longer need it. Calling `close()` only tears down k6's CDP connection. The browser itself keeps running, because you own its lifecycle.

Using a browser after you close it throws an error, so treat `close()` as the last thing you do with it in the iteration.

### Examples

#### Connect to a local browser

Start Chrome with the `--remote-debugging-port` flag, then read its WebSocket endpoint from `http://localhost:9222/json/version` (the `webSocketDebuggerUrl` field) and pass it to k6 as an environment variable:

<!-- md-k6:skip -->

```javascript
import { chromium } from 'k6/browser';

export default async function () {
  const browser = await chromium.connectOverCDP(__ENV.CDP_WS_URL);
  const page = await browser.newPage();

  try {
    await page.goto('https://quickpizza.grafana.com/');
    console.log(`title: ${await page.title()}`);
  } finally {
    await page.close();
    await browser.close();
  }
}
```

Then, run the test with this command:

```bash
CDP_WS_URL=ws://localhost:9222/devtools/browser/<BROWSER_ID> k6 run script.js
```

#### Connect to a browser provider

When a third-party provider creates the browser session, request the endpoint once in `setup()` and share it with every iteration:

<!-- md-k6:skip -->

```javascript
import http from 'k6/http';
import { chromium } from 'k6/browser';

export function setup() {
  const res = http.post('https://provider.example/v1/sessions');
  return { wsURL: res.json().connectUrl };
}

export default async function (data) {
  const browser = await chromium.connectOverCDP(data.wsURL);
  const page = await browser.newPage();

  try {
    await page.goto('https://quickpizza.grafana.com/');
  } finally {
    await page.close();
    await browser.close();
  }
}
```

### Related

- [browser module API](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser#browser-module-api) - The API a connected browser exposes
- [browser.isConnected](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/isconnected/) - Check whether the CDP connection is still active
- [Running browser tests](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/running-browser-tests) - Run tests with a browser that k6 launches
