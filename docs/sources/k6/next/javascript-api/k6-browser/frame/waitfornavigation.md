---
title: 'waitForNavigation([options])'
description: 'Browser module: frame.waitForNavigation([options]) method'
---

# waitForNavigation([options])

Waits for the given navigation lifecycle event to occur and returns the main resource response.

<TableWithNestedRows>

| Parameter         | Type           | Default | Description                                                                                                                                                                                                                                                                                                         |
| ----------------- | -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options           | object         | `null`  |                                                                                                                                                                                                                                                                                                                     |
| options.timeout   | number         | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |
| options.url       | string\|RegExp | `null`  | URL or URL pattern to match the navigation URL against. Useful when frame navigation performs multiple redirects and you need to wait until a final destination within the frame is reached.                                                                                                                        |
| options.waitUntil | string         | `load`  | When to consider operation to have succeeded. See [Events](#events) for more details.                                                                                                                                                                                                                               |

</TableWithNestedRows>

### When to use the url option

Use `options.url` when frame navigation passes through several intermediate pages (e.g., third‑party authentication or consent flows) before settling on a final URL. Matching the final URL or a regex pattern helps you reliably wait for the intended destination inside the frame. However, opt to work with [waitForURL](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/waitforurl) instead since it mitigates the risk of race conditions better than `waitForNavigation`.

### Events

{{< admonition type="caution" >}}

`networkidle` is DISCOURAGED. Don't use this method for testing especially with chatty websites where the event may never fire, rely on web assertions to assess readiness instead.

{{< /admonition >}}

Events can be either:

- `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
- `'load'` - consider operation to be finished when the `load` event is fired.
- `'networkidle'` - Consider operation to be finished when there are no network connections for at least `500` ms.

### Returns

| Type                                                                                                      | Description                                                                |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Promise<null \| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/response/)> | The `Response` instance associated with the frame. Else, it returns `null` |

### Examples

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

  try {
    await page.setContent(`
      <iframe src="https://quickpizza.grafana.com/test.k6.io/" width="50%" height="50%"></iframe>
    `);

    // Retreive the frame of the iframe
    const iframeElement = await page.$('iframe');
    const frame = await iframeElement.contentFrame();

    // Wait for navigation to a specific URL
    await Promise.all([
      frame.click('a[href="/my_messages.php"]'),
      frame.waitForNavigation({ url: 'https://quickpizza.grafana.com/my_messages.php' }),
    ]);

    await frame.goto('https://quickpizza.grafana.com/test.k6.io/');

    // Wait for navigation using URL pattern with RegExp
    await Promise.all([
      frame.click('a[href="/browser.php"]'),
      frame.waitForNavigation({ url: /\/browser\.php$/ }),
    ]);
  } finally {
    await page.close();
  }
}
```

{{< /code >}}
