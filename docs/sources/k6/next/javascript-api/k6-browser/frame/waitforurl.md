---
title: 'waitForURL(url[, options])'
description: 'Browser module: frame.waitForURL(url[, options]) method'
---

# waitForURL(url[, options])

Waits for the frame to navigate to the specified URL. This method is useful for ensuring that navigation within a specific frame (such as an iframe) to a particular URL has completed before proceeding with the test. This is especially useful if there are multiple redirects before hitting the end destination.

<TableWithNestedRows>

| Parameter         | Type           | Default | Description                                                                                                                                                                                                                                                                                                         |
| ----------------- | -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url               | string\|RegExp | -       | Required. URL or URL pattern to match against. The method will wait until the frame navigates to a URL that matches this parameter.                                                                                                                                                                                 |
| options           | object         | `null`  |                                                                                                                                                                                                                                                                                                                     |
| options.timeout   | number         | `30000` | Maximum time in milliseconds. Pass `0` to disable the timeout. Default is overridden by the `setDefaultTimeout` option on [BrowserContext](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/browsercontext/) or [Page](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/). |
| options.waitUntil | string         | `load`  | When to consider operation to have succeeded. See [Events](#events) for more details.                                                                                                                                                                                                                               |

</TableWithNestedRows>

### Events

{{< admonition type="caution" >}}

`networkidle` is DISCOURAGED. Don't use this method for testing especially with chatty websites where the event may never fire, rely on web assertions to assess readiness instead.

{{< /admonition >}}

Events can be either:

- `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
- `'load'` - consider operation to be finished when the `load` event is fired.
- `'networkidle'` - Consider operation to be finished when there are no network connections for at least `500` ms.

### Returns

| Type    | Description                                                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------ |
| Promise | A Promise that resolves when the frame has navigated to the specified URL and the specified load state has been reached. |

### Examples

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

    const iframeElement = await page.$('iframe');
    const iframeContent = await iframeElement.contentFrame();

    // Wait for navigation to a specific URL
    await Promise.all([
      iframeContent.click('a[href="/my_messages.php"]'),
      iframeContent.waitForURL('https://quickpizza.grafana.com/my_messages.php'),
    ]);

    await iframeContent.goto('https://quickpizza.grafana.com/test.k6.io/');

    // Wait for navigation using URL pattern with RegExp
    await Promise.all([
      iframeContent.click('a[href="/browser.php"]'),
      iframeContent.waitForURL(/\/browser\.php$/),
    ]);
  } finally {
    await page.close();
  }
}
```

### Valid usage patterns for waitForURL

Use one of the following patterns to coordinate the action that triggers navigation with waiting for the final URL.

<!-- eslint-skip -->

```js
await Promise.all([
  frame.waitForURL('https://quickpizza.grafana.com/my_messages.php'),
  frame.locator('a[href="/my_messages.php"]').click(),
]);
```

or

<!-- eslint-skip -->

```js
const navPromise = frame.waitForURL('https://quickpizza.grafana.com/my_messages.php');
await frame.locator('a[href="/my_messages.php"]').click();
await navPromise;
```

Unlike [waitForNavigation](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitfornavigation), `waitForURL` will first check whether it is already on the page with the given URL before proceeding to wait. If it is already there and the `waitUntil` condition has also been met, it will return straight away. This means that it is safe to do this:

<!-- eslint-skip -->

```js
await frame.locator('a[href="/my_messages.php"]').click();
await frame.waitForURL('https://quickpizza.grafana.com/my_messages.php');
```

### Best practices

1. **Verify frame existence**: Frames can be created, destroyed, or replaced during page navigation. Always verify frame existence before calling `waitForURL()`.

2. **Use appropriate selectors**: Use frame selectors that are stable and unique.

3. **Handle cross-origin scenarios**: Be aware of limitations when working with cross-origin iframes.

4. **Combine with content verification**: After URL change, verify that the expected content is present.

5. **Consider frame timing**: Frame navigation may happen after page navigation, so allow appropriate time.

### Common use cases

- **Payment processing**: Waiting for payment iframe redirects
- **Social media embeds**: Handling navigation in embedded social content
- **OAuth flows**: Managing authentication within iframes
- **Multi-frame applications**: Coordinating navigation across multiple frames
- **Embedded widgets**: Testing third-party widget navigation

### Related

- [frame.waitForNavigation()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/waitfornavigation/) - Wait for frame navigation events
- [frame.waitForLoadState()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/frame/waitforloadstate/) - Wait for load states
