---
title: 'waitForURL(url[, options])'
description: 'Browser module: page.waitForURL(url[, options]) method'
---

# waitForURL(url[, options])

Waits for the page to navigate to the specified URL. This method is useful for ensuring that navigation to a particular URL has completed before proceeding with the test. This is especially useful if there are multiple redirects before hitting the end destination.

<TableWithNestedRows>

| Parameter         | Type           | Default | Description                                                                                                                                                                                                                                                                                                         |
| ----------------- | -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url               | string\|RegExp | -       | Required. URL or URL pattern to match against. The method will wait until the page navigates to a URL that matches this parameter.                                                                                                                                                                                  |
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

| Type    | Description                                                                                                             |
| ------- | ----------------------------------------------------------------------------------------------------------------------- |
| Promise | A Promise that resolves when the page has navigated to the specified URL and the specified load state has been reached. |

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
    await page.goto('https://quickpizza.grafana.com/test.k6.io/');

    // Wait for navigation to a specific URL
    await Promise.all([
      page.click('a[href="/my_messages.php"]'),
      page.waitForURL('https://quickpizza.grafana.com/my_messages.php'),
    ]);

    await page.goto('https://quickpizza.grafana.com/test.k6.io/');

    // Wait for navigation using URL pattern with RegExp
    await Promise.all([page.click('a[href="/browser.php"]'), page.waitForURL(/\/browser\.php$/)]);
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

### Valid usage patterns for waitForURL

Use one of the following patterns to coordinate the action that triggers navigation with waiting for the final URL.

{{< code >}}

<!-- eslint-skip -->

```js
await Promise.all([
  page.waitForURL('https://quickpizza.grafana.com/my_messages.php'),
  page.locator('a[href="/my_messages.php"]').click(),
]);
```

{{< /code >}}

or

{{< code >}}

<!-- eslint-skip -->

```js
const navPromise = page.waitForURL('https://quickpizza.grafana.com/my_messages.php');
await page.locator('a[href="/my_messages.php"]').click();
await navPromise;
```

{{< /code >}}

Unlike [waitForNavigation](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitfornavigation), `waitForURL` will first check whether it is already on the page with the given URL before proceeding to wait. If it is already there and the `waitUntil` condition has also been met, it will return straight away. This means that it is safe to do this:

{{< code >}}

<!-- eslint-skip -->

```js
await page.locator('a[href="/my_messages.php"]').click();
await page.waitForURL('https://quickpizza.grafana.com/my_messages.php');
```

{{< /code >}}

### Best practices

1. **Use appropriate matching**: Choose the right matching method based on your needs:

   - Exact strings for known, static URLs
   - RegExp for pattern-based matching and complex URL validation

2. **Handle dynamic content**: For URLs with dynamic parts (IDs, timestamps), use regular expression patterns instead of exact matches.

3. **Set appropriate timeouts**: Adjust timeouts based on expected navigation time and network conditions.

4. **Verify final state**: After waiting for URL, verify that the page content matches your expectations.

### Common use cases

- **Form submissions**: Verify redirects after successful form submission
- **Authentication flows**: Wait for login/logout redirects
- **E-commerce**: Track progression through shopping and checkout flows
- **SPAs**: Handle client-side routing changes
- **API redirects**: Wait for server-side redirects after API calls

### Related

- [page.waitForNavigation()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitfornavigation/) - Wait for navigation events
- [page.waitForLoadState()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitforloadstate/) - Wait for load states
